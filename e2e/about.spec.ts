import { expect, test } from '@playwright/test';

test('has content', async ({ page }) => {
  await page.goto('/about/');

  const paragraphs = page.locator('article p');

  await expect(paragraphs.first()).toBeVisible();
  expect(await paragraphs.count()).toBeGreaterThan(0);
});

test('opens all external links in new tabs', async ({ page }) => {
  await page.goto('/about/');

  const links = page.locator('article a[href^="http"]');

  await expect(links.first()).toBeVisible();

  const count = await links.count();

  for (let i = 0; i < count; i += 1) {
    const link = links.nth(i);

    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

test('has working internal links', async ({ page }) => {
  await page.goto('/about/');

  const links = page.locator('article a:not([href^="http"])');

  await expect(links).not.toHaveCount(0);

  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('href')),
  );

  for (const href of hrefs) {
    const response = await page.goto(href as string);

    expect(response?.status()).not.toBe(404);
  }
});

test('has copyright text containing the current year', async ({ page }) => {
  await page.goto('/about/');

  const year = new Date().getFullYear().toString();

  await expect(page.getByText('Copyright ©')).toContainText(year);
});
