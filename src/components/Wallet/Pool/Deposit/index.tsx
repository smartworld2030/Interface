import React, { useState, useEffect } from 'react'
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

interface IProps {
  isMobile: boolean
}
type DepositSectionProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const tokenNames = ['STTS', 'BNB', 'BTCB']

export const DepositSection: React.FC<DepositSectionProps> = ({
  isMobile,
  tokens,
  error,
  address,
  removeError,
}) => {
  const [token, setToken] = useState<string>('STTS')
  const [balance, setBalance] = useState(0)
  const [value, setValue] = useState('0')

  useEffect(() => {
    setBalance(tokens[token])
    setValue(tokens[token])
  }, [address, tokens, token])

  const percentHandler = (per: number) => {
    if (error) removeError()
    setValue(percentToValue(balance, per).toString())
  }

  const inputHandler = (val: string) => {
    if (error) removeError()
    val = convertNumbers2English(val)
    if (val.length <= 20 && /^\d*\.?\d*$/.test(val)) {
      const v = val.includes('.') ? val : Number(val)
      setValue(v.toString())
    }
  }

  return (
    <Row direction="row" style={{ height: '100%' }}>
      <Col md={2}>
        <Row
          direction={isMobile ? 'row' : 'column'}
          justify="around"
          align="center"
          style={{ height: '100%' }}
        >
          {tokenNames.map((t) => (
            <TokenCircle
              key={t}
              width={70}
              onClick={setToken}
              token={t}
              active={token === t}
            />
          ))}
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <DepositCircle
            width={isMobile ? 210 : 190}
            token={token}
            value={value}
            percent={valueToPercent(Number(value), balance)}
            inputHandler={inputHandler}
            percentHandler={percentHandler}
          />
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={token} value={Number(value)} />
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { tokens, address, loggedIn } = state.account
  const { error } = state.invest
  return {
    address,
    loggedIn,
    tokens,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  removeError: bindActionCreators(removeError, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositSection)
