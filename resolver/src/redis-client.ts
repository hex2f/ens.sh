import type { WrappedNodeRedisClient } from 'handy-redis';
import { createNodeRedisClient } from 'handy-redis'
import log from '~/log'

function createRedisClient (): WrappedNodeRedisClient {
  const client = createNodeRedisClient()

  // "Why not use arrow functions here?"
  // Using named functions like this gives a much cleaner log as it includes
  // the function name instead of just printing <anonymous>
  client.nodeRedis.on(
    'connect',
    function onRedisConnect () { log.info('Redis connected') }
  )
  client.nodeRedis.on(
    'reconnecting',
    function onRedisReconnecting () { log.info('Redis reconnecting') }
  )
  client.nodeRedis.on(
    'ready',
    function onRedisReady () { log.info('Redis ready') }
  )
  client.nodeRedis.on(
    'end',
    function onRedisEnd () { log.info('Redis end') }
  )
  client.nodeRedis.on(
    'error',
    function onRedisError (err: Error) { log.error(err) }
  )
  client.nodeRedis.on(
    'warning',
    function onRedisWarning (warning: string) { log.warn(warning) }
  )

  return client
}

const client = createRedisClient()

export default client