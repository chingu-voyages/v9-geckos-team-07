const mongoose = require('mongoose')

const { Schema } = mongoose

const accountSchema = new Schema({
  _parent: { type: Schema.Types.ObjectId, ref: 'Account' },
  name: String,
  type: {
    type: String,
    enum: [
      'Asset',
      'Expense',
      'Liability',
      'Income',
      'Bank',
      'Cash',
      'Credit Card',
      'Stock',
      'Mutual Fund',
      'A/Receivable',
      'A/Payable'
    ]
  },
  description: String,
  currency: String
})

accountSchema.pre('save', () => {})

module.exports = accountSchema
