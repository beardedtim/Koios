import pathToConfig from './path-to-config.js'
const OPENAPI_VERSION = '3.0.3'

const get_info = (config, meta) => ({
  version: meta.version,
  title: config.name,
  description: config.description,
})

export default async (config, configPath, meta) => {
  const servers = [
    {
      url: config.base_url,
      description: 'The base that all requests can be made out of',
    },
  ]

  const info = get_info(config, meta)
  const paths = await pathToConfig(config.routes, configPath)

  return {
    info,
    openapi: OPENAPI_VERSION,
    servers,
    paths,
    definitions: config.definitions,
    tags: config.tags,
  }
}
