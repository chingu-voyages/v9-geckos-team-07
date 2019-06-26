export enum ActionTypes {
  fetchUser = 'FETCH_USER',
  fetchUserFail = 'FETCH_USER_FAIL',
  createAccountBook = 'CREATE_ACCOUNT_BOOK',
  deleteAccountBook = 'DELETE_ACCOUNT_BOOK',
  createAccountBookFail = 'CREATE_ACCOUNT_BOOK_FAIL'
}

export interface Email {
  _id: string;
  value: string;
}

export interface AccountBook {
  _id?: string;
  title: string;
  description: string;
  created?: Date;
  updated?: Date;
  accounts?: Account[];
}

export enum AccountType {
  Assets = 'assets',
  Equity = 'equity',
  Income = 'income',
  Expense = 'expense',
  Liability = 'liability'
}

export interface Account {
  name: string;
  type: AccountType;
  description: string;
  placeholder: boolean;
  parent: Account['name'] | null;
}

export interface User {
  _id?: string;
  name?: string;
  googleId?: string;
  photo?: string;
  emails?: Email[];
  accountBooks?: AccountBook[];
  error: false | string;
}

export interface FetchUser {
  type: ActionTypes.fetchUser;
  payload: User;
}

export interface FetchUserFail {
  type: ActionTypes.fetchUserFail;
  payload: string;
}

export enum Template {
  Checking = 'checking'
}

export interface AccountBookWithTemplate extends AccountBook {
  template: Template.Checking;
}

export interface CreateAccountBook {
  type: ActionTypes.createAccountBook;
  payload: AccountBook;
}

export interface CreateAccountBookFail {
  type: ActionTypes.createAccountBookFail;
  payload: string;
}

export interface DeleteAccountBookAction {
  type: ActionTypes.deleteAccountBook;
  payload: User;
}

export type Actions =
  | FetchUser
  | FetchUserFail
  | DeleteAccountBookAction
  | CreateAccountBook
  | CreateAccountBookFail;
