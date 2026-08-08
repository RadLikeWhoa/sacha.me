// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://sacha.me',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-lato',
    },
  ],
});
