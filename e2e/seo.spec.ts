import { expect, test } from '@playwright/test';

const SITE_URL = 'https://sacha.me';

const items = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Articles', href: '/articles/' },
  { name: 'Projects', href: '/projects/' },
];

for (const item of items) {
  test(`"${item.name}" has SEO metadata`, async ({ page }) => {
    await page.goto(item.href);

    const canonicalUrl = `${SITE_URL}${item.href}`;

    await expect(page).toHaveTitle(/.+/);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /.+/,
    );

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      canonicalUrl,
    );

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      'content',
      /.+/,
    );

    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      canonicalUrl,
    );

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /.+/,
    );

    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute('content', /.+/);

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      /.+/,
    );

    await expect(page.locator('meta[name="twitter:url"]')).toHaveAttribute(
      'content',
      canonicalUrl,
    );

    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      /.+/,
    );

    await expect(
      page.locator('meta[name="twitter:description"]'),
    ).toHaveAttribute('content', /.+/);

    const jsonLd = page.locator('script[type="application/ld+json"]');

    await expect(jsonLd).toHaveCount(1);
  });
}

test('404 page is set to not be indexed', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
});
