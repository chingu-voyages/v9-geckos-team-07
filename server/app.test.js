const { Express } = require('jest-express/lib/express')

const request = require('supertest')

const { app: server, mongoose } = require('./app')

jest.mock('morgan', () => jest.fn(() => (req, res, next) => next()))

describe('server tests', () => {
  let app
  beforeEach(() => {
    app = new Express()
  })

  afterEach(async done => {
    await mongoose.disconnect()
    app.resetMocked()

    done()
  })

  test('should return 200 from base route', async () => {
    const response = await request(server).get('/')

    expect(response.status).toBe(200)
  })

  test('/auth/google should redirect to google', async () => {
    const response = await request(server).get('/auth/google')

    expect(response.redirect).toBeTruthy()
    expect(response.statusCode).toBe(302)
    expect(response.header.location).toEqual(
      expect.stringMatching(/^https:\/\/accounts.google.com\/o\/oauth2/u)
    )
  })

  test('/auth/google/callback should redirect', async () => {
    const response = await request(server).get('/auth/google/callback')
    expect(response.redirect).toBeTruthy()
    expect(response.statusCode).toBe(302)
  })
})
