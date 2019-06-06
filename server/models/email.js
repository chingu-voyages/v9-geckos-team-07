const mongoose = require('mongoose')

const { Schema } = mongoose

const emailSchema = new Schema({
  value: String
})

module.exports = emailSchema
