import React from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { investment02Deposit } from '../../../../_actions/invest02.actions'
import { rewardPercent, rewardPeriod } from '../DepositTable'
import Colors from '../../../../Theme/Colors'
import { referralPercent } from '../DepositTable'

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
  investment02Deposit,
}) => {
  const depositHandler = () => {
    if (!loading && !confirmed) {
      console.log(token, value)
      investment02Deposit(token, value)
    }
  }

  const currentPercent = account.refPercent / 1000

  const calcSatoshi = () => {
    return prices[token] * value
  }

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const calcReward = () => {
    const multiple = token === 'STTS' ? 1 : 0.75

    return calcDollar() * multiple
  }

  const calcPercent = () => {
    const cal = referralPercent(account.totalAmount + calcReward())

    return cal - currentPercent
  }

  const disableHandler = () => value <= 0 || calcDollar() < 100 || !!error

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
            title="Price(Dollar)"
            precision={2}
            token="$"
            value={calcDollar()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Reward percent"
            token="% Monthly"
            precision={1}
            value={rewardPercent(calcReward())}
          />
          <TokenValue
            value={currentPercent}
            precision={3}
            token="%"
            title="Referral percent"
            double={calcPercent() < 0.001 ? 0 : calcPercent()}
            doubled
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row
          align="center"
          justify="around"
          direction="column"
          style={{ position: 'relative' }}
        >
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
            value={calcReward() * 2}
            precision={0}
            token="$"
            title="Invetment reward"
          />
          <TokenValue
            title="Invetment period"
            token="Month"
            precision={0}
            value={rewardPeriod(calcReward()) ? rewardPeriod(calcReward()) : 0}
          />
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { loggedIn, error } = state.account
  const { prices, dollar } = state.bank
  const { invest02Loading, confirmed, account } = state.invest02
  return {
    error,
    prices,
    dollar,
    account,
    loggedIn,
    confirmed,
    loading: invest02Loading,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investment02Deposit: bindActionCreators(investment02Deposit, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
