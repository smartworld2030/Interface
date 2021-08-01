import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { poolInformation } from '../../../_actions/pool.actions'
import { AppActions, AppState } from '../../../_types'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'

interface IProps {
  isMobile: boolean
}

type PoolProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const delay = 30

const Pool: React.FC<PoolProps> = ({ isMobile, address, poolInformation }) => {
  useEffect(() => {
    let timer
    clearInterval(timer)
    if (address) {
      poolInformation(address)
      timer = setInterval(() => {
        poolInformation(address)
      }, delay * 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [address, poolInformation])

  return (
    <Row justify="between" style={{ height: isMobile ? 1200 : 300 }}>
      <Col md={12} lg={6}>
        <DepositSection isMobile={isMobile} />
      </Col>
      <Col md={6} lg={3}>
        <WithdrawSection width={230} />
      </Col>
      <Col md={6} lg={3}>
        <DetailSection />
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, error, address } = state.account
  return {
    address,
    tokens,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  poolInformation: bindActionCreators(poolInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pool)
