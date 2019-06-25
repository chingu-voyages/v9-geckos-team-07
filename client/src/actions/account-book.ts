import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

import { AccountBook, CreateAccountBook, ActionTypes, User } from './types';
import { StoreState } from '../reducers';

/**
 * This is honestly confusing as hell to look at
 * @param accountBook Account Book
 */
export function newAccountBook(
  accountBook: AccountBook
): ThunkAction<Promise<void>, StoreState, {}, CreateAccountBook> {
  return async (
    dispatch: ThunkDispatch<StoreState, {}, CreateAccountBook>
  ): Promise<void> => {
    await axios.post<User>('/api/account-books', accountBook);

    dispatch({ type: ActionTypes.createAccountBook, payload: accountBook });
  };
}
