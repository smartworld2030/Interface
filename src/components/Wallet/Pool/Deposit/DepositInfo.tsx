// @ts-nocheck
import React from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { poolFreeze, poolFreezeLP } from '../../../../_actions/pool.actions'
import Colors from '../../../../Theme/Colors'

interface IProps {
  token: string
  values: { stts: string; bnb: string; lptoken: string }
}
type DepositInfoProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const DepositInfo: React.FC<DepositInfoProps> = ({
  prices,
  tokens,
  dollar,
  values,
  token,
  error,
  loading,
  confirmed,
  poolFreeze,
  poolFreezeLP,
}) => {
  const freezeHandler = () => {
    if (!loading && !confirmed) {
      if (token === 'STTS-BNB') poolFreeze((values.stts * 10 ** 8).toFixed())
      if (token === 'LPTOKEN')
        poolFreezeLP((values.lptoken * 10 ** 18).toFixed())
    }
  }

  const calcSatoshi = () => prices.STTS * values.stts + prices.BNB * values.bnb

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const disableHandler = () =>
    values.stts === '' ||
    !!error ||
    (token === 'STTS-BNB' &&
      (tokens.STTS < values.stts || tokens.BNB < values.bnb)) ||
    (token === 'LPTOKEN' && tokens.LPTOKEN < values.lptoken)

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
            precision={5}
            token="BNB"
            value={values.bnb}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
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
            value={Number(values.stts) * 0.0005}
            precision={2}
            token="STTS"
            title="Daily Reward"
          />
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
  poolFreezeLP: bindActionCreators(poolFreezeLP, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
