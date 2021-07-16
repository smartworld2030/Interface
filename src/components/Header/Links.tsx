import { InvestLogo } from './InvestLogo'
import { SwapLogo } from './SwapLogo'
import { SttLogo } from './SttLogo'

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
      link: '/info',
      text: 'Info',
      icon: <div></div>,
    },
    {
      positionX: half - eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: '/freeze',
      text: 'Freeze',
      icon: <SttLogo width={40} x={half - eighth - 20} y={secondHeight - 70} />,
    },
    {
      positionX: half,
      positionY: height - 10,
      size: 35,
      link: '/invest',
      text: 'Invest',
      icon: <InvestLogo width={60} x={half - 30} y={height - 75} />,
    },
    {
      positionX: half + eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: '/swap',
      text: 'Swap',
      icon: (
        <SwapLogo width={40} x={half + eighth - 20} y={secondHeight - 70} />
      ),
    },
    {
      positionX: half + quarter,
      positionY: fristHeight - 54,
      size: 15,
      link: '/stts',
      text: 'STTS',
      icon: <div></div>,
    },
  ]
  return { half, quarter, linkArray, eighth, height, querylimiter }
}
