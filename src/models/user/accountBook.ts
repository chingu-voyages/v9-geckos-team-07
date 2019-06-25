import { Schema, Document } from 'mongoose';

export interface AccountBook extends Document {
  _id: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  accounts: [];
}

const accountBookSchema: Schema<AccountBook> = new Schema({
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  accounts: []
});

accountBookSchema.pre('update', function preUpdate(next): void {
  this.update({}, { $currentDate: { updated: true } });
  next();
});

export { accountBookSchema };
