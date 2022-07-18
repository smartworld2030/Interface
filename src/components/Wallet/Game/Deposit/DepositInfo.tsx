import React, { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'react-grid-system'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { connect } from 'react-redux'
import { requestBuyStock } from '_actions/stock.actions'
import Colors from '../../../../Theme/Colors'

interface IProps {
  token: string
  value: number
  tokenPrice: number
  moreThanRemain: boolean
}
type DepositInfoProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const DepositInfo: React.FC<DepositInfoProps> = ({
  data,
  token,
  value,
  moreThanRemain,
  error,
  loading,
  confirmed,
  tokenPrice,
  // requestBuyStock,
}) => {
  const buyStockHandler = () => {}
  // useCallback(() => {
  //   if (!loading && !confirmed) {
  //     console.log(token, value)
  //     // requestBuyStock(
  //     //   token === 'STC' ? 'buySmartCarStock' : 'buySmartRobotStock',
  //     //   value
  //     // )
  //   }
  // }, [confirmed, loading, requestBuyStock, token, value])

  const calcToken = useMemo(() => value * tokenPrice, [tokenPrice, value])

  const disableHandler = useMemo(
    () => value <= 0 || moreThanRemain || !!error,
    [moreThanRemain, value, error]
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
            title="number of token(BUSD)"
            precision={2}
            token="$"
            value={Math.floor(calcToken)}
          />
          <TokenValue
            value={value}
            token={token}
            title={`number of token(${token})`}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="BUSD Balance"
            precision={2}
            token="BUSD"
            value={data.BUSD}
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
            onClick={buyStockHandler}
            done={confirmed}
            loading={loading}
            disable={disableHandler}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Stock Price"
            token="$"
            value={token === 'STC' ? '20' : '10'}
          />
          <TokenValue
            value={
              token === 'STC'
                ? data.remainingCarStock
                : data.remainingRobotStock
            }
            precision={0}
            token={token}
            title="Remining Token"
          />
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { stockLoading, data, confirmed, error } = state.stock

  return {
    error,
    loading: stockLoading,
    data,
    confirmed,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  requestBuyStock: bindActionCreators(requestBuyStock, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfo)
