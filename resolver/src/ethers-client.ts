import { ethers } from 'ethers'
import log from './log'

// this is a bit unnecessary, but i dont know how to do it in a properly typed way otherwise
let client = new ethers.providers.WebSocketProvider(process.env.WEB3 || 'ws://localhost:3334')

const EXPECTED_PONG_BACK = 15000
const KEEP_ALIVE_CHECK_INTERVAL = 7500

const startConnection = () => {
  client = new ethers.providers.WebSocketProvider(process.env.WEB3 || 'ws://localhost:3334')

  let pingTimeout: NodeJS.Timeout
  let keepAliveInterval: NodeJS.Timer

  client._websocket.on('open', () => {
    keepAliveInterval = setInterval(() => {
      log.debug('Checking if the connection is alive, sending a ping')

      client._websocket.ping()

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      pingTimeout = setTimeout(() => {
        client._websocket.terminate()
      }, EXPECTED_PONG_BACK)
    }, KEEP_ALIVE_CHECK_INTERVAL)

    // TODO: handle contract listeners setup + indexing
  })

  client._websocket.on('close', () => {
    log.error('The websocket connection was closed')
    clearInterval(keepAliveInterval)
    clearTimeout(pingTimeout)
    startConnection()
  })

  client._websocket.on('pong', () => {
    log.debug('Received pong, so connection is alive, clearing the timeout')
    clearInterval(pingTimeout)
  })
}

startConnection()

export default client
