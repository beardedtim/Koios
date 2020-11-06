import express from 'express'
import * as Middleware from '../middleware/index.js'
import * as Env from '../config/env.js'

const app = express()

export const add_routes = (routes) => {
  app.use(routes)
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
