/* eslint-disable no-console */
const { app } = require('./server/index')
const http = require('http')

const PORT = process.env.PORT || 4000

http.createServer(app).listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}/`)
})
