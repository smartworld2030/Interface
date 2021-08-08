import React from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { poolFreeze, poolUnfreeze } from '../../../../_actions/pool.actions'
import Colors from '../../../../Theme/Colors'

interface IProps {
  token: string
  values: { stts: number; bnb: number }
}
type DepositInfoProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const DepositInfo: React.FC<DepositInfoProps> = ({
  prices,
  tokens,
  dollar,
  values,
  account,
  error,
  loading,
  confirmed,
  poolFreeze,
}) => {
  const freezeHandler = () => {
    if (!loading && !confirmed) {
      poolFreeze()
    }
  }

  const calcSatoshi = () => prices.STTS * values.stts + prices.BNB * values.bnb

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const disableHandler = () =>
    !!error ||
    (values.stts === 0 && !account.expired) ||
    tokens.STTS < values.stts ||
    tokens.BNB < values.bnb

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
            title="Number of STTS"
            precision={1}
            token="STTS"
            value={values.stts}
          />
          <TokenValue
            title="Number of BNB"
            precision={8}
            token="BNB"
            value={values.bnb}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Price(Satoshi)"
            token="SATS"
            precision={0}
            value={calcSatoshi()}
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
            onClick={freezeHandler}
            done={confirmed}
            loading={loading}
            disable={disableHandler()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            value="37"
            token="Day"
            precision={0}
            title="Freeze Duration"
          />
          <TokenValue value="6872" precision={0} title="Freeze Reward" />
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { loggedIn, tokens, error } = state.account
  const { prices, dollar } = state.bank
  const { poolLoading, confirmed, account } = state.pool
  return {
    error,
    prices,
    tokens,
    dollar,
    account,
    loggedIn,
    confirmed,
    loading: poolLoading,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  poolFreeze: bindActionCreators(poolFreeze, dispatch),
  poolUnfreeze: bindActionCreators(poolUnfreeze, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
