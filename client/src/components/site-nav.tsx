import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './site-nav.module.css';
import { StoreState } from '../reducers';
import { User } from '../actions';

interface SiteNavProps {
  user: User;
}

export const _SiteNav = ({ user }: SiteNavProps) => {
  if (user.googleId) {
    return (
      <nav id={styles.siteNav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/account-books">Account Books</Link>
          </li>
          <li className={styles.item}>
            <a href="/auth/logout">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav id={styles.SiteNav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a href="/auth/google">Login</a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: StoreState): { user: User } => {
  return { user: state.user };
};

export const SiteNav = connect(mapStateToProps)(_SiteNav);
