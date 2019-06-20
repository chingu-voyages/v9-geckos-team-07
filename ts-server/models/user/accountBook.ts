import { Schema, Document } from 'mongoose'

export type AccountBook = {
  title: string;
  description: string;
  created: DateConstructor,
  updated: DateConstructor,
  accounts: string[]
}

export interface AccountBookModel extends Document { }

const accountBookSchema: Schema<AccountBook> = new Schema({
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  accounts: []
})

accountBookSchema.pre('update', function preUpdate(next) {
  this.update({}, { $currentDate: { updated: true } })
  next()
})

export { accountBookSchema }
