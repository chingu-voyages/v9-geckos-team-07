import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import userProp from '../prop-types/user'

const requireLogin = (AuthComponent = Component) => {
  class RequireLogin extends Component {
    static get propTypes() {
      return {
        user: userProp.isRequired
      }
    }

    isAutherized() {
      const { user } = this.props

      if (user === 'pending') {
        return <p>loading...</p>
      } else if (user.error) {
        return <Redirect to="/" />
      }

      return <AuthComponent user={user} />
    }

    render() {
      return this.isAutherized()
    }
  }

  return connect(({ user }) => ({ user }))(RequireLogin)
}

export default requireLogin
