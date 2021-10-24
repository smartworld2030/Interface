import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { AppState } from '../../../_types'
import BnbSwap from './BnbSwap'
import { PriceValue } from './PriceValue'
import Spin from 'antd/lib/spin'

interface IProps {
  isMobile: boolean
}

type SwapProps = IProps & ReturnType<typeof mapStateToProps>

const Swap: React.FC<SwapProps> = ({
  isMobile,
  tokens,
  prices,
  dollar,
  error,
  swapLoading,
}) => {
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
        style={{ minHeight: 300 }}
        direction={isMobile ? 'column' : 'row'}
      >
        <Col xs={12}>
          <Row justify="around">
            {Object.keys(tokens)
              .reverse()
              .map(
                (token) =>
                  ['STT', 'BTCB'].includes(token) && (
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
