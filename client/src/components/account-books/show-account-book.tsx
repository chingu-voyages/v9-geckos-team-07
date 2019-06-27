import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
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

  public render(): JSX.Element {
    const { title } = this.props.match.params;
    const accounts: JSX.Element[] = this.props.accounts.map(
      (account): JSX.Element => <div key={account._id}>{account.name}</div>
    );

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
