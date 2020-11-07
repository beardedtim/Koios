import { Router } from 'express'

import Cors from 'cors'
import Cookies from 'cookie-parser'

export const create = () => {
  const router = new Router()

  return router.use(Cors()).use(Cookies())
}
