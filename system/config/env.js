import env from 'getenv'
import R from 'ramda'

export const node_env = env.string('NODE_ENV', 'development')
export const name = env.string('NAME', '__UNKNOWN__SERVICE__')
export const version = env.string('VERSION', '0.0.0-DEVELOPMENT-1')

export const is_prod = node_env === 'production'
export const is_test = node_env === 'test'
export const is_stag = node_env === 'staging'
export const is_dev = R.all(Boolean, [!is_prod, !is_stag, !is_test])

export const port = env.int('PORT', 5050)
export const log_level = env.string('LOG_LEVEL', 'debug')

export const jwt_secret = env.string('JWT_SECRET', 'I am the secret value')

export const statsd_host = env.string('STATSD_HOST')
export const statsd_port = env.string('STATSD_PORT')
