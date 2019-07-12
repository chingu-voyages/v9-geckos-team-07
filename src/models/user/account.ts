import { Schema, Document } from 'mongoose';

export enum AccountType {
  Asset = 'Asset',
  Equity = 'Equity',
  Income = 'Income',
  Expense = 'Expense',
  Liability = 'Liability'
}

export interface Account extends Document {
  id: string;
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
