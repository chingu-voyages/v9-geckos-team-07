import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  AccountBook,
  CreateAccountBook,
  ActionTypes,
  User,
  AccountBookWithTemplate,
  DeleteAccountBookAction,
  CreateAccountBookFail
} from './types';
import { StoreState } from '../reducers';

interface SaveResponse {
  accountBook: AccountBook | false;
  error?: { message: string };
}

/**
 * This is honestly confusing as hell to look at
 * @param accountBook Account Book
 */
export function newAccountBook(
  accountBook: AccountBook | AccountBookWithTemplate
): ThunkAction<
  Promise<boolean>,
  StoreState,
  {},
  CreateAccountBook | CreateAccountBookFail
> {
  return async (dispatch): Promise<boolean> => {
    const response = await axios.post<SaveResponse>(
      '/api/account-books',
      accountBook
    );

    if (response.status === 200) {
      if (response.data.accountBook !== false) {
        dispatch({
          type: ActionTypes.createAccountBook,
          payload: response.data.accountBook
        });

        return true;
      } else if (response.data.error) {
        dispatch({
          type: ActionTypes.createAccountBookFail,
          payload: 'Unable to create Account Book Entry'
        });

        return false;
      }
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
