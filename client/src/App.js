import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/layout'

import * as actions from './actions'

import './App.css'

export class App extends Component {
  static get propTypes() {
    return {
      fetchUser: PropTypes.func.isRequired
    }
  }

  componentDidMount() {
    const { fetchUser } = this.props

    fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <p>Home Page</p>
            </Route>

            <Route exact path="/books">
              <p>Acount Books</p>
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default connect(
  null,
  actions
)(App)
