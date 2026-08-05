import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    teaser: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()),
      tasks: z.array(z.string()),
      technologies: z.array(z.string()),
      link: z.string().optional(),
      repo: z.string().optional(),
      teaser: z.string(),
      end: z.number().optional(),
      hero: image(),
      icon: image(),
    }),
});

export const collections = { articles, projects };
