import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { AppState } from '../../../_types'
import BnbSwap from './BnbSwap'
import SttSwap from './SttSwap'

interface IProps {
  isMobile: boolean
}

type SwapProps = IProps & ReturnType<typeof mapStateToProps>

const Swap: React.FC<SwapProps> = ({ isMobile }) => {
  return (
    <Row
      justify="around"
      style={{ minHeight: isMobile ? 750 : 300 }}
      direction={isMobile ? 'column' : 'row'}
    >
      <Col xs={12} md={4}>
        <BnbSwap />
      </Col>
      <Col xs={12} md={4}>
        <SttSwap />
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, error, address } = state.account
  const { chainId } = state.wallet
  return {
    chainId,
    address,
    tokens,
    error,
  }
}

export default connect(mapStateToProps)(Swap)
