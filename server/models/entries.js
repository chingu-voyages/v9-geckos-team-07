const mongoose = require('mongoose')
const splits = require('./splits')

const { Schema } = mongoose

const entrySchema = new Schema({
  date: Date,
  description: String,
  splits: [splits]
})

mongoose.model('entries', entrySchema)
