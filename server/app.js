const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

dotenv.config()

const authRoutes = require('./routes/auth-routes')
const keys = require('./config/keys')

require('./services/passport')

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

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })

app.use('/auth', authRoutes())

app.get('/', (req, res) => {
  res.send('hi there')
})

module.exports = app
