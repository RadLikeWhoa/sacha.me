import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('articles');

  return rss({
    title: 'Sacha Schmid',
    description: 'Articles about development and design.',
    site: context.site ?? 'https://sacha.me',
    items: articles.map((article) => ({
      link: `/articles/${article.id}/`,
      title: article.data.title,
      description: article.data.teaser,
      pubDate: article.data.date,
    })),
  });
};
