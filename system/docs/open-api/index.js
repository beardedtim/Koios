/**
 * Creates the OpenAPI System
 * 
 * @param {import('../../utils').Config} config
 * @returns {import('../../utils').SubSystem} 
 */
export const create_system = ({ mappers, server, parsers, queues }) => ({
    name: 'open_api',
    create: (config, configPath, meta) => mappers.ymlToOpenAPI(config, configPath, meta),
  })