/**
 * Creates the AsyncAPI System
 * 
 * @param {import('../../utils').Config} config
 * @returns {import('../../utils').SubSystem} 
 */
export const create_system = ({ mappers, server, parsers, queues }) => ({
    name: 'async_api',
    create: mappers.ymlToAsyncAPI,
  })