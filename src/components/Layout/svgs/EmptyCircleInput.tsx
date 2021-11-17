import React from 'react'
import Colors from '../../../Theme/Colors'

interface PoolCircleInputProps extends React.HTMLAttributes<SVGElement> {
  percent: number
  width: number
  disable?: boolean
}

export const EmptyCircleInput: React.FC<PoolCircleInputProps> = ({
  percent,
  width,
  onClick,
  disable,
  ...rest
}) => {
  percent = percent > 0 ? percent * 10 : 0
  const strokeCalculate = () =>
    `0,${percent % 1000},0,${1000 - (percent % 1000)}`

  return (
    <svg
      style={{
        position: 'relative',
        zIndex: 15,
        top: 0,
        left: 0,
        width: width,
        touchAction: 'none',
      }}
      viewBox="0 0 360 360"
    >
      <g {...rest}>
        <circle r="160" cx="180" cy="180" fill={Colors.background} />
        <path
          fill="none"
          stroke={
            disable
              ? Colors.grey
              : percent < 500
              ? percent > 250
                ? Colors.yellow
                : Colors.red
              : Colors.green
          }
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${percent},1000`}
          d="M 180 20 
          a 160 160 0 0 1 0 320 
          a 160 160 0 0 1 0 -320"
        />
        <path
          fill="none"
          stroke={percent === Infinity ? Colors.red : 'white'}
          strokeWidth={percent === Infinity ? '10' : '25'}
          strokeLinecap="round"
          strokeDasharray={strokeCalculate()}
          d="M180 20.845
          a 159.155 159.155 0 0 1 0 318.31
          a 159.155 159.155 0 0 1 0 -318.31"
        />
      </g>
      <svg
        viewBox="0 0 100 100"
        focusable="false"
        data-icon="check"
        fill={disable ? Colors.grey : Colors.green}
        onClick={disable ? undefined : onClick}
      >
        <path
          opacity="0.6"
          className="ref-btn-scale-1"
          d="M 50 20 L 70 50 L 30 50 L 50 20"
        />
        <path
          opacity="0.6"
          className="ref-btn-scale-2"
          d="M 30 55 L 20 70 L 40 70 L 30 55"
        />
        <path
          opacity="0.6"
          className="ref-btn-scale-3"
          d="M 70 55 L 80 70 L 60 70 L 70 55"
        />
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="bold"
          fill={
            disable
              ? Colors.grey
              : percent < 500
              ? percent > 250
                ? Colors.yellow
                : Colors.red
              : Colors.green
          }
        >
          {percent / 10}%
        </text>
      </svg>
    </svg>
  )
}
