import mongoose from 'mongoose'
import { emailSchema, Email } from './email'
import { accountBookSchema, AccountBook } from './accountBook';

const { Schema } = mongoose

export type UserModel = {
  id: string
  googleID: string
  name: string
  photo: string
  emails: Email[],
  accountBooks: AccountBook[]
}

export const userSchema = new Schema<UserModel>({
  googleID: String,
  name: String,
  photo: String,
  emails: [emailSchema],
  accountBooks: [accountBookSchema]
})
