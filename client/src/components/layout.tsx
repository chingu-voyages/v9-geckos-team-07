import React from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from './site-nav';

import styles from './layout.module.css';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <header id={styles.siteHeader}>
      <h1>
        <Link to="/">Gecko Cash</Link>
      </h1>
      <SiteNav />
    </header>

    <main>{children}</main>

    <footer>&copy; 2019 Joseph Morse; MIT</footer>
  </>
);
