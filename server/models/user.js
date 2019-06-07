const mongoose = require('mongoose')

const { Schema } = mongoose

const emails = require('./email')
const books = require('./books')

const userSchema = new Schema({
  googleId: String,
  emails: [emails],
  books: [books]
})

mongoose.model('users', userSchema)