const mongoose = require('mongoose')

const { Schema } = mongoose

const splitSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  in: { type: Number, default: 0, min: 0 },
  out: { type: Number, default: 0, min: 0 }
})

module.exports = splitSchema
