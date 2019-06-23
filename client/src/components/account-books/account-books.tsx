import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { User } from '../../actions';

interface AccountBooksProps {
  user: User;
}

export class _AccountBooks extends Component<AccountBooksProps> {
  renderBooks(): JSX.Element[] {
    const { user } = this.props;

    if (user.accountBooks) {
      return user.accountBooks.map(book => (
        <li key={book._id}>
          <Link to={`/account-books/${book._id}`}>{book.title}</Link>
        </li>
      ));
    }

    return [];
  }

  render() {
    console.log(this.props);
    const {
      user: { accountBooks }
    } = this.props;

    if (accountBooks && accountBooks.length === 0) {
      return <Redirect to="/account-books/new" />;
    }

    return (
      <>
        <header>
          <h2>Account Books</h2>
        </header>

        <button>Create new Account Book</button>

        <nav>
          <header>
            <h2>List of Account Books</h2>
          </header>
        </nav>

        {this.renderBooks()}
      </>
    );
  }
}

function mapStateToProps({ user }: StoreState): { user: User } {
  return { user };
}

export const AccountBooks = connect(mapStateToProps)(_AccountBooks);
