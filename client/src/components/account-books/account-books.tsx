import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { deleteAccountBook, CompleteUser } from '../../actions';

interface AccountBooksProps {
  user: CompleteUser;
  deleteAccountBook: (id: string) => void;
}

export class AccountBooks extends Component<AccountBooksProps> {
  private renderBooks(): JSX.Element[] {
    const { user } = this.props;

    return user.accountBooks.map(
      (book): JSX.Element => (
        <li key={book._id}>
          <Link to={`/account-books/${book._id}`}>{`${book.title} `}</Link>
          <button type="button" onClick={() => this.onDeleteClick(book._id)}>
            Delete
          </button>
        </li>
      )
    );
  }

  private onDeleteClick = (id: string): void => {
    this.props.deleteAccountBook(id);
  };

  public render(): JSX.Element {
    const {
      user: { accountBooks }
    } = this.props;

    if (accountBooks.length === 0) {
      return <Redirect to="/account-books/new" />;
    }

    return (
      <>
        <header>
          <h2>Account Books</h2>
        </header>

        <Link to="/account-books/new">Create new Account Book</Link>

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

function mapStateToProps({ user }: StoreState) {
  return { user };
}

export const ConnectedAccountBooks = connect(
  mapStateToProps,
  { deleteAccountBook }
)(AccountBooks);
