import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { StoreState } from '../reducers';
import { CompleteUser } from '../actions';

import './site-nav.css';

interface SiteNavProps {
  user: CompleteUser;
}

export const _SiteNav = ({ user }: SiteNavProps): JSX.Element => {
  if (user.googleId) {
    return (
      <nav id="site-nav">
        <ul className="list">
          <li className="item">
            <Link to="/account-books">Account Books</Link>
          </li>
          <li className="item">
            <a href="/auth/logout">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav id="site-nav">
      <ul className="list">
        <li className="item">
          <a href="/auth/google">Login</a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: StoreState) => {
  return { user: state.user };
};

export const SiteNav = connect(mapStateToProps)(_SiteNav);
