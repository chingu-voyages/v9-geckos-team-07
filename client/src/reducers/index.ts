import { combineReducers } from 'redux';

import { User } from '../actions';
import { userReducer } from './user-reducer';

export interface StoreState {
  user: User;
}

export const reducers = combineReducers<StoreState>({
  user: userReducer
});
