import JWT from 'jsonwebtoken'
import * as Errors from '../errors/index.js'
import * as Env from '../config/env.js'

export default (config, header = 'authorization') => async (req, res, next) => {
  // If they did not set the headers on this request
  if (!req.headers[header]) {
    // Error out
    return next(new Errors.NotAuthorized())
  }

  try {
    const type = config.authentication
    const token = req.headers[header].replace(type, '').trim()
    const data = await JWT.verify(token, Env.jwt_secret)
    req.user = data
  } catch (e) {}

  return next()
}
