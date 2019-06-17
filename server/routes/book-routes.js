const { Router } = require('express')
const { model } = require('mongoose')

const router = Router()
const Books = model('books')

module.exports = () => {
  router.get('/books', async (req, res) => {
    const books = await Books.find({ _user: req.user.id })

    res.send(books)
  })

  router.post('/books', async (req, res) => {
    const { title, description /* , template */ } = req.body
    const book = await new Books({ _user: req.user, title, description })

    const result = await book.save()

    if (result) {
      return res.status(201).send('book saved')
    }

    return res.status(500).send('failed')
  })

  return router
}
