import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import mongoose from 'mongoose';

import { keys } from '../config/keys';
import { UserModel } from '../models/user/user';
import { EmailModel, emailSchema } from '../models/user/email';

const { google } = keys;

const User = mongoose.model<UserModel>('users');

passport.serializeUser<UserModel, string>(
  (user: UserModel, done): void => {
    done(null, user.id);
  }
);

passport.deserializeUser<UserModel | null, string>(
  (id: string, done): void => {
    User.findById(id)
      .then(
        (user): void => {
          done(null, user);
        }
      )
      .catch(
        (): void => {
          done('User not found');
        }
      );
  }
);

passport.use(
  'google',
  new passportGoogle.Strategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done): Promise<void> => {
      const { id, emails, displayName, photos } = profile;

      const existingUser = await User.findOne({ googleId: id });

      if (existingUser) {
        return done(undefined, existingUser);
      }

      const Email = mongoose.model<EmailModel>('emails', emailSchema);

      let userEmails: EmailModel[] = [];

      if (emails) {
        userEmails = emails.map(e => new Email({ value: e.value }));
      }

      const googleUser = {
        googleId: id,
        emails: userEmails,
        name: displayName,
        photo: photos ? photos[0].value : '',
        accountBooks: []
      };

      const user = await new User(googleUser).save();

      return done(undefined, user);
    }
  )
);
