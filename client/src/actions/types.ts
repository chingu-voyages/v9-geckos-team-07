export enum ActionTypes {
  FetchUser = 'FETCH_USER',
  FetchUserFail = 'FETCH_USER_FAIL',
  CreateAccountBook = 'CREATE_ACCOUNT_BOOK',
  DeleteAccountBook = 'DELETE_ACCOUNT_BOOK',
  CreateAccountBookFail = 'CREATE_ACCOUNT_BOOK_FAIL',
  NewAccount = 'NEW_ACCOUNT'
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
}

export interface CompleteAccount extends Account {
  _id: string;
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
  type: ActionTypes.FetchUser;
  payload: CompleteUser;
}

export interface FetchUserFail {
  type: ActionTypes.FetchUserFail;
  payload: string;
}

export enum Template {
  Checking = 'checking'
}

export interface AccountBookWithTemplate extends AccountBook {
  template: Template.Checking;
}

export interface CreateAccountBook {
  type: ActionTypes.CreateAccountBook;
  payload: CompleteAccountBook;
}

export interface CreateAccountBookFail {
  type: ActionTypes.CreateAccountBookFail;
  payload: string;
}

export interface DeleteAccountBookAction {
  type: ActionTypes.DeleteAccountBook;
  payload: string;
}

export interface CreateAccountAction {
  type: ActionTypes.NewAccount;
  payload: CompleteAccount;
}

export type Actions =
  | FetchUser
  | FetchUserFail
  | DeleteAccountBookAction
  | CreateAccountBook
  | CreateAccountBookFail
  | CreateAccountAction;
