import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeError } from '../../../../_actions/invest.actions'
import {
  convertNumbers2English,
  percentToValue,
  valueToPercent,
} from '../../../../_helpers/api'
import { AppActions, AppState } from '../../../../_types'
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
  removeError,
}) => {
  const [token, setToken] = useState('BNB')
  const [value, setValue] = useState<string>()

  useEffect(() => {
    return () => {
      setValue(undefined)
    }
  }, [token])

  const percentHandler = useCallback(
    (per: number) => {
      if (error) removeError()
      setValue(percentToValue(tokens[token], per))
    },
    [error, removeError, token, tokens]
  )

  const inputHandler = useCallback(
    (val: string) => {
      if (error) removeError()
      val = convertNumbers2English(val)
      if (val.length <= 20 && /^\d*\.?\d*$/.test(val))
        setValue(
          val === '00' ? Number(val).toString() : val === '.' ? '0.' : val
        )
    },
    [error, removeError]
  )

  const maxButtonHandler = () => {
    percentHandler(100)
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
          <TokenCircle
            width={70}
            onClick={setToken}
            token={'BNB'}
            active={token === 'BNB'}
            disabled={token !== 'BNB'}
            info={''}
          />
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <DepositCircle
            maxButtonHandler={maxButtonHandler}
            width={isMobile ? 210 : 190}
            token={token}
            value={value}
            placeholder={tokens[token].toString()}
            percent={valueToPercent(Number(value), tokens[token])}
            inputHandler={inputHandler}
            percentHandler={percentHandler}
          />
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={token} value={Number(value ?? 0)} />
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { tokens, address, loggedIn } = state.account
  const { error } = state.invest02
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
