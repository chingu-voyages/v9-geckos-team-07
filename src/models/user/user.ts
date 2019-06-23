import mongoose, { Document } from 'mongoose';
import { emailSchema } from './email';
import { accountBookSchema } from './accountBook';

const { Schema } = mongoose;

export interface UserModel extends Document {
  id: string;
  name: string;
  googleId: string;
  photo: string;
  emails: [];
  accountBooks: [];
}

export const userSchema = new Schema({
  googleID: String,
  name: String,
  photo: String,
  emails: [emailSchema],
  accountBooks: [accountBookSchema]
});
