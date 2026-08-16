import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectsDir = fileURLToPath(
  new URL('../src/content/projects', import.meta.url),
);

const slugs = readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const slug of slugs) {
  test(`"${slug}" has a title, a teaser, a hero image, and content`, async ({
    page,
  }) => {
    await page.goto(`/projects/${slug}/`);

    await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
    await expect(page.locator('header p').first()).not.toBeEmpty();
    await expect(page.locator('.hero-image img')).toBeVisible();
    await expect(page.locator('.content p').first()).toBeVisible();
  });

  test(`"${slug}" has project metadata`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);

    const lists = page.locator('dl');
    const terms = lists.locator('dt');

    expect(await lists.count()).toBeGreaterThan(0);

    await expect(terms.getByText('Year', { exact: true })).toBeVisible();
    await expect(terms.getByText('Tags', { exact: true })).toBeVisible();
    await expect(terms.getByText('Tasks', { exact: true })).toBeVisible();

    await expect(
      terms.getByText('Technologies', { exact: true }),
    ).toBeVisible();
  });

  test(`"${slug}" opens external links in a new tab`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);

    const links = page.locator('article a[href^="http"]');
    const count = await links.count();

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);

      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test(`"${slug}" has a link to the projects overview`, async ({ page }) => {
    await page.goto(`/projects/${slug}/`);

    const link = page.getByRole('link', { name: 'Discover more projects' });

    await expect(link).toHaveAttribute('href', '/projects/');

    await link.click();

    await expect(page).toHaveURL('/projects/');
  });
}

test('returns a 404 for an invalid project', async ({ page }) => {
  const response = await page.goto('/projects/this-project-does-not-exist/');

  expect(response?.status()).toBe(404);
});
