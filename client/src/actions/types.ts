export enum ActionTypes {
  fetchUser,
  fetchUserFail
}

export interface Email {
  _id: string;
  value: string;
}

export interface AccountBook {
  _id: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  accounts: [];
}

export interface User {
  _id?: string;
  name?: string;
  googleId?: string;
  photo?: string;
  emails?: Email[];
  accountBooks?: AccountBook[];
  error: boolean | FetchFail;
}

export interface FetchUser {
  type: ActionTypes.fetchUser;
  payload: User;
}

interface FetchFail {
  message: string;
}

export interface FetchUserFail {
  type: ActionTypes.fetchUserFail;
  payload: FetchFail;
}

export type Actions = FetchUser | FetchUserFail;
