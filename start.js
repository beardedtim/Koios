import Create from './src/create.js'
import path from 'path'

try {
  const system = await Create({ config: path.resolve('.', 'demo', 'config.yml') })

  await system.server.start()
  system.log.trace('System Server Started')
} catch (E) {
  console.log('ERROR!')
  console.dir(E)
}