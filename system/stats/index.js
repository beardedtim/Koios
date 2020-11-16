import StatsD from 'hot-shots'
import * as Env from '../config/env.js'
import Log from '../log.js'

const log = Log.child({
    service: 'STATS'
})

export const client = new StatsD({
    host: Env.statsd_host,
    port: Env.statsd_port,
    globalTags: {
        env: Env.node_env
    },
    mock: Env.is_dev || Env.is_test,
    errorHandler: (err) => {
        log.error({ err }, 'Error on Stats Client')
    }
})

export const response_time = (time, tags = {}) => client.histogram('timing.response', time, tags)