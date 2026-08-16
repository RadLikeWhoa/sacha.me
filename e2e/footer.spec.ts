import { expect, test } from '@playwright/test';

test('has a link to the RSS feed that returns valid XML', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('contentinfo').getByRole('link', {
    name: 'RSS',
  });

  await expect(link).toHaveAttribute('href', '/rss.xml');

  const response = await page.request.get((await link.getAttribute('href'))!);

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();

  expect(body.trim().startsWith('<?xml')).toBe(true);
});

test('has a link to GitHub that opens externally', async ({ page }) => {
  await page.goto('/');

  const link = page.getByRole('contentinfo').getByRole('link', {
    name: 'GitHub',
  });

  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
