const mongoose = require('mongoose')

const { Schema } = mongoose

const accountSchema = new Schema({
  description: String,
  fromAccount: Schema.Types.ObjectId,
  amount: Number,
  currency: String
})

module.exports = accountSchema
