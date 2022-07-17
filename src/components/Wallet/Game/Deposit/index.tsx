import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeError } from '../../../../_actions/invest.actions'
import { AppActions, AppState } from '../../../../_types'
import {
  convertNumbers2English,
  percentToValue,
  valueToPercent,
} from '../../../../_helpers/api'
import DepositCircle from '../../../Layout/svgs/DepositCircle'
import TokenCircle from '../../../Layout/svgs/TokenCircle'
import DepositInfo from './DepositInfo'
import carImage from 'assets/car.png'
import robotImage from 'assets/robot.png'

interface IProps {
  isMobile: boolean
}
type DepositSectionProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const tokenNames = ['STC', 'STR']

export const DepositSection: React.FC<DepositSectionProps> = ({
  isMobile,
  BUSD,
  error,
  remainingCarStock,
  remainingRobotStock,
  removeError,
}) => {
  const [token, setToken] = useState('STC')
  const [value, setValue] = useState<string>()

  useEffect(() => {
    return () => {
      setValue(undefined)
    }
  }, [token])

  const actualValue = useMemo(
    () => (value ? Number(value).toFixed() : undefined),
    [value]
  )

  const minimumAmount = (t: string) => (t === 'STC' ? '$20' : '$10')

  const remainigToken = useMemo(
    () => (token === 'STC' ? remainingCarStock : remainingRobotStock),
    [remainingCarStock, remainingRobotStock, token]
  )

  const tokenPrice = useMemo(() => (token === 'STC' ? 20 : 10), [token])

  const maxTokenCanBuy = useMemo(() => BUSD / tokenPrice, [BUSD, tokenPrice])

  const maxTokenCanGet = useMemo(
    () =>
      Math.floor(
        maxTokenCanBuy > remainigToken ? remainigToken : maxTokenCanBuy
      ),
    [maxTokenCanBuy, remainigToken]
  )

  const moreThanRemain = useMemo(
    () => Number(actualValue) > remainigToken,
    [remainigToken, actualValue]
  )

  const percentHandler = useCallback(
    (per: number) => {
      if (error) removeError()
      setValue(percentToValue(maxTokenCanGet, per))
    },
    [error, maxTokenCanGet, removeError]
  )

  const inputHandler = (val: string) => {
    if (error) removeError()
    val = convertNumbers2English(val)
    if (val.length <= 20 && /^\d*\.?\d*$/.test(val))
      setValue(val === '00' ? Number(val).toString() : val === '.' ? '0.' : val)
  }

  const maxButtonHandler = () => {
    percentHandler(100)
  }

  return (
    <Row direction="row" style={{ height: '100%' }}>
      <Col md={3}>
        <Row
          direction={isMobile ? 'row' : 'column'}
          justify="around"
          align="center"
          style={{ height: '100%' }}
        >
          {tokenNames.map((t) => (
            <TokenCircle
              key={t}
              width={100}
              onClick={() => setToken(t)}
              token={t === 'STR' ? 'ROBOT' : 'CAR'}
              active={token === t}
              infoSize="10"
              fontProps={{
                fontSize: '20',
                style: {
                  textShadow: '0px 0px 3px black',
                },
              }}
              image={t === 'STC' ? carImage : robotImage}
              info={minimumAmount(t)}
            />
          ))}
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <DepositCircle
            width={isMobile ? 210 : 190}
            token={token === 'STC' ? 'CAR' : 'ROBOT'}
            value={actualValue}
            maxButtonHandler={maxButtonHandler}
            placeholder={maxTokenCanGet.toString()}
            percent={valueToPercent(Number(actualValue), maxTokenCanGet)}
            inputHandler={inputHandler}
            percentHandler={percentHandler}
          />
        </Row>
      </Col>
      <Col md={5}>
        <DepositInfo
          tokenPrice={tokenPrice}
          moreThanRemain={moreThanRemain}
          token={token}
          value={Number(actualValue ?? 0)}
        />
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { address, loggedIn } = state.account
  const {
    error,
    data: { BUSD, remainingCarStock, remainingRobotStock },
  } = state.stock
  const { prices } = state.bank
  return {
    address,
    loggedIn,
    remainingCarStock,
    remainingRobotStock,
    prices,
    BUSD,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  removeError: bindActionCreators(removeError, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositSection)
