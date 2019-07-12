import mongoose, { Document } from 'mongoose';

import { emailSchema, EmailModel } from './email';
import { accountBookSchema, AccountBook } from './accountBook';

const { Schema } = mongoose;

export interface UserModel extends Document {
  id: string;
  name: string;
  googleId: string;
  photo: string;
  emails: EmailModel[];
  accountBooks: AccountBook[];
}

export const userSchema = new Schema({
  googleId: String,
  name: String,
  photo: String,
  emails: [emailSchema],
  accountBooks: [accountBookSchema]
});

mongoose.model('users', userSchema);
