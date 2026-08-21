// @ts-check
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://sacha.me',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [sitemap()],
  trailingSlash: 'always',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Nunito',
      cssVariable: '--font-nunito',
      weights: [400, 700],
      fallbacks: [
        'Avenir Next',
        'Avenir',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [700],
      styles: ['normal'],
      fallbacks: [
        'Avenir Next',
        'Avenir',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
  },
});
