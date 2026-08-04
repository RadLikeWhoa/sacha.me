import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');

  return rss({
    title: 'Sacha Schmid',
    description: 'TODO',
    site: context.site,
    items: articles.map((article) => ({
      ...article.data,
      link: `/articles/${article.id}/`,
    })),
  });
}
