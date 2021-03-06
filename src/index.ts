import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import compression from 'compression';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import { resolve } from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
dotenv.config();

import { keys } from './config/keys';
import './models/user';
import './models/transactions';
import './services/passport';
import { authRoutes } from './routes/auth-routes';
import { apiRoutes } from './routes/api-routes';
import { requireAuth } from './middleware/require-auth';

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongo, { useNewUrlParser: true, useCreateIndex: true });

const app = express();

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
]);

app.use('/auth', authRoutes());
app.use('/api', requireAuth(), apiRoutes());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../client/build')));
  app.get(
    '*',
    (req, res): void => {
      res.sendFile(resolve(__dirname, '..', 'client/build/index.html'));
    }
  );
} else {
  app.get(
    '/',
    (req, res): void => {
      res.status(404).send('base route only available in production');
    }
  );
}

export { app, mongoose };
