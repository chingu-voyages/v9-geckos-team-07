import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './layout.module.css'
import SiteNav from './site-nav'

const Layout = ({ children }) => (
  <>
    <header id={styles.siteHeader}>
      <h1>
        <Link to="/">Gecko Cash</Link>
      </h1>
      <SiteNav />
    </header>

    <main>{children}</main>

    <footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
