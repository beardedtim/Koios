import Queue from 'bull'
import * as Envs from '../config/env.js'
import Log from '../log.js'

const queues = new Map()

const create_queue = (name) =>
  new Queue(name, {
    redis: {
      host: Envs.queue_host,
      port: Envs.queue_port,
      password: Envs.queue_password,
    },
    defaultJobOptions: {
      attempts: Envs.queue_job_retries,
      lifo: false,
    },
  })

export const get_queue = (queue_name) => {
  if (queues.has(queue_name)) {
    return queues.get(queue_name)
  }

  const queue = create_queue(queue_name)

  queue.logger = Log.child({
    service: `QUEUE::${queue_name}`,
  })

  queues.set(queue_name, queue)

  return queue
}

export const start = async (config) => {}

export const stop = async () => {
  for (const queue of queues.values()) {
    queue.logger.trace('Stopping Queue')
    await queue.close()
  }
}

export const is_healthy = () =>
  Promise.all([...queues.values()].map((queue) => queue.isReady()))

/**
 * Creates the Queues System
 *
 * @param {import('../utils').Config} config
 * @returns {import('../utils').SubSystem}
 */
export const create_system = ({ mappers, server, parsers, queues }) => ({
  name: 'queues',
  create: () => queues,
  init: () => queues.start(),
})
