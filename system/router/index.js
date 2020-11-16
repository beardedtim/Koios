import { Router } from 'express'

import Cors from 'cors'
import Cookies from 'cookie-parser'

import * as Middleware from '../middleware/index.js'

export const create = () => {
  const router = new Router()

  return router
    .use(Cors())
    .use(Cookies())
    .use(Middleware.securityHeaders())
}
