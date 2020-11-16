import * as Parser from './parser/index.js'
import * as Mappers from './mappers/index.js'

/**
 * SubSystems that we support
 */
import * as Server from './server/index.js'
import * as Queues from './queues/index.js'
import * as OpenAPI from './docs/open-api/index.js'
import * as Router from './router/index.js'
import * as Handlers from './handlers/index.js'

import * as Utils from './utils.js'

import Log from './log.js'

const sub_system_config = [
  Utils.create_sub_system(
    OpenAPI.create_system,
  ),
  Utils.create_sub_system(
    Router.create_system
  ),
  Utils.create_sub_system(
    Server.create_system
  ),
  Utils.create_sub_system(
    Queues.create_system
  ),
  Utils.create_sub_system(
    Handlers.create_system
  )
]

export default async ({ config: configPath, ...meta }) => {
  // When we create the system first we parse the config
  const config = await Parser.parse(configPath)

  // and create a logger for our work
  const log = Log.child({
    system: 'Main'
  })

  // then we take in the sub_systems above and start creating them
  const sub_systems = await Promise.all(sub_system_config.map(fn => fn({
    // passing in some helpers that they might need in order to 
    // work properly
    mappers: Mappers,
    server: Server,
    parsers: Parser,
    queues: Queues
  }))).then(systems => Promise.all(
    systems.map(async system => {
      // Then we create the system
      log.trace({ system }, 'Creating this system')
      const sub_system = await (system.create || (() => { }))(config, configPath, meta)

      return ({
        ...system,
        system: sub_system
      })
    })
  )).then(systems => systems.reduce((a, c) => ({
    // And finally create a hash out of their names
    ...a,
    [c.name]: c
  }), {}))

  // and for each sub_system, we are going to also give it
  // a chance to init in relation to any other sub_system.
  for (const [sub_system_name, sub_system] of Object.entries(sub_systems)) {
    if (sub_system.init) {
      log.trace({ name: sub_system_name, system: sub_system }, 'Init-ing this system')
      await sub_system.init(sub_systems)
    }
  }

  // Finally we return the systems that we created
  return {
    ...sub_systems,
    log: Log
  }
}
