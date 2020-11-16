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

export const start = async (config) => {
  // Given a Config, create the queues needed
  // and return a way to access those queues
}

export const stop = async () => {
  // Stop all know queues
}

export const create_system = ({ mappers, server, parser, queues }) => ({
  name: 'queues',
  create: () => queues,
  init: () => queues.start(),
})
