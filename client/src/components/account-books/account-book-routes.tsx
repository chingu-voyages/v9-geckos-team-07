import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AccountBooks } from './account-books';
import { NewAccountBook } from './new-account-book';

export function AccountBookRoutes() {
  return (
    <Switch>
      <Route exact path="/account-books" component={AccountBooks} />
      <Route path="/account-books/new" component={NewAccountBook} />
    </Switch>
  );
}
