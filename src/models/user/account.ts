import { Schema, Document } from 'mongoose';

export enum AccountType {
  Asset = 'asset',
  Equity = 'equity',
  Income = 'income',
  Expense = 'expense',
  Liability = 'liability'
}

export interface Account extends Document {
  _id: string;
  name: string;
  type: AccountType;
  description: string;
  placeholder: boolean;
  parent: Account['_id'] | null;
}

export const accountSchema = new Schema<Account>({
  name: String,
  type: String,
  description: String,
  placeholder: Boolean,
  parent: { type: Schema.Types.ObjectId, ref: 'accounts' }
});
