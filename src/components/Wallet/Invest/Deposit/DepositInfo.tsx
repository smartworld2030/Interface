import React from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { investmentDeposit } from '../../../../_actions/invest.actions'
import Colors from '../../../../Theme/Colors'

interface IProps {
  token: string
  value: number
}
type DepositInfoProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const DepositInfo: React.FC<DepositInfoProps> = ({
  prices,
  token,
  dollar,
  value,
  error,
  loading,
  account,
  confirmed,
  maxPercent,
  investmentDeposit,
}) => {
  const depositHandler = () => {
    if (!loading && !confirmed) {
      console.log(token, value)
      investmentDeposit(token, value)
    }
  }

  const calcSatoshi = () => prices[token] * value

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const calcSTT = () => calcSatoshi() / 2.5 / prices.STT

  const calcPercent = () => {
    const multiple = token === 'STTS' ? 1.25 : 1
    const cal = (calcSatoshi() * multiple * maxPercent) / 5000000

    return cal + account.percent <= maxPercent
      ? cal
      : maxPercent - account.percent
  }

  const disableHandler = () => value <= 0 || calcSatoshi() < 500000 || !!error

  return (
    <Row
      align="center"
      justify="around"
      direction="column"
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Number of tokens"
            precision={token === 'STTS' ? 0 : 4}
            token={token}
            value={value}
          />
          <TokenValue
            title="Price(Satoshi)"
            token="SATS"
            precision={0}
            value={calcSatoshi()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Price(Smart Bits)"
            token="NFT"
            precision={1}
            value={calcSatoshi() / 100}
          />
          <TokenValue
            title="Price(Dollar)"
            precision={2}
            token="$"
            value={calcDollar()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around" direction="column">
          {confirmed && <p style={{ color: Colors.green }}>Confirmed!</p>}
          {loading && <p style={{ color: Colors.green }}>Waiting...</p>}
          {error && <p style={{ color: Colors.red }}>{error}</p>}
          <DepositButton
            width={90}
            onClick={depositHandler}
            done={confirmed}
            loading={loading}
            disable={disableHandler()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            value={calcSTT()}
            precision={0}
            title="Invetment reward"
          />
          <TokenValue
            value={account.percent / 250}
            precision={3}
            token="%"
            title="Referral percent"
            double={calcPercent() / 250 < 0.001 ? 0 : calcPercent() / 250}
            doubled
          />
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { loggedIn, error } = state.account
  const { prices, dollar } = state.bank
  const {
    investLoading,
    confirmed,
    account,
    error: investError,
    maxPercent,
  } = state.invest
  return {
    error: error || investError,
    prices,
    dollar,
    account,
    loggedIn,
    confirmed,
    maxPercent,
    loading: investLoading,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investmentDeposit: bindActionCreators(investmentDeposit, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
