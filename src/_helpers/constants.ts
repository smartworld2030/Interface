import notification from 'antd/lib/notification'

export const messages = {
  available:
    '🦊 Please click Connect button for connection to Binance Smart Chain using your wallet!',
  notAvailable: '🦊 Please install Metamask into your browser: ',
  itsMobile: '🦊 Please use Metamask/TrustWallet App!',
  loading: 'Loading...',
}

export const copyAddress = (text: string, message = 'Address Copied!') => {
  if (navigator.clipboard) navigator.clipboard.writeText(text)
  else {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  notification.success({
    message,
    placement: 'bottomRight',
    duration: 2,
    closeIcon: null,
  })
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

export const poolReward = [
  '0.00000005',
  '0.0000001',
  '0.0000002',
  '0.0000004',
  '0.0000008',
  '0.0000016',
  '0.0000032',
  '0.0000064',
  '0.0000128',
  '0.0000256',
  '0.0000512',
  '0.0001024',
  '0.0002048',
  '0.0004096',
  '0.0008192',
  '0.0016384',
  '0.0032768',
  '0.0065536',
  '0.0131072',
  '0.0262144',
  '0.0524288',
  '0.1048576',
  '0.2097152',
  '0.4194304',
  '0.8388608',
  '1.67',
  '3.35',
  '6.71',
  '13.42',
  '26.84',
  '53.68',
  '107.37',
  '214.74',
  '429.49',
  '858.99',
  '1717.98',
  '3435.97',
  '6871.94',
]
