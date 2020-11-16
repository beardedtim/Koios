/**
 * @typedef {Object} Config
 * 
 * @prop {import('./mappers')} mappers
 * @prop {import('./server')} server
 * @prop {import('./parser')} parsers
 * @prop {import('./queues')} queues
 */

/**
 * @typedef {Object} Meta
 */

/**
 * @typedef {string} ConfigPath
 */

/**
 * @typedef {Object} SubSystem
 * 
 * @prop {string} name The name of the subsystem
 * @prop {function(Config, ConfigPath, Meta): Promise<*>} create Creates the value for the subsystem
 * @prop {function(SubSystems): Promise<*>} init Inits the subsystem after creating all other subsystems.
 */

/**
 * @typedef {function(Config): SubSystem} CreateSubSystem
 */

/**
 * Creates a SubSystem from a given handler
 * 
 * @param {CreateSubSystem} handler
 * @returns {function(Config): SubSystem}
 */
export const create_sub_system = handler => config => handler(config)