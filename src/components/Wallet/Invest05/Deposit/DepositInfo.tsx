import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { investment05Deposit } from '_actions/invest05.actions'
import Colors from 'Theme/Colors'

interface IProps {
  token: string
  value: number
}
type DepositInfoProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const DepositInfo: React.FC<DepositInfoProps> = ({
  fee,
  prices,
  token,
  dollar,
  value,
  error,
  loading,
  account,
  minimum,
  maximum,
  confirmed,
  maxPercent,
  investment05Deposit,
}) => {
  const depositHandler = () => {
    if (!loading && !confirmed) {
      console.log(token, value)
      investment05Deposit(value.toString())
    }
  }

  const calcValue = useMemo(
    () => ((prices[token] * value) / 10 ** 8) * dollar.BTC,
    [prices, token, value, dollar.BTC]
  )

  const calcFee = useMemo(() => (calcValue * fee) / 100, [calcValue, fee])

  const calcDollar = useMemo(() => calcValue - calcFee, [calcFee, calcValue])

  const calcPercent = useCallback(
    (amount) =>
      account.totalAmount + amount < maximum
        ? account.totalAmount + amount < minimum
          ? 0
          : 5
        : 10,
    [account.totalAmount, maximum, minimum]
  )

  const currentPercent = calcPercent(0)

  const gainPercent = useMemo(() => {
    const gain = calcPercent(calcDollar)
    return gain > 5 ? gain - currentPercent : 0
  }, [calcPercent, calcDollar, currentPercent])

  const disableHandler = useMemo(
    () => value <= 0 || calcDollar < minimum || !!error,
    [calcDollar, error, minimum, value]
  )

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
            title={`Investment - ${fee}% Fee`}
            precision={2}
            token="$"
            value={calcDollar}
            doublePrefix="-"
            double={calcFee}
            doubled
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Reward percent"
            token="% Monthly"
            precision={1}
            value={5}
          />
          <TokenValue
            value={currentPercent}
            precision={1}
            doublePrecision={1}
            token="%"
            title="Referral percent"
            double={gainPercent}
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
            disable={disableHandler}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            value={calcDollar * 2}
            precision={0}
            token="$"
            title="Invetment reward"
          />
          <TokenValue
            title="Invetment period"
            token="Month"
            precision={0}
            value={40}
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
    invest05Loading,
    confirmed,
    account,
    fee,
    minimum,
    maximum,
    maxPercent,
  } = state.invest05
  return {
    fee,
    error,
    prices,
    dollar,
    account,
    minimum,
    maximum,
    loggedIn,
    confirmed,
    maxPercent,
    loading: invest05Loading,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investment05Deposit: bindActionCreators(investment05Deposit, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
