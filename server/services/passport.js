const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const { google } = require('../config/keys')

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
      console.log(profile)
      const { id, emails } = profile
      const googleuser = { googleId: id, emails }

      return done(null, googleuser)
    }
  )
)
