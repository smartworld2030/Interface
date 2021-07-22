import { truncate } from '../../../_helpers/api'
import React from 'react'
import { Row } from 'react-grid-system'

interface PriceValueProps {
  token: string
  value: number
  prices: any
  dollar: any
}

export const PriceValue: React.FC<PriceValueProps> = ({
  prices,
  dollar,
  token,
  value,
}) => {
  const calcSatoshi = () => prices[token] * value

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  return (
    <Row direction="column">
      <span>
        {token}: {truncate(value.toString(), 4)}
      </span>
      <span>{truncate(calcDollar().toString(), 2)} $</span>
      <span>{truncate(calcSatoshi().toString(), 2)} SATS</span>
    </Row>
  )
}
