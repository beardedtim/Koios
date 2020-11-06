import * as Parser from './parser/index.js'
import * as Mappers from './mappers/index.js'
import * as Server from './server/index.js'
import Log from './log.js'

export default async ({ config: configPath }) => {
  const config = await Parser.parse(configPath)
  const routes = await Mappers.pathToRouter(config.routes, configPath, config)
  const open_api = await Mappers.ymlToOpenAPI(config, routes)

  Server.add_routes(routes)

  return { open_api, routes, config, server: Server, log: Log }
}