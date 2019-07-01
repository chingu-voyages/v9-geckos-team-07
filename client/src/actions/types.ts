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
  title: string;
  description: string;
  accounts: Account[];
}

export interface CompleteAccountBook extends AccountBook {
  _id: string;
  created: Date;
  updated: Date;
  accounts: CompleteAccount[];
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
  subAccounts?: Account[];
}

export interface CompleteAccount extends Account {
  _id: string;
  subAccounts: CompleteAccount[];
}

export interface User {
  name: string;
  googleId: string;
  photo: string;
  emails: Email[];
  accountBooks: AccountBook[];
  error: false | string;
}

export interface CompleteUser extends User {
  _id: string;
  accountBooks: CompleteAccountBook[];
}

export interface FetchUser {
  type: ActionTypes.fetchUser;
  payload: CompleteUser;
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
  payload: CompleteAccountBook;
}

export interface CreateAccountBookFail {
  type: ActionTypes.createAccountBookFail;
  payload: string;
}

export interface DeleteAccountBookAction {
  type: ActionTypes.deleteAccountBook;
  payload: CompleteAccountBook[];
}

export type Actions =
  | FetchUser
  | FetchUserFail
  | DeleteAccountBookAction
  | CreateAccountBook
  | CreateAccountBookFail;
