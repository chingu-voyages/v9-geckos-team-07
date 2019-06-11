const mongoose = require('mongoose')

const { Schema } = mongoose

const accountSchema = new Schema({
  _parent: { type: Schema.Types.ObjectId, ref: 'Account' },
  name: String,
  type: String,
  description: String,
  currency: String
})

module.exports = accountSchema
