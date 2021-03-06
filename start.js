import Create from './system/create.js'
import * as Env from './system/config/env.js'
import parser from '@asyncapi/parser'
import path from 'path'

const system = await Create({
  config: path.resolve('.', 'config.yml'),
  version: Env.version,
})

await system.server.start()

system.log.trace('System Server Started')
