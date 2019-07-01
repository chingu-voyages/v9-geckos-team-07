import { Schema, Document, Model } from 'mongoose';

export enum AccountType {
  Asset = 'asset',
  Equity = 'equity',
  Income = 'income',
  Expense = 'expense',
  Liability = 'liability'
}

export interface Account extends Document {
  id: string;
  name: string;
  type: AccountType;
  description: string;
  placeholder: boolean;
  subAccounts: Account;
}

export const accountSchema = new Schema<Account>({
  name: String,
  type: String,
  description: String,
  placeholder: Boolean,
  subAccounts: { type: this }
});
