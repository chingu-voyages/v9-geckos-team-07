import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { User, FetchUser, ActionTypes, FetchUserFail } from './types';
import { StoreState } from '../reducers';

export function fetchUser(): ThunkAction<
  Promise<void>,
  StoreState,
  {},
  FetchUser | FetchUserFail
> {
  return async (
    dispatch: ThunkDispatch<StoreState, {}, FetchUser | FetchUserFail>
  ): Promise<void> => {
    try {
      const response = await axios.get<User>('/auth/current_user');

      dispatch<FetchUser>({
        type: ActionTypes.fetchUser,
        payload: response.data
      });
    } catch (error) {
      dispatch<FetchUserFail>({
        type: ActionTypes.fetchUserFail,
        payload: 'Something went wrong'
      });
    }
  };
}
