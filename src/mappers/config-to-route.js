import * as Middleware from '../middleware/index.js'

export default (route, router, config) => {
  // Each route might have some middleware that
  // needs to get ran for it such as body parsing
  // or authentication
  const preware = [
    Middleware.logRequest(),
    Middleware.requestID()
  ]

  // Each route might also produce some output
  // that we want to validate as well
  const postware = []

  // If we are expecting specific things
  // from input, we need to validate it!
  if (config.input) {
    preware.push(Middleware.jsonParser())
    preware.push(Middleware.validateBody(config))
  }

  // If we have output, we need to validate
  // that we are holding up our end of the
  // bargain
  if (config.output) {
    preware.push(Middleware.validateResponse(config))
  }

  const route_handler = Middleware.route(route.handler)

  const handler_list = [
    ...preware,
    route_handler,
    ...postware,
    Middleware.errorHandler()
  ]

  return router[route.method](route.path, ...handler_list)
}