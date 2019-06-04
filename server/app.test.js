const request = require('supertest')
const server = require('./app')

describe('server tests', () => {
  test('should return 200 from base route', done => {
    request(server)
      .get('/')
      .expect(200, done)
  })
})
