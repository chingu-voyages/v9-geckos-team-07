import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import compression from 'compression'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import { resolve } from 'path'
import mongoose from 'mongoose'
import passport from 'passport'

dotenv.config()

import { keys } from './config/keys'

mongoose.Promise = global.Promise
mongoose.connect(keys.mongo, { useNewUrlParser: true })

const app = express()

import './models/user'
import './models/transactions'

app.use([
  compression(),
  morgan(':method :url :status :res[content-length] - :response-time ms'),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }),
  helmet(),
  passport.initialize(),
  passport.session()
])

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client/build/index.html'))
  })
}

export { app, mongoose }