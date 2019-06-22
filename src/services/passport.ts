import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import mongoose from 'mongoose'

import { keys } from '../config/keys'
import { UserModel } from '../models/user/user'

const { Strategy } = passportGoogle
const { google } = keys

const User = mongoose.model<UserModel>('users')

export type GoogleProfileEmails = {
  value: string
}

export type GoogleProfilePhotos = {
  value: string
}

export type GoogleProfile = {
  id: string,
  emails: GoogleProfileEmails[],
  displayName: string,
  photos: GoogleProfilePhotos[]
}

passport.serializeUser<UserModel, string>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<UserModel | null, string>((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  }).catch(() => {
    done('User not found')
  })
})

passport.use(
  new Strategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName, photos } = profile

      const googleUser = {
        googleId: id,
        emails,
        name: displayName,
        photos: photos ? photos[0].value : ''
      }

      const existingUser = await User.findOne({ googleId: id })

      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User(googleUser).save()

      return done(null, user)
    }
  )
)
