
/**
 * Creates the Handlers System
 * 
 * @param {import('../utils').Config} config
 * @returns {import('../utils').SubSystem} 
 */
export const create_system = ({ mappers, server, parsers, log }) => ({
    name: 'handlers',
    create: mappers.ymlToAsyncAPI,
    init: (sub_systems) => {}
})