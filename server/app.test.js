const request = require('supertest')
const app = require('./app')

describe('server tests', () => {
  test('should return 200 from base route', async done => {
    const response = await request(app).get('/')

    expect(response.statusCode).toBe(200)
    done()
  })

  test('/auth/google should redirect', async done => {
    const response = await request(app).get('/auth/google')

    expect(response.redirect).toBeTruthy()
    expect(response.statusCode).toBe(302)
    expect(response.header.location).toEqual(
      expect.stringMatching(/^https:\/\/accounts.google.com\/o\/oauth2/u)
    )

    done()
  })
})
