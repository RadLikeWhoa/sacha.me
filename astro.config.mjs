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
      provider: fontProviders.googleicons(),
      name: 'Material Symbols Rounded',
      cssVariable: '--font-material-symbols',
      options: {
        experimental: {
          glyphs: [
            'home',
            'work',
            'article',
            'person',
            'keyboard_double_arrow_right',
          ],
        },
      },
    },
  ],
});
