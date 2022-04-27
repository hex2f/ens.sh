import { ethers } from 'ethers'

const client = new ethers.providers.WebSocketProvider(process.env.WEB3 || 'ws://localhost:3334')

export default client
