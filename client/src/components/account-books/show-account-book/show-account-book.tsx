import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { StoreState } from '../../../reducers';
import { CompleteAccount } from '../../../actions';

import styles from './styles.module.css';

import { NewAccountForm } from './new-account-form';

interface AccountBookProps extends RouteComponentProps<{ title: string }> {
  accounts: CompleteAccount[];
}

interface ShowAccountBookState {
  showForm: boolean;
}

type Props = StoreState & AccountBookProps;

export class ShowAccountBook extends Component<Props, ShowAccountBookState> {
  state = {
    showForm: false
  };

  private hasChildren(account: CompleteAccount): boolean {
    return this.props.accounts.some(a => a.parent === account._id);
  }

  private getChildren(account: CompleteAccount): CompleteAccount[] {
    return this.props.accounts.reduce((acc: CompleteAccount[], child) => {
      if (account._id === child.parent) {
        return [...acc, child];
      }

      return acc;
    }, []);
  }

  private renderAccounts(accounts: CompleteAccount[]): JSX.Element[] {
    return accounts.reduce((acc: JSX.Element[], account, idx, arr) => {
      if (this.hasChildren(account)) {
        const children = this.getChildren(account);

        // remove children from array
        children.forEach(child => {
          arr.splice(arr.findIndex(f => f._id === child._id), 1);
        });

        // render children
        const results = this.renderAccounts(children);

        const element = (
          <li key={account._id}>
            <div>{account.name}</div>
            <ul>{results}</ul>
          </li>
        );

        return [...acc, element];
      }

      const element = (
        <li key={account._id}>
          <Link
            to={`/account-books/${this.props.match.params.title}/accounts/${
              account.name
            }`}
          >
            {account.name}
          </Link>
        </li>
      );

      return [...acc, element];
    }, []);
  }

  private showNewAccountForm = (): JSX.Element => {
    return (
      <div id={styles.modal}>
        <NewAccountForm close={() => this.setState({ showForm: false })} />
      </div>
    );
  };

  public render(): JSX.Element {
    const {
      accounts,
      match: {
        params: { title }
      }
    } = this.props;

    const { showForm } = this.state;

    return (
      <>
        <header>
          <h2>{title}</h2>
        </header>

        <ul>{this.renderAccounts([...accounts])}</ul>
        {showForm ? this.showNewAccountForm() : null}

        <footer>
          <button
            type="button"
            onClick={() => this.setState({ showForm: true })}
          >
            Create New Account
          </button>
        </footer>
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
