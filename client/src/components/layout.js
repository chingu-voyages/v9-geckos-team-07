import React from 'react'
import PropTypes from 'prop-types'

import SiteNav from './site-nav'

const Layout = ({ children }) => (
  <>
    <header>
      <h1>Gecko Cash</h1>
    </header>

    <SiteNav />

    <main>{children}</main>

    <footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
