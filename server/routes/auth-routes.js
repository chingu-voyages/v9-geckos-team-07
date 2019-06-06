const passport = require('passport')
const express = require('express')

const router = express.Router()

module.exports = () => {
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  router.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    }
  )

  return router
}
