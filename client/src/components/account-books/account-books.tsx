import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { deleteAccountBook, CompleteUser } from '../../actions';
import { SEO } from '../seo';

interface AccountBooksProps {
  user: CompleteUser;
}

interface DispatchProps {
  deleteAccountBook: (id: string) => void; // is there a better way to write this?
}

type Props = AccountBooksProps & DispatchProps;

export class AccountBooks extends Component<Props> {
  private renderBooks(): JSX.Element[] {
    const { user } = this.props;

    return user.accountBooks.map(
      (book): JSX.Element => (
        <li key={book.title}>
          <Link to={`/account-books/${book.title}`}>{`${book.title} `}</Link>
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
        <SEO title="Account Books" description="List of account books" />

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

function mapStateToProps({ user }: StoreState): AccountBooksProps {
  return { user };
}

export const ConnectedAccountBooks = connect<
  { user: CompleteUser }, // Props we are pulling off
  DispatchProps, // Dispatch really doesn't like ThunkDispatch
  AccountBooksProps, // Other props passed to component
  StoreState // store state
>(
  mapStateToProps,
  { deleteAccountBook }
)(AccountBooks);
