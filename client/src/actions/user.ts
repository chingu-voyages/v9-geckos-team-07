import axios from 'axios';
import { Dispatch } from 'redux';
import { User, FetchUser, ActionTypes, FetchUserFail } from './types';

export function fetchUser() {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const response = await axios.get<User>('/auth/current_user');

      dispatch<FetchUser>({
        type: ActionTypes.fetchUser,
        payload: response.data
      });
    } catch (error) {
      dispatch<FetchUserFail>({
        type: ActionTypes.fetchUserFail,
        payload: { message: 'Something went wrong' }
      });
    }
  };
}
