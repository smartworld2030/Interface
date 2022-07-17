import React, { ReactText } from 'react'
import { useSpring, animated as a } from 'react-spring'
import Colors from '../../../Theme/Colors'

const substring = (str) =>
  str.substring(str.indexOf('.') + 1, str.lastIndexOf('.'))

interface CircleProps {
  width: number
  token: string
  active: boolean
  image?: string
  infoSize?: ReactText
  fontProps?: {
    stroke?: string
    fontSize?: ReactText
    strokeWidth?: string
    style?: any
  }
  disabled?: boolean
  info?: string
  onClick: (arg: string) => void
}

const TokenCircle: React.FC<CircleProps> = ({
  width,
  active,
  token,
  info,
  image,
  disabled,
  infoSize = 7,
  fontProps,
  onClick,
}) => {
  const half = width / 2
  const r = half - 5

  const { opacity, transform } = useSpring({
    opacity: active ? 1 : 0,
    transform: `rotatey(${active ? 180 : 0}deg) translateX(-${half}px)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <svg height={width} width={width}>
      {image && (
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
          <pattern
            id={substring(image)}
            x="0"
            patternUnits="userSpaceOnUse"
            y="0"
            height="100%"
            width="100%"
          >
            <image
              x="0"
              y="0"
              height="100%"
              width="100%"
              filter="url(#blurMe)"
              xlinkHref={image}
            />
          </pattern>
        </defs>
      )}
      <g onClick={() => disabled || onClick(token)}>
        <a.g
          style={{
            opacity: opacity.to((o: any) => 1 - o),
            transform: transform.to((t) => `translateX(${half}px) ${t}`),
          }}
        >
          <circle
            cx={half}
            cy={half}
            r={r}
            stroke={active ? Colors.green : Colors.grey}
            strokeWidth="2.5"
            fill={image ? `url(#${substring(image)})` : Colors.background}
            filter="grayscale(100%)"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            x="50%"
            y="53%"
            fill="white"
            {...fontProps}
          >
            {token === 'BTCB' ? 'BTC' : token}
          </text>
          <text
            textAnchor="middle"
            x="50%"
            y="80%"
            fill="white"
            {...fontProps}
            fontSize={infoSize}
          >
            {disabled ? 0 : info ?? 0}
          </text>
        </a.g>
        <a.g
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: opacity,
            transform: transform.to(
              (t) => `translateX(${half}px) rotatey(180deg) ${t}`
            ),
          }}
        >
          <circle
            cx={half}
            cy={half}
            r={r}
            stroke={active ? Colors.green : Colors.grey}
            strokeWidth="2.5"
            fill={image ? `url(#${substring(image)})` : Colors.background}
          />
          <text
            textAnchor="middle"
            x="50%"
            y="53%"
            fill="white"
            dominantBaseline="middle"
            {...fontProps}
          >
            {token === 'BTCB' ? 'BTC' : token}
          </text>
          <text
            textAnchor="middle"
            x="50%"
            y="80%"
            fill="white"
            {...fontProps}
            fontSize={infoSize}
          >
            {info ?? 0}
          </text>
        </a.g>
      </g>
    </svg>
  )
}
export default TokenCircle
