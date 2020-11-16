export const create_system = ({ mappers, server, parser, queues }) => ({
    name: 'open_api',
    create: (config, configPath, meta) => mappers.ymlToOpenAPI(config, configPath, meta),
  })