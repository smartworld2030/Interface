import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../_types'
import { Container, Row, Col } from 'react-grid-system'
import { accountTokenBalances } from '../../../_actions/account.actions'
import { bankTokenBalances, tokenPrice } from '../../../_actions/bank.actions'
import { Footer } from '../Freeze/Footer'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'

interface InvestmentProps {
  isMobile: boolean
}

type IProps = InvestmentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

const Investment: React.FC<IProps> = ({
  isMobile,
  tokens,
  accountTokenBalances,
  bankTokenBalances,
  tokenPrice,
}) => {
  // const [width, setWidth] = useState(300)

  console.log(tokens)

  useEffect(() => {
    accountTokenBalances(['STT', 'STTS', 'BTCB'])
    bankTokenBalances(['BTCB', 'STTS', 'STT'])
    tokenPrice(['btc', 'bnb', 'stts'])
    // @ts-ignore
    // requestInvest('BTCB')
  }, [])

  return (
    <Container fluid>
      <Row
        gutterWidth={10}
        justify="between"
        align="center"
        style={{ textAlign: 'center', fontSize: 15 }}
      >
        <Col md={12}>Investment</Col>
      </Row>
      <Row justify="between" style={{ minHeight: isMobile ? 1000 : 300 }}>
        <Col md={12} lg={6}>
          <DepositSection isMobile={isMobile} />
        </Col>
        <Col md={6} lg={3}>
          <WithdrawSection
            width={230}
            hourly={100202020}
            referral={12212122}
            lastWithdraw={1625220571}
            setOpen={() => console.log('Withdraw')}
          />
        </Col>
        <Col md={6} lg={3}>
          <DetailSection />
        </Col>
      </Row>
      <br />
      <Row gutterWidth={10}>
        <Col md={12}>
          <Footer address={'account'} active={true} project={'invest'} />
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, error } = state.account
  return {
    tokens,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  accountTokenBalances: bindActionCreators(accountTokenBalances, dispatch),
  bankTokenBalances: bindActionCreators(bankTokenBalances, dispatch),
  tokenPrice: bindActionCreators(tokenPrice, dispatch),
  // requestInvest: bindActionCreators(requestInvest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Investment)
