const mongoose = require('mongoose')

const { Schema } = mongoose

const accounts = require('./accounts')

const bookSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  accounts: [accounts]
})

bookSchema.pre('update', function preUpdate(next) {
  // suppose to update the current date
  this.update({}, { $currentDate: { updated: true } })
  next()
})

mongoose.model('books', bookSchema)
