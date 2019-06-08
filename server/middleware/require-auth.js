module.exports = function requireAuth() {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not Logged In' })
    }

    return next()
  }
}
