import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import {
  AccountBook,
  CompleteAccountBook,
  CreateAccountBook,
  ActionTypes,
  AccountBookWithTemplate,
  DeleteAccountBookAction,
  CreateAccountBookFail
} from './types';
import { StoreState } from '../reducers';

interface SaveResponse {
  accountBook?: CompleteAccountBook;
  error?: string;
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
    try {
      const response = await axios.post<SaveResponse>(
        '/api/account-books',
        accountBook
      );

      if (response.status === 201 && response.data.accountBook) {
        dispatch({
          type: ActionTypes.CreateAccountBook,
          payload: response.data.accountBook
        });

        return true;
      } else if (response.status === 200 && response.data.error) {
        dispatch({
          type: ActionTypes.CreateAccountBookFail,
          payload: response.data.error
        });

        return false;
      }
    } catch {
      dispatch({
        type: ActionTypes.CreateAccountBookFail,
        payload: 'Unknown Error'
      });

      return false;
    }

    return true;
  };
}

export function deleteAccountBook(
  id: string
): ThunkAction<Promise<void>, StoreState, {}, DeleteAccountBookAction> {
  return async (dispatch): Promise<void> => {
    const response = await axios.delete<boolean>(`/api/account-books/${id}`);

    if (response.status === 200 && response.data) {
      dispatch({
        type: ActionTypes.DeleteAccountBook,
        payload: id
      });
    }
  };
}
