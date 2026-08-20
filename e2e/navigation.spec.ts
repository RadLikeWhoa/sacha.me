import { expect, test } from '@playwright/test';

const items = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Articles', href: '/articles/' },
  { name: 'Projects', href: '/projects/' },
];

test('has a logo linking to the home page', async ({ page }) => {
  await page.goto('/');

  const logo = page.getByRole('link', { name: 'Go to homepage' });

  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('href', '/');
});

test('has a navigation with 4 items', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation');
  const links = nav.getByRole('link');

  await expect(nav).toBeVisible();
  await expect(links).toHaveCount(items.length);
});

for (const item of items) {
  test(`marks "${item.name}" as active when navigating to it`, async ({
    page,
  }) => {
    await page.goto(item.href, { waitUntil: 'networkidle' });

    const nav = page.getByRole('navigation');

    await expect(nav.getByRole('link', { name: item.name })).toHaveAttribute(
      'aria-current',
      'page',
    );

    for (const other of items.filter((other) => other.name !== item.name)) {
      await expect(
        nav.getByRole('link', { name: other.name }),
      ).not.toHaveAttribute('aria-current', 'page');
    }
  });
}
