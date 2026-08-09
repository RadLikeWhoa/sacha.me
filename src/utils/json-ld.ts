import { SITE_METADATA } from '../consts';

export interface JsonLdProps {
  type?: 'website' | 'article' | 'project';
  title: string;
  description: string;
  url: string;
  pubDate?: Date;
  updatedDate?: Date;
}

export function generateJsonLd(props: JsonLdProps) {
  const {
    type = 'website',
    title,
    description,
    url,
    pubDate,
    updatedDate,
  } = props;

  const personEntity = {
    '@type': 'Person',
    name: SITE_METADATA.author.name,
    jobTitle: SITE_METADATA.author.jobTitle,
    url: SITE_METADATA.url,
    sameAs: [SITE_METADATA.author.github],
  };

  switch (type) {
    case 'article':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        mainEntityOfPage: url,
        url: url,
        datePublished: pubDate?.toISOString(),
        dateModified: (updatedDate || pubDate)?.toISOString(),
        author: personEntity,
      });

    case 'project':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: title,
        description: description,
        url: url,
        dateCreated: pubDate?.toISOString(),
        author: personEntity,
      });

    default:
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: title,
        description: description,
        url: url,
        author: personEntity,
      });
  }
}
