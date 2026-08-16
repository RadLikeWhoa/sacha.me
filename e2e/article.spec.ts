import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const articlesDir = fileURLToPath(
  new URL('../src/content/articles', import.meta.url),
);

const slugs = readdirSync(articlesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const slug of slugs) {
  test(`"${slug}" has a title a publication date, and content`, async ({
    page,
  }) => {
    await page.goto(`/articles/${slug}/`);

    await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
    await expect(page.locator('time')).not.toBeEmpty();
    await expect(page.locator('.content p').first()).toBeVisible();
  });

  test(`"${slug}" opens external links in a new tab`, async ({ page }) => {
    await page.goto(`/articles/${slug}/`);

    const links = page.locator('article a[href^="http"]');
    const count = await links.count();

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);

      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test(`"${slug}" has a link to the articles overview`, async ({ page }) => {
    await page.goto(`/articles/${slug}/`);

    const link = page.getByRole('link', { name: 'Read more articles' });

    await expect(link).toHaveAttribute('href', '/articles/');

    await link.click();

    await expect(page).toHaveURL('/articles/');
  });
}

test('returns a 404 for an invalid article', async ({ page }) => {
  const response = await page.goto('/articles/this-article-does-not-exist/');

  expect(response?.status()).toBe(404);
});
