import { combineReducers } from 'redux';

import { CompleteUser } from '../actions';
import { userReducer } from './user-reducer';

export interface StoreState {
  user: CompleteUser;
}

export const reducers = combineReducers<StoreState>({
  user: userReducer
});
