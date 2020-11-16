import pathToConfig from './path-to-async-config.js'

const ASYNCAPI_VERSION = '2.0.0'

const get_info = (config, meta) => ({
  version: meta.version,
  title: config.name,
  description: config.description,
})

export default async (config, configPath, meta) => {
  const servers = {
    production: {
      url: config.base_url,
      description: 'The base that all requests can be made out of',
      protocol: "bull",
      protocolVersion: "3.18.1"
    }
  }

  const info = get_info(config, meta)
  const channels = await pathToConfig(config.handlers || './handlers', configPath)

  const async_api = {
    info,
    asyncapi: ASYNCAPI_VERSION,
    servers,
    channels,
    tags: config.tags,
  }

  return async_api
}
