import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { AppState } from '_types'
import BnbSwap from './BnbSwap'
import SttSwap from './SttSwap'
import { PriceValue } from './PriceValue'
import Spin from 'antd/lib/spin'
import { FACTORY_ADDRESS, Token, WETH, Fetcher, Route } from '@pancakeswap/sdk'
import { provider } from '_actions/wallet.actions'
import info from '_contracts/info'

interface IProps {
  isMobile: boolean
}

type SwapProps = IProps & ReturnType<typeof mapStateToProps>

const Swap: React.FC<SwapProps> = ({
  isMobile,
  chainId,
  tokens,
  prices,
  dollar,
  error,
  swapLoading,
}) => {
  const fetchData = async () => {
    const STTS = new Token(
      chainId,
      info[chainId].STTS,
      8,
      'Smart World Token - Stock',
      'STTS'
    )

    console.log(STTS, WETH[chainId], FACTORY_ADDRESS)
    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    const pair = await Fetcher.fetchPairData(STTS, WETH[chainId], provider)
    console.log(pair)

    const route = new Route([pair], WETH[chainId])
    console.log(route.pairs) // 201.306
    console.log(route.midPrice.toSignificant(10)) // 201.306
    console.log(route.midPrice.invert().toSignificant(10)) // 0.00496756
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Spin
      style={{
        textAlign: 'center',
        height: 150,
      }}
      spinning={swapLoading}
      tip={error ? error : 'Loading...'}
    >
      <Row
        justify="around"
        style={{ minHeight: isMobile ? 750 : 300 }}
        direction={isMobile ? 'column' : 'row'}
      >
        <Col xs={12}>
          <Row justify="around">
            {Object.keys(tokens)
              .reverse()
              .map(
                (token) =>
                  token !== 'BTCB' && (
                    <PriceValue
                      token={token}
                      prices={prices}
                      value={tokens[token]}
                      dollar={dollar}
                      key={token}
                    />
                  )
              )}
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <BnbSwap />
        </Col>
        <Col xs={12} md={4}>
          <SttSwap />
        </Col>
      </Row>
    </Spin>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, address } = state.account
  const { prices, dollar } = state.bank
  const { chainId } = state.wallet
  const { error, swapLoading } = state.swap
  return {
    chainId,
    address,
    tokens,
    dollar,
    prices,
    swapLoading,
    error,
  }
}

export default connect(mapStateToProps)(Swap)
