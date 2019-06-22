import { Router } from "express";
import passport from 'passport'
import { requireAuth } from '../middleware/require-auth'

export function authRoutes(): Router {
  const router = Router()

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

  router.get('/logout', requireAuth(), (req, res) => {
    req.logout()
    res.redirect('/')
  })

  router.get('/current_user', requireAuth(), (req, res) => {
    if (req.user) {
      return res.status(200).json(req.user)
    }

    return res.status(401).send({ error: 'Not Logged In' })
  })

  return router
}