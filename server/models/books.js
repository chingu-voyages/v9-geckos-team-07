const mongoose = require('mongoose')

const { Schema } = mongoose

const accounts = require('./accounts')

const bookSchema = new Schema({
  title: String,
  createdDate: Date,
  updatedDate: Date,
  accounts: [accounts]
})

module.exports = bookSchema
