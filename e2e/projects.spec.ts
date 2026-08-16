import { expect, test } from '@playwright/test';

test('has links to articles', async ({ page }) => {
  await page.goto('/projects/');

  const links = page.locator('article a');

  await expect(links).not.toHaveCount(0);

  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('href')),
  );

  for (const href of hrefs) {
    expect(href).toMatch(/^\/projects\/[^/]+\/$/);

    const response = await page.goto(href!);

    expect(response?.status()).not.toBe(404);
  }
});
