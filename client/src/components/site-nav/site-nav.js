import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SiteNav = ({ user }) => {
  if (user) {
    return (
      <nav>
        <li>
          <Link to="/books">Account Books</Link>
        </li>
        <li>
          <a href="/auth/logout">Logout</a>
        </li>
      </nav>
    )
  }

  return (
    <nav>
      <li>
        <a href="/auth/google">Login</a>
      </li>
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
