const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const { resolve } = require('path')
const compression = require('compression')

dotenv.config()

require('./models/user')
require('./models/books')
require('./models/entries')
require('./services/passport')

const authRoutes = require('./routes/auth-routes')
const bookRoutes = require('./routes/book-routes')

const keys = require('./config/keys')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })

const app = express()

// Apply Middleware
app.use([
  compression(),
  morgan(':method :url :status :res[content-length] - :response-time ms'),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }),
  passport.initialize(),
  passport.session()
])

app.use('/auth', authRoutes())
app.use('/api', bookRoutes())

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
