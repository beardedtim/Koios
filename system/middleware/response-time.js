import responseTime from 'response-time'
import * as Stats from '../stats/index.js'

export default () => responseTime((req, res, time) => {
    const method = req.method.toLowerCase()
        .replace(/[:.]/g, '')
        .replace(/\//g, '_')

    const url = req.url.toLowerCase()
        .replace(/[:.]/g, '')
        .replace(/\//g, '_')

    Stats.response_time(time, { method, url })
    
    res.setHeader('X-Response-Time', time)
})