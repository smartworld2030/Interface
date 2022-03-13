import React from 'react'

import { useSpring, animated as a } from 'react-spring'
import Colors from '../../../Theme/Colors'

interface CircleProps {
  width: number
  token: string
  active: boolean
  info?: string
  onClick: (arg: string) => void
}

const TokenCircle: React.FC<CircleProps> = ({
  width,
  active,
  token,
  info,
  onClick,
}) => {
  const half = width / 2
  const r = half - 5
  const { opacity, transform } = useSpring({
    opacity: active ? 1 : 0,
    transform: `rotatey(${active ? 180 : 0}deg) translateX(-35px)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <svg height={width} width={width}>
      <g onClick={() => onClick(token)}>
        <a.g
          style={{
            opacity: opacity.to((o: any) => 1 - o),
            transform: transform.to((t) => `translateX(35px) ${t}`),
          }}
        >
          <circle
            cx={half}
            cy={half}
            r={r}
            stroke={active ? Colors.green : Colors.grey}
            strokeWidth="2.5"
            fill={Colors.background}
          />

          <text
            textAnchor="middle"
            dominantBaseline="middle"
            x="50%"
            y="53%"
            fill="white"
            fontSize="15"
          >
            {token === 'BTCB' ? 'BTC' : token}
          </text>
          <text textAnchor="middle" x="50%" y="80%" fill="white" fontSize="7">
            {/* {info ?? 0} */}
          </text>
        </a.g>
        <a.g
          style={{
            opacity: opacity,
            transform: transform.to(
              (t) => `translateX(35px) rotatey(180deg) ${t}`
            ),
          }}
        >
          <circle
            cx={half}
            cy={half}
            r={r}
            stroke={active ? Colors.green : Colors.grey}
            strokeWidth="2.5"
            fill={Colors.background}
          />
          <text
            textAnchor="middle"
            x="50%"
            y="53%"
            fill="white"
            dominantBaseline="middle"
            fontSize="15"
          >
            {token === 'BTCB' ? 'BTC' : token}
          </text>
          <text textAnchor="middle" x="50%" y="80%" fill="white" fontSize="7">
            {/* {info ?? 0} */}
          </text>
        </a.g>
      </g>
    </svg>
  )
}
export default TokenCircle
