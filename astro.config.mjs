// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sacha.me',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [sitemap()],
});
