import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/layout'
import { Home } from './pages/home'
import { ConnectedAccountBooks } from './pages/account-books'
import NewAccountBook from './pages/account-books/new-book'

import requireLogin from './lib/require-login'

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
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/account-books"
              component={requireLogin(ConnectedAccountBooks)}
            />
            <Route exact path="/account-books/new" component={NewAccountBook} />{' '}
            <Route
              exact
              path="/account-books/:id"
              component={requireLogin(props => {
                return <div> Book Id: {props.match.params.id} </div>
              })}
            />
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
