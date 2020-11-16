import { Router } from 'express'

import Cors from 'cors'
import Cookies from 'cookie-parser'

import * as Middleware from '../middleware/index.js'

export const create = () => {
  const router = new Router()

  return router.use(Cors()).use(Cookies()).use(Middleware.securityHeaders())
}

/**
 * Creates the Router System
 * 
 * @param {import('../utils').Config} config
 * @returns {import('../utils').SubSystem} 
 */
export const create_system = ({ mappers, server, parsers, queues }) => ({
  name: 'routes',
  create: (config, configPath, meta) =>
    mappers.pathToRouter(config.routes, configPath, config),
})
