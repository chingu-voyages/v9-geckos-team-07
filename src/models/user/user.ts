import mongoose, { Document } from 'mongoose';

import { emailSchema, Email } from './email';
import { accountBookSchema, AccountBook } from './accountBook';

const { Schema } = mongoose;

export interface UserModel extends Document {
  id: string;
  name: string;
  googleId: string;
  photo: string;
  emails: Email[];
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
