import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './site-nav.module.css'

const SiteNav = ({ user }) => {
  if (user) {
    return (
      <nav id={styles.siteNav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/books">Account Books</Link>
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
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      name: PropTypes.string
    })
  ]).isRequired
}

export default SiteNav
