const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const { resolve } = require('path')

dotenv.config()

require('./models/user')
require('./models/books')
require('./models/entries')
require('./services/passport')

const authRoutes = require('./routes/auth-routes')
const keys = require('./config/keys')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })

const app = express()

// Setup Morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client/build/index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send({ error: 'base route only works in production' })
  })
}

module.exports = { app, mongoose }
