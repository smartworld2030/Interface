import Colors from '../../../Theme/Colors'

interface SelectCircleProps {
  width: number
  token: string
  info?: string
  isMobile: boolean
  changeToken: boolean
  setChangeToken: (args: any) => void
}

const TokenSelectCircle: React.FC<SelectCircleProps> = ({
  width,
  token,
  isMobile,
  setChangeToken,
  changeToken,
}) => {
  const half = width / 2
  const r = half - 5
  return (
    <svg height={width} width={width}>
      <g onClick={() => setChangeToken((prev) => !prev)}>
        <circle
          cx={half}
          cy={half}
          r={r}
          stroke={Colors.green}
          strokeWidth="2.5"
          fill={Colors.background}
        />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x="50%"
          y="50%"
          fill="white"
          fontSize={width / 7}
        >
          {token === 'BTCB' ? 'BTC' : token}
        </text>
        <svg
          fill={changeToken ? 'white' : Colors.green}
          x={isMobile ? half * 0.95 : half * 0.9}
          y={half * 1.4}
          viewBox={`0 0 ${width / 4} ${width / 4}`}
        >
          {isMobile ? (
            changeToken ? (
              <path d="M 1 0 L 1 2.5 L 0 1.25 L 1 0" />
            ) : (
              <path d="M 0 0 L 0 2.5 L 1 1.25 L 0 0" />
            )
          ) : changeToken ? (
            <path d="M 0 1 L 2.5 1 L 1.25 0 L 0 1" />
          ) : (
            <path d="M 0 0 L 2.5 0 L 1.25 1 L 0 0" />
          )}
        </svg>
      </g>
    </svg>
  )
}
export default TokenSelectCircle
