export const messages = {
  available:
    '🦊 Please click Connect button for connection to Binance Smart Chain using your wallet!',
  notAvailable: '🦊 Please install Metamask into your browser: ',
  itsMobile: '🦊 Please use Metamask/TrustWallet App!',
  loading: 'Loading...',
}

export const supportedChain = (chainId?: number) =>
  chainId === 56 || chainId === 97

export const getTheTime = (minutes: number = 0): number => {
  var d = new Date()
  var t = d.getTime()
  const ms = minutes * 60000
  return t + ms / 1000
}

export const UniqId = (): string => {
  return getTheTime(Math.random()).toString(36)
}

export const shorter = (str: any) =>
  str?.length > 8 ? str.slice(0, 10) + '...' + str.slice(-4) : str

export const tooShorter = (str: any) =>
  str?.length > 8 ? str.slice(0, 2) + '...' + str.slice(-4) : str
