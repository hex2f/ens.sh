import redis from '~/redis-client'
import ethers from '~/ethers-client'
import { utils } from 'ethers'
import type { Resolver } from '@ethersproject/providers';
import { createHash } from 'crypto';

export default class Wallet {
  accent?: string
  avatar?: string = ''
  balance: string = '0'
  textRecords: { [key: string]: string } = {}
  
  _resolver?: Resolver
  ens?: string
  address?: string

  constructor(ens?: string, address?: string) {
    this.ens = ens
    this.address = address

    address && (this.accent = `#${address?.slice(2, 8)}`)
  }

  private async fetchBalance() {
    if (!this.address) throw new Error('No address provided')
    const balance = await ethers.getBalance(this.address)
    this.balance = utils.formatEther(balance)
  }

  private async fetchTextRecord(key: string) {
    if (!this._resolver) throw new Error('No resolver provided')
    const record = await this._resolver.getText(key)
    if (record) this.textRecords[key] = record
  }

  private async fetchAvatar() {
    if (!this._resolver) throw new Error('No resolver provided')
    const avatar = await this._resolver.getText('avatar')
    if (avatar) this.avatar = avatar
  }


  async sync() {
    // If no ens or address was provided, throw, as there's nothing to look up :p
    if (!this.ens && !this.address) throw new Error('No address or ens provided')
    // If an ens was provided, but no address, try to resolve address to an ens
    if (this.address && !this.ens) {
      this.ens = await ethers.lookupAddress(this.address) ?? undefined
    }
    // If an ens was provided, or fetched in the previous step, try to get an ens
    // resolver so we can look up text records as well
    if (this.ens) {
      this._resolver = await ethers.getResolver(this.ens) ?? undefined
      if (!this.address) this.address = await this._resolver?.getAddress()
    }
    // If we still dont have an address after all that, give up :(
    if (!this.address) throw new Error('No address found')

    // If we don't have a resolver, we can't sync, return
    if (!this._resolver) return

    // sync text records in parallel
    await Promise.all([
      this.fetchBalance(),
      this.fetchAvatar(),
      this.fetchTextRecord('email'),
      this.fetchTextRecord('url'),
      this.fetchTextRecord('com.discord'),
      this.fetchTextRecord('com.twitter'),
      this.fetchTextRecord('com.github')
    ])

    const walletJson = JSON.stringify(this.toObject())

    void redis.set(`wallet:${this.address}`, walletJson, ['EX', 60 * 60 * 24])
    if (this.ens) {
      const ensHash = createHash('sha256').update(this.ens).digest('hex')
      void redis.set(`wallet:${ensHash}`, walletJson, ['EX', 60 * 60 * 24])
    }
  
    return this
  }

  async fetch() {
    if (!this.address && !this.ens) throw new Error('No address or ens provided')
  
    const cached = await redis.get(`wallet:${this.address || createHash('sha256').update(this.ens!).digest('hex')}`)
  
    if (cached) {
      // sync and re-cache in the background
      void this.sync()
        .catch((e) => {
          console.warn('failed to sync wallet', this.toObject(),  e)
        })
      
      return Object.assign(new Wallet(), JSON.parse(cached))
    } else {
      return await this.sync()
    }
  }

  toObject () {
    return {
      accent: this.accent ?? `#${this.address?.slice(2, 8)}`,
      avatar: this.avatar,
      balance: this.balance,
      textRecords: Object.keys(this.textRecords).length > 0 ? this.textRecords : undefined,
      ens: this.ens,
      address: this.address
    }
  }
}