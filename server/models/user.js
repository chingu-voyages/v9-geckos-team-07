const mongoose = require('mongoose')

const { Schema } = mongoose

const emails = require('./email')

const userSchema = new Schema({
  googleId: String,
  name: String,
  photo: String,
  emails: [emails]
})

mongoose.model('users', userSchema)
