import React from 'react'
import Button from 'antd/lib/button'

interface PairTokensProps {
  width: number
  token: string
  onClick: (arg: string) => void
}

const PairTokens: React.FC<PairTokensProps> = ({ width, token, onClick }) => {
  return (
    <Button
      shape="circle"
      style={{ width, height: width, fontSize: width / 7 }}
      onClick={() => onClick(token)}
    >
      {token}
    </Button>
  )
}
export default PairTokens
