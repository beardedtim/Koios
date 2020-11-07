import * as Env from '../config/env.js'

export default () => (err, req, res, next) => {
  const message = err.message
  const status =
    err.status && err.status > 99 && err.status < 600 ? err.status : 500
  const stack = Env.is_prod ? undefined : err.stack

  res.status(status).json({ error: { message, status, stack } })
}
