const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')

const { google } = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      ...google,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName, photos } = profile

      const googleUser = {
        googleId: id,
        emails,
        name: displayName,
        photo: photos[0].value
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
