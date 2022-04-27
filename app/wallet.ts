import type { Icon } from "./utilities/icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: Icon;
}

export interface ImageNFT {
  image: string
  name: string
  collection: {
    name: string
    image: string
    contract: string
  }
}

export default class Wallet {
  accent: string
  accentHue: number
  ens: string
  address: string
  avatar: string
  balance: number
  socialLinks: SocialLink[]

  constructor({ accent, accentHue, ens, address, avatar, balance, socialLinks }: Partial<Wallet>) {
    this.accent = accent ?? '#3a92f0'
    this.accentHue = accentHue ?? 200
    this.ens = ens ?? ''
    this.address = address ?? '0x0000000000000000000000000000000000000000'
    this.avatar = avatar ?? ''
    this.balance = balance ?? 0
    this.socialLinks = socialLinks ?? []
  }
}