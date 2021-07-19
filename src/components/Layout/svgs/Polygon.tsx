import React from 'react'
import Colors from '../../../Theme/Colors'
import { STT } from '../typography/Tokens'

interface DataCircleProps {
  index: number
  width: number
  point?: number
  enabled?: boolean
}

export const DataPolygon: React.FC<DataCircleProps> = ({
  index,
  width,
  enabled,
  point,
}) => {
  const polySize = width / 6
  const polyPos = polySize + index * (polySize * 2)
  return (
    <g>
      <polygon
        points={`${polyPos},150 ${polyPos - 45},220 ${polyPos + 45},220`}
        fill={Colors.background}
        stroke={enabled ? Colors.green : Colors.grey}
        filter={enabled ? 'url(#ActiveDropShadow)' : 'url(#AnimatedDropShadow)'}
      />
      <foreignObject
        x={polyPos - 15}
        y={enabled ? '175' : '185'}
        fontSize="10"
        width="60"
        height="30"
      >
        <STT />
      </foreignObject>
      <foreignObject
        x={polyPos - 30}
        y="195"
        fill="white"
        fontSize="12"
        width="60"
        height="20"
      >
        {point}
      </foreignObject>
    </g>
  )
}
