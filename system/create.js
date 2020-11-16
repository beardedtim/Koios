import * as Parser from './parser/index.js'
import * as Mappers from './mappers/index.js'
import * as Server from './server/index.js'
import * as Queues from './queues/index.js'
import Log from './log.js'

export default async ({ config: configPath, ...meta }) => {
  const config = await Parser.parse(configPath)
  const routes = await Mappers.pathToRouter(config.routes, configPath, config)
  const open_api = await Mappers.ymlToOpenAPI(config, configPath, meta)

  await Server.add_open_api(open_api)
  await Server.add_routes(routes)

  await Queues.start()

  return { open_api, routes, config, server: Server, log: Log }
}
