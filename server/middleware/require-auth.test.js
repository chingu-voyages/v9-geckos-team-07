const requireAuth = require('./require-auth')

const mockResponse = jest.fn(() => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
})

const next = jest.fn()

test('should return a 401 if unauthorized', () => {
  const auth = requireAuth()
  const res = mockResponse()

  auth({}, res, next)

  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.json).toHaveBeenCalledWith({ error: 'Not Logged In' })
  expect(next).toHaveBeenCalledTimes(0)
})

test('should call next if user is present', () => {
  const auth = requireAuth()
  const res = mockResponse()

  auth({ user: { googleId: '1234' } }, res, next)

  expect(res.status).toHaveBeenCalledTimes(0)
  expect(res.json).toHaveBeenCalledTimes(0)
  expect(next).toHaveBeenCalledTimes(1)
})
