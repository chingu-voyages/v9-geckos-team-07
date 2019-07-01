import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../reducers';
import { CompleteAccount } from '../../actions';
import { StateStore } from 'passport-oauth2';

interface AccountBookProps extends RouteComponentProps<{ title: string }> {
  accounts: CompleteAccount[];
}

type Props = StateStore & AccountBookProps;

export class ShowAccountBook extends Component<Props> {
  private sortAccounts = (): null => {
    return null;
  };

  private displayAccountLinks(accounts: CompleteAccount[]): JSX.Element[] {
    return accounts.map(
      (account: CompleteAccount): JSX.Element => {
        if (account.subAccounts && account.subAccounts.length) {
          return (
            <li key={account._id}>
              {account.name}
              <ul>{this.displayAccountLinks(account.subAccounts)}</ul>
            </li>
          );
        }
        return (
          <li key={account._id}>
            {account.subAccounts && account.subAccounts.length
              ? this.displayLink(account)
              : account.name}
          </li>
        );
      }
    );
  }

  private displayLink(account: CompleteAccount): JSX.Element {
    console.log('got called');
    return (
      <Link
        to={`/account-books/${this.props.match.params.title}/register/${
          account.name
        }`}
      >
        {account.name}
      </Link>
    );
  }

  public render(): JSX.Element {
    const {
      accounts,
      match: {
        params: { title }
      }
    } = this.props;

    return (
      <>
        <header>
          <h2>{title}</h2>
        </header>

        <ul>{this.displayAccountLinks(accounts)}</ul>
      </>
    );
  }
}

/**
 * I didn't even know you could do this!
 *
 * @param param0 Peel off Props
 * @param ownProps Component Props
 */
function mapStateToProps(
  { user: { accountBooks } }: StoreState,
  ownProps: AccountBookProps
): { accounts: CompleteAccount[] } {
  const accountBook = accountBooks.find(
    item => item.title === ownProps.match.params.title
  );

  if (accountBook) {
    return { accounts: accountBook.accounts };
  }

  return { accounts: [] };
}

export const ConnectedShowAccountBook = connect<
  { accounts: CompleteAccount[] }, // State pulled off
  {}, // dispatch if any
  AccountBookProps, // Props passed to component
  StoreState // Store State
>(mapStateToProps)(ShowAccountBook);
