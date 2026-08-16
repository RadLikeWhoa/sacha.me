import { expect, test } from '@playwright/test';

test('has links to the three latest projects', async ({ page }) => {
  await page.goto('/');

  const links = page.locator('.projects-list a');

  await expect(links).toHaveCount(3);

  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('href')),
  );

  for (const href of hrefs) {
    expect(href).toMatch(/^\/projects\/[^/]+\/$/);

    const response = await page.goto(href as string);

    expect(response?.status()).not.toBe(404);
  }
});

test('has a link to the projects overview', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'Discover more projects' });

  await expect(link).toHaveAttribute('href', '/projects/');

  const [response] = await Promise.all([
    page.waitForResponse('/projects/'),
    link.click(),
  ]);

  expect(response?.status()).not.toBe(404);
});

test('has a link to the latest article', async ({ page }) => {
  await page.goto('/');

  const articleLink = page.locator('.section-articles article a');

  await expect(articleLink).toHaveCount(1);

  const href = await articleLink.getAttribute('href');

  expect(href).toMatch(/^\/articles\/[^/]+\/$/);

  const [response] = await Promise.all([
    page.waitForResponse(href as string),
    articleLink.click(),
  ]);

  expect(response?.status()).not.toBe(404);
});

test('has a link to the articles overview', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'Read more articles' });

  await expect(link).toHaveAttribute('href', '/articles/');

  const [response] = await Promise.all([
    page.waitForResponse('/articles/'),
    link.click(),
  ]);

  expect(response?.status()).not.toBe(404);
});
