export const messages = {
  available:
    '🦊 Please click Connect button for connection to Binance Smart Chain using Metamask!',
  notAvailable: '🦊 Please install Metamask into your browser: ',
  itsMobile: '🦊 Please use Metamask App!',
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

export const sizeCalculator = (width: number) => {
  const half = width / 2
  let quarter = half / 2
  let eighth = quarter / 2
  const height = 170
  let fristHeight = height
  let secondHeight = height
  let querylimiter = true
  if (width < 600) {
    quarter = half / 1.2
    eighth = quarter / 1.6
    fristHeight = height - 40
    secondHeight = height - 15
    querylimiter = false
  }
  const linkArray = [
    {
      positionX: half - quarter,
      positionY: fristHeight - 54,
      size: 15,
      link: 'stt',
      text: 'STT',
    },
    {
      positionX: half - eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: 'freeze',
      text: 'Freeze',
    },
    {
      positionX: half,
      positionY: height - 10,
      size: 35,
      link: 'invest',
      text: 'Invest',
    },
    {
      positionX: half + eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: 'swap',
      text: 'Swap',
    },
    {
      positionX: half + quarter,
      positionY: fristHeight - 54,
      size: 15,
      link: 'stts',
      text: 'STTS',
    },
  ]
  return { half, quarter, linkArray, eighth, height, querylimiter }
}
