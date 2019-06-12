import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const requireLogin = (AuthComponent = Component) => {
  class RequireLogin extends Component {
    static get propTypes() {
      return {
        user: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({ name: PropTypes.string })
        ]).isRequired
      }
    }

    isAutherized() {
      const { user } = this.props

      if (user) {
        return <AuthComponent user={user} />
      }

      return <Redirect to="/" />
    }

    render() {
      return this.isAutherized()
    }
  }

  return connect(({ user }) => ({ user }))(RequireLogin)
}

export default requireLogin
