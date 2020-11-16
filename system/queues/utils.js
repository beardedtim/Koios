/**
 * The data that we send as a Job to the Queue
 * 
 * @typedef {Object} JobData
 * 
 * @prop {string} type The type of job this is
 * @prop {Object<string, *>} payload The data that is associated with this job
 * @prop {Object<string, *>} meta The metadata associated with this job
 */