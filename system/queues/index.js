import Log from '../log.js'

import * as handlers from './handlers.js'

export const start = async () => {
    const clients = [
        Handlers.client
    ]

    for (const client of clients) {
        const log = Log.child({
            service: `QUEUE::${client.name}`
        })

        client.on('error', job => {
            log.error({ job }, 'Queue Errored on Job')
        }).on('failed', job => {
            log.error({ job }, 'Queue Failed on Job')
        })
    }
}
/**
 * Re-export all of our queues with SentenceCase Names
 */
export const Handlers = handlers