import mongoose, { Schema } from 'mongoose'
import { splitSchema } from './splits';

const transactionSchema = new Schema({
  date: Date,
  description: String,
  splits: [splitSchema]
})

mongoose.model('transactions', transactionSchema)