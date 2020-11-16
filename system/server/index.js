import express from 'express'
import swaggerUI from 'swagger-ui-express'
import * as Env from '../config/env.js'

const app = express()

export const add_routes = (routes) => {
  app.use(routes)
}

export const add_open_api = (config) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(config))
}

export const start = () =>
  new Promise((res, rej) => {
    const instance = app.listen(Env.port, (err) => {
      if (err) {
        return rej(err)
      }

      res(instance)
    })
  })
