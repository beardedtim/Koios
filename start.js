import Create from './src/create.js'
import * as Env from './src/config/env.js'

import path from 'path'

const system = await Create({
  config: path.resolve('.', 'config.yml'),
  version: Env.version,
})

console.log(JSON.stringify(system.open_api, null, 2))

await system.server.start()
system.log.trace('System Server Started')