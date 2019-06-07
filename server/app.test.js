const request = require('supertest')
const { app, mongoose } = require('./app')

afterEach(async done => {
  await mongoose.disconnect()

  done()
})

describe('server tests', () => {
  test('should return 200 from base route', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
  })

  test('/auth/google should redirect to google', async () => {
    const response = await request(app).get('/auth/google')

    expect(response.redirect).toBeTruthy()
    expect(response.statusCode).toBe(302)
    expect(response.header.location).toEqual(
      expect.stringMatching(/^https:\/\/accounts.google.com\/o\/oauth2/u)
    )
  })

  test('/auth/google/callback should redirect', async () => {
    const response = await request(app).get('/auth/google/callback')
    expect(response.redirect).toBeTruthy()
    expect(response.statusCode).toBe(302)
  })
})
