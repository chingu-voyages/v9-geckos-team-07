import { Schema, Document } from 'mongoose';

import { accountSchema, Account } from './account';

export interface AccountBook extends Document {
  _id: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  accounts: Account[];
}

const accountBookSchema = new Schema<AccountBook>({
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  accounts: [accountSchema]
});

accountBookSchema.pre('update', function preUpdate(next): void {
  this.update({}, { $currentDate: { updated: true } });
  next();
});

export { accountBookSchema };
