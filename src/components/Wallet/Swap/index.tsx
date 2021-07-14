import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import AccountAddress from '../Global/AccountAddress'
import { AppActions, AppState } from '../../../_types'
import { requestSwap } from '../../../_actions/swap.actions'
import BnbSwap from './BnbSwap'
import SttSwap from './SttSwap'

interface IProps {
  isMobile: boolean
}

type SwapProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Swap: React.FC<SwapProps> = ({ isMobile, tokens, requestSwap }) => {
  return (
    <Container fluid>
      <Row gutterWidth={10} justify="between" align="center">
        <Col md={12}>
          <AccountAddress />
        </Col>
      </Row>
      <Row justify="around" style={{ minHeight: isMobile ? 1200 : 300 }}>
        <Col xs={4}>
          <BnbSwap isMobile={isMobile} />
        </Col>
        <Col xs={4}>
          <SttSwap isMobile={isMobile} />
        </Col>
      </Row>
    </Container>
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
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  requestSwap: bindActionCreators(requestSwap, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
