const { Router } = require('express')
const { model } = require('mongoose')

const router = Router()
const Books = model('books')

module.exports = () => {
  router.get('/books', async (req, res) => {
    const books = await Books.find({ _user: req.user.id })

    res.send(books)
  })

  return router
}
