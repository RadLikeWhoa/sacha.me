---
title: 'Highlighting the current page in Astro'
date: 2026-08-17
teaser: 'Highlighting the currently active page in a navigation is a quick win to help users orient themselves on a web site. Astro handles this differently than other frameworks, but still makes it easy to achieve this.'
---

Due to Astro's static nature, highlighting the current page in a navigation cannot rely on any router integrations. However, a small component can handle these common use cases elegantly.

```astro
---
interface Props {
  href: string;
  exact?: boolean;
}

const { href, exact = false } = Astro.props;
const { pathname } = Astro.url;

const active = exact ? pathname === href : pathname.includes(href);
---

<a
  aria-current={active ? 'page' : undefined}
  class:list={[{ active }]}
  data-astro-prefetch
  href={href}
>
  <slot />
</a>
```

The component can then be used in a navigation list.

```astro
<nav>
  <ol>
    <li>
      <NavLink
        href="/"
        exact
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink href="/projects/">Projects</NavLink>
    </li>
    <li>
      <NavLink href="/articles/">Articles</NavLink>
    </li>
  </ol>
</nav>
```

By including the `active` prop, you can ensure that you can cover two separate use cases:

- For pages that have sub-pages (e.g. projects, articles) you can omit the prop. This way, the component only checks if the current URL contains the item link.
- For a home link to the root page you can use the prop so only on the actual home page it is marked as active.
