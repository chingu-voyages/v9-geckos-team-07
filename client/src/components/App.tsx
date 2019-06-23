import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from './layout';
import { Home } from './Home';
import { fetchUser } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  fetchUser: Function;
}

export class _App extends Component<AppProps> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export const App = connect<StoreState>(
  null,
  { fetchUser }
)(_App);
