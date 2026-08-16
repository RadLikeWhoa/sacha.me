import AxeBuilder from '@axe-core/playwright';
import test, { expect } from '@playwright/test';

const items = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Articles', href: '/articles/' },
  { name: 'Projects', href: '/projects/' },
];

for (const item of items) {
  test(`"${item.name}" should not have any accessibility issues`, async ({
    page,
  }) => {
    const axeBuilder = new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22a',
      'wcag22aa',
    ]);

    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(item.href);

    expect((await axeBuilder.analyze()).violations).toEqual([]);

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(item.href);

    expect((await axeBuilder.analyze()).violations).toEqual([]);
  });
}
