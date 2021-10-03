import React from 'react'
import Colors from '../../../Theme/Colors'

interface DataCircleProps {
  index?: number
  width?: number
  point?: number
  enabled?: boolean
}

export const DataPolygon: React.FC<DataCircleProps> = ({
  index = 1,
  width = 100,
  enabled,
  children,
}) => {
  const polySize = width / 6
  const polyPos = polySize + index * (polySize * 2)
  return (
    <svg viewBox="100 100">
      <polygon
        points={`${polyPos},150 ${polyPos - 45},220 ${polyPos + 45},220`}
        fill={Colors.background}
        stroke={enabled ? Colors.green : Colors.grey}
        filter={enabled ? 'url(#ActiveDropShadow)' : 'url(#AnimatedDropShadow)'}
      />
      {children}
    </svg>
  )
}
