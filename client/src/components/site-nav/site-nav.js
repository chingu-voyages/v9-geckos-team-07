import React from 'react'
import { Link } from 'react-router-dom'
import userProp from '../../prop-types/user'

import styles from './site-nav.module.css'

const SiteNav = ({ user }) => {
  if (user !== 'pending' && !user.error) {
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
    )
  }

  return (
    <nav id={styles.SiteNav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a href="/auth/google">Login</a>
        </li>
      </ul>
    </nav>
  )
}

SiteNav.propTypes = {
  user: userProp.isRequired
}

export default SiteNav
