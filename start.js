import Create from './src/create.js'
import * as Env from './src/config/env.js'

import path from 'path'

const system = await Create({
  config: path.resolve('.', 'config.yml'),
  version: Env.version,
})

console.dir(system.open_api)

await system.server.start()
system.log.trace('System Server Started')