import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  AccountBook,
  CreateAccountBook,
  ActionTypes,
  User,
  AccountBookWithTemplate,
  DeleteAccountBookAction
} from './types';
import { StoreState } from '../reducers';

/**
 * This is honestly confusing as hell to look at
 * @param accountBook Account Book
 */
export function newAccountBook(
  accountBook: AccountBook | AccountBookWithTemplate
): ThunkAction<Promise<boolean>, StoreState, {}, CreateAccountBook> {
  return async (dispatch): Promise<boolean> => {
    const response = await axios.post<User>('/api/account-books', accountBook);

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.createAccountBook,
        payload: accountBook
      });

      return true;
    }

    return false;
  };
}

export function deleteAccountBook(
  title: string
): ThunkAction<Promise<void>, StoreState, {}, DeleteAccountBookAction> {
  return async (dispatch): Promise<void> => {
    const response = await axios.delete<User>(`/api/account-books/${title}`);

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.deleteAccountBook,
        payload: response.data
      });
    }
  };
}
