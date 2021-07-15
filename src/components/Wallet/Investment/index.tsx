import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { investInformation } from '../../../_actions/invest.actions'
import { AppActions, AppState } from '../../../_types'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'
import { tokenPrices } from '../../../_actions/bank.actions'

interface IProps {
  isMobile: boolean
}

type InvestmentProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const delay = 30

const Investment: React.FC<InvestmentProps> = ({
  isMobile,
  address,
  tokenPrices,
  investInformation,
}) => {
  useEffect(() => {
    let timer
    clearInterval(timer)
    if (address) {
      tokenPrices()
      investInformation(address)
      timer = setInterval(() => {
        tokenPrices()
        investInformation(address)
      }, delay * 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [address, investInformation, tokenPrices])

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
  investInformation: bindActionCreators(investInformation, dispatch),
  tokenPrices: bindActionCreators(tokenPrices, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Investment)
