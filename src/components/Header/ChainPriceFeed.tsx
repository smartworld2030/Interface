import React from 'react'
import Marquee from 'react-fast-marquee'
import { connect } from 'react-redux'
import { truncate } from '../../_helpers/api'
import { AppState } from '../../_types'

interface ChainPriceFeedProps {}

type IProps = ChainPriceFeedProps & ReturnType<typeof mapStateToProps>

export const ChainPriceFeed: React.FC<IProps> = ({
  prices,
  dollar,
  total,
  totalSupply,
}) => {
  const calcBTC = (value) => value / prices.BTCB

  const calcBtcPrice = (value) =>
    Math.round(calcBTC(value) * dollar.BTC).toLocaleString('en')

  const calcDollar = (token, cut = 2) =>
    truncate(
      ((prices[token] / 10 ** 8) * dollar.BTC).toString(),
      token === 'STTS' ? 4 : cut
    )

  return prices && total ? (
    <Marquee gradient={false}>
      <div style={{ display: 'inline-flex', padding: '0 10', fontSize: 13 }}>
        <div>
          STTS:
          <p className="price-value">
            {calcDollar('STTS')}
            <span>$</span>
          </p>
          BTC:
          <p className="price-value">
            {calcBtcPrice(100000000)}
            <span>$</span>
          </p>
          BNB:
          <p className="price-value">
            {calcDollar('BNB')}
            <span>$</span>
          </p>
          Minimum Investment:
          <p className="price-value">
            {50}
            <span>$</span>
          </p>
          Smart Land:
          <p className="price-value">{10000 - totalSupply}</p>
        </div>
      </div>
    </Marquee>
  ) : null
}
const mapStateToProps = (state: AppState) => {
  const { tokens } = state.account
  const {
    prices,
    dollar,
    total,
    tokens: { STTS },
  } = state.bank
  const { totalSupply } = state.land
  return {
    totalSupply,
    total,
    tokens,
    prices,
    dollar,
    STTS,
  }
}

export default connect(mapStateToProps)(ChainPriceFeed)
