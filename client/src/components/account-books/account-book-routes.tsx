import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedAccountBooks } from './account-books';
import { ConnectedNewAccountBook } from './new-account-book';

export function AccountBookRoutes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/account-books" component={ConnectedAccountBooks} />
      <Route path="/account-books/new" component={ConnectedNewAccountBook} />
    </Switch>
  );
}
