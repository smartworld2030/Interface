import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeError } from '../../../../_actions/invest.actions'
import { AppActions, AppState } from '../../../../_types'
import { percentToValue, valueToPercent } from '../../../../_helpers/api'
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
  const [value, setValue] = useState(0)

  useEffect(() => {
    const b = Number(tokens[token])
    setBalance(b > 0 ? b : 0)
    setValue(b > 0 ? b : 0)
  }, [address, tokens, token])

  const percentHandler = (per: number) => {
    if (error) removeError()
    setValue(percentToValue(balance, per))
  }

  const inputHandler = (e) => {
    if (error) removeError()
    const val = e.currentTarget?.valueAsNumber
    if (val) {
      setValue(val < 0 ? 0 : val)
    } else setValue(0)
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
            width={210}
            token={token}
            value={value}
            percent={valueToPercent(value, balance)}
            inputHandler={inputHandler}
            percentHandler={percentHandler}
          />
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={token} value={value} />
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
