import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from './layout';
import { Home } from './Home';
import { fetchUser } from '../actions';
import { AccountBookRoutes } from './account-books';

interface AppProps {
  fetchUser: Function;
}

export class App extends Component<AppProps> {
  public componentDidMount(): void {
    const { fetchUser: fetch } = this.props;

    fetch();
  }

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <AccountBookRoutes />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export const ConnectedApp = connect(
  null,
  { fetchUser }
)(App);
