import React from 'react';
import { Helmet } from 'react-helmet';

interface Meta {
  name: string;
  content: string;
}

interface SEOProps {
  lang?: string;
  meta?: Meta[];
  keywords?: string[];
  title: string;
  description?: string;
  author?: string;
}

export const SEO = ({
  lang = 'en',
  title,
  description = '',
  keywords = [],
  meta = []
}: SEOProps): JSX.Element => (
  <Helmet
    htmlAttributes={{ lang }}
    title={title}
    titleTemplate={'%s | GeckoCash'}
    meta={[
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:type',
        content: 'website'
      }
    ]
      .concat(
        keywords.length > 0
          ? { name: 'keywords', content: keywords.join(', ') }
          : []
      )
      .concat(meta)}
  />
);
