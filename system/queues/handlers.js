import Queue from 'bull'
import * as Env from '../config/env.js'

/**
 * Every queue has a Name, client, and a way to add
 * jobs to its queue
 */

export const name = 'Handlers'

export const client = new Queue(queue_name, {
    redis: {
        host: Env.queue_host,
        port: Env.queue_port,
        password: Env.queue_password
    }
})

/**
 * 
 * @param {import('./utils').JobData} job 
 */
export const add = job => client.add(job, { attempts: Env.queue_job_retries })