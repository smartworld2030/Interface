import React from 'react'
import Colors from '../../../Theme/Colors'
import Button from 'antd/lib/button'

interface ReferralPolygonProps {
  width: number
  disable?: boolean
  onClick: () => void
}

const ReferralButton: React.FC<ReferralPolygonProps> = ({
  width,
  disable,
  onClick,
}) => {
  return (
    <Button
      shape="circle"
      type="default"
      style={{
        height: width,
        width: width,
        padding: 0,
        borderWidth: 3,
        backgroundColor: '#2d2d2d',
      }}
      onClick={disable ? undefined : onClick}
    >
      <svg
        viewBox="0 0 100 100"
        focusable="false"
        data-icon="check"
        opacity="0.5"
        fill={disable ? Colors.grey : Colors.green}
      >
        <path className="ref-btn-scale-1" d="M50 17 69 47 31 47 50 17" />
        <path className="ref-btn-scale-2" d="M30 50 16 70 43 70 30 50" />
        <path className="ref-btn-scale-3" d="M70 50 83 70 56 70 70 50" />
      </svg>
    </Button>
  )
}

export default ReferralButton
