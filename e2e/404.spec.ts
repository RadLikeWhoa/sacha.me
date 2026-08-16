import { expect, test } from '@playwright/test';

test('shows a 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');

  expect(response?.status()).toBe(404);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Not found');

  const link = page.getByRole('link', { name: 'Back to home' });

  await expect(link).toHaveAttribute('href', '/');

  await link.click();

  await expect(page).toHaveURL('/');
});
