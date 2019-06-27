import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { CompleteAccountBook, CompleteAccount } from '../../actions';
import { StateStore } from 'passport-oauth2';

interface AccountBookProps extends RouteComponentProps<{ title: string }> {
  accountBooks: CompleteAccountBook[];
}

type Props = StateStore & AccountBookProps;

export class ShowAccountBook extends Component<Props> {
  render(): JSX.Element {
    const { title } = this.props.match.params;
    let accounts: JSX.Element[] = [];

    const accountBook = this.props.accountBooks.find(
      item => item.title === title
    );

    if (accountBook) {
      accounts = accountBook.accounts.map(
        (item: CompleteAccount): JSX.Element => (
          <div key={item._id}>{item.name}</div>
        )
      );
    }

    return (
      <>
        <header>
          <h2>{title}</h2>
        </header>

        {accounts}
      </>
    );
  }
}

function mapStateToProps(
  { user: { accountBooks } }: StoreState,
  ownProps: AccountBookProps
): { accountBooks: CompleteAccountBook[] } {
  return { accountBooks };
}

export const ConnectedShowAccountBook = connect<
  { accountBooks: CompleteAccountBook[] }, // State pulled off
  {}, // dispatch if any
  AccountBookProps, // Props passed to component
  StoreState // Store State
>(mapStateToProps)(ShowAccountBook);
