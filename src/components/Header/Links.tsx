import Colors from 'Theme/Colors'
import { GameLogo } from './GameLogo'
import { InvestLogo } from './InvestLogo'
import { SmartInfo } from './SmartInfo'
import { SmartNFT } from './SmartNFT'
import { StlLogo } from './StlLogo'
import { SwapLogo } from './SwapLogo'

export const sizeCalculator = (width: number) => {
  const half = width / 2
  let quarter = half / 2
  let eighth = quarter / 1.6
  const height = 170
  let fristHeight = height
  let secondHeight = height
  let querylimiter = true
  if (width < 600) {
    quarter = half / 1.2
    eighth = quarter / 1.3
    fristHeight = height - 40
    secondHeight = height - 25
    querylimiter = false
  }
  const linkArray = [
    {
      positionX: half - quarter,
      positionY: fristHeight - 54,
      size: 15,
      link: '/info',
      text: '',
      textPos: fristHeight - 69,
      number: 0,
      icon: (
        <SmartInfo width={25} x={half - quarter - 12} y={fristHeight - 81} />
      ),
    },
    {
      positionX: half - eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: '/swap',
      text: '',
      textPos: secondHeight - 55,
      number: 4,
      icon: (
        <SwapLogo width={40} x={half - eighth - 20} y={secondHeight - 69} />
      ),
    },
    {
      positionX: half - (width < 600 ? 45 : 50),
      positionY: height - 10,
      size: 35,
      link: '/invest02',
      text: '',
      textPos: height - 66,
      number: 1,
      icon: (
        <InvestLogo
          width={70}
          x={half - (width < 600 ? 80 : 85)}
          y={height - 80}
        />
      ),
    },
    {
      positionX: half + (width < 600 ? 45 : 50),
      positionY: height - 10,
      size: 35,
      link: '/land',
      text: '',
      textPos: height - 66,
      number: 2,
      icon: (
        <>
          <svg viewBox={`-70 -15 ${half} ${height}`}>
            <circle
              r="7"
              stroke="white"
              fill={Colors.red}
              cx={half / 2}
              cy={height / 2}
            />
            <text
              x="50%"
              y="50%"
              fill="white"
              fontSize="4"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              New
            </text>
          </svg>
          <StlLogo
            width={75}
            x={half + (width < 600 ? 8 : 13)}
            y={height - 81}
          />
        </>
      ),
    },
    {
      positionX: half + eighth,
      positionY: secondHeight - 29,
      size: 20,
      link: '/game',
      text: '',
      textPos: secondHeight - 55,
      number: 3,
      icon: (
        <GameLogo width={42} x={half + eighth - 21} y={secondHeight - 70} />
      ),
    },
    {
      positionX: half + quarter,
      positionY: fristHeight - 54,
      size: 15,
      link: '/nft',
      text: '',
      number: 0,
      textPos: fristHeight - 69,
      icon: (
        <SmartNFT width={25} x={half + quarter - 12} y={fristHeight - 81} />
      ),
    },
  ]
  return { half, quarter, linkArray, eighth, height, querylimiter }
}
