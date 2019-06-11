const mongoose = require('mongoose')

const { Schema } = mongoose

const accounts = require('./accounts')

const bookSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  createdDate: Date,
  updatedDate: Date,
  accounts: [accounts]
})

mongoose.model('books', bookSchema)
