import React from 'react';
import { SEO } from './seo';

export const Home = (): JSX.Element => (
  <>
    <SEO
      keywords={['accounting', 'cash', 'Gecko']}
      title="Home"
      description="Accounting application"
      author="Joseph Morse"
    />
    <header>
      <h2>Gecko Cash</h2>
    </header>

    <p>
      Gecko Cash is a online accounting application to help you keep track of
      your money
    </p>

    <section>
      <header>
        <h3>Features</h3>
      </header>

      <ul>
        <li>Double Book Entry</li>
        <li>Split Transactions</li>
        <li>Reposts</li>
      </ul>
    </section>
  </>
);
