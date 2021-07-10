import React from 'react'
import Colors from '../../../Theme/Colors'

interface ReferralPolygonProps {
  width: number
  done: boolean
  loading: boolean
  disable?: boolean
  onClick: () => void
}

const ReferralButton: React.FC<ReferralPolygonProps> = ({
  width,
  done,
  loading,
  disable,
  onClick,
}) => {
  width = width + 50
  const half = width / 2
  const r = half - 30
  return (
    <svg height={width - 50} width={width}>
      <g
        onClick={disable ? undefined : onClick}
        className={loading ? 'loadingDeposit' : undefined}
      >
        <circle
          cx={half}
          cy={half - 25}
          r={r}
          strokeLinecap="round"
          stroke={disable ? 'grey' : Colors.green}
          strokeWidth="2.5"
          fill={Colors.background}
        />
        <svg
          viewBox="0 0 100 100"
          focusable="false"
          data-icon="check"
          opacity={loading || done ? '1' : '0.5'}
          fill={disable ? 'grey' : Colors.green}
        >
          {done ? (
            <path d="M76.583 29.11h-4.66c-.653 0-1.273.3-1.673.813L42.763 64.743 29.583 48.043a2.133 2.133 0 0 0-1.673-.813H23.25c-.447 0-.693.513-.42.86l18.26 23.133c.853 1.08 2.493 1.08 3.353 0l32.56-41.26c.273-.34.027-.853-.42-.853z" />
          ) : (
            <path
              className={loading ? 'doneSplash' : ''}
              d="M30 49 17 69 42 69 30 49M50 17 69 47 31 47 50 17M70 49 82 69 57 69 70 49"
            ></path>
          )}
        </svg>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x="50%"
          y="53%"
          fill="white"
          fontWeight="bold"
          fontSize="15"
        >
          {done ? '' : loading ? '' : ''}
        </text>
      </g>
    </svg>
  )
}

export default ReferralButton
