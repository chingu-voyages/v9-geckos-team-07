import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import mongoose from 'mongoose';

import { keys } from '../config/keys';
import { UserModel } from '../models/user/user';

const { Strategy } = passportGoogle;
const { google } = keys;

const User = mongoose.model<UserModel>('users');

export interface GoogleProfileEmails {
  value: string;
}

export interface GoogleProfilePhotos {
  value: string;
}

export interface GoogleProfile {
  id: string;
  emails: GoogleProfileEmails[];
  displayName: string;
  photos: GoogleProfilePhotos[];
}

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
      console.log(photos);

      const googleUser = {
        googleId: id,
        emails,
        name: displayName,
        photo: photos ? photos[0].value : ''
      };

      const existingUser = await User.findOne({ googleId: id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User(googleUser).save();

      return done(null, user);
    }
  )
);
