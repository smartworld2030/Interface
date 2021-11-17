import React, { useState } from 'react'
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
import PoolDepositCircle from '../../../Layout/svgs/PoolDepositCircle'
import PairTokens from '../../../Layout/svgs/PairTokens'
import DepositInfo from './DepositInfo'
import TokenSelectCircle from '../../../Layout/svgs/TokenSelectCircle'

interface IProps {
  isMobile: boolean
}

type DepositSectionProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const tokenNames = ['STTS-BNB', 'LPTOKEN']
const initialValues = {
  bnb: '',
  stts: '',
  lptoken: '',
}
export const DepositSection: React.FC<DepositSectionProps> = ({
  currentPrice,
  isMobile,
  lpAmounts,
  tokens,
}) => {
  const [pairs, setPairs] = useState<string>(tokenNames[0])
  const [changeToken, setChangeToken] = useState(false)
  const [values, setValues] = useState(initialValues)

  const clickHandler = (pairs: string) => {
    setChangeToken(false)
    setPairs(pairs)
    setValues(initialValues)
  }

  const pairSpliter = () =>
    pairs.split('-').map((token) => ({
      token: token.toLocaleLowerCase(),
      symbol: token,
      percent: valueToPercent(values[token.toLocaleLowerCase()], tokens[token]),
    }))

  const placeholder = {
    lptoken: tokens.LPTOKEN.toString(),
    stts: tokens.STTS.toString(),
    bnb: tokens.BNB.toString(),
  }

  const percentHandler = {
    stts: (per: number) => {
      const stts = percentToValue(tokens.STTS, per)
      setValues((prev) => ({
        ...prev,
        stts,
        bnb: (Number(stts) / currentPrice).toString(),
      }))
    },

    bnb: (per: number) => {
      const bnb = percentToValue(tokens.BNB, per)
      setValues((prev) => ({
        ...prev,
        bnb,
        stts: (Number(bnb) * currentPrice).toString(),
      }))
    },

    lptoken: (per: number) => {
      const lptoken = percentToValue(tokens.LPTOKEN, per)
      const bnb = (lpAmounts.bnb * Number(lptoken)).toString()
      const stts = (lpAmounts.stts * Number(lptoken)).toString()
      setValues((prev) => ({
        bnb,
        stts,
        lptoken,
      }))
    },
  }

  const inputHandler = {
    stts: (val: string) => {
      val = convertNumbers2English(val)
      if (val.length <= 20 && /^\d*\.?\d*$/.test(val)) {
        const stts =
          val === '00' ? Number(val).toString() : val === '.' ? '0.' : val

        const bnb = (Number(val) / currentPrice).toString()

        setValues((prev) => ({
          ...prev,
          stts,
          bnb,
        }))
      }
    },

    bnb: (val: string) => {
      val = convertNumbers2English(val)
      if (val.length <= 20 && /^\d*\.?\d*$/.test(val)) {
        const bnb =
          val === '00' ? Number(val).toString() : val === '.' ? '0.' : val

        const stts = (Number(val) * currentPrice).toString()

        setValues((prev) => ({
          ...prev,
          bnb,
          stts,
        }))
      }
    },
    lptoken: (val: string) => {
      val = convertNumbers2English(val)
      if (val.length <= 20 && /^\d*\.?\d*$/.test(val)) {
        const bnb = (lpAmounts.bnb * Number(val)).toString()
        const stts = (lpAmounts.stts * Number(val)).toString()
        setValues({
          stts,
          bnb,
          lptoken: val,
        })
      }
    },
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
          <TokenSelectCircle
            width={80}
            token={pairs}
            changeToken={changeToken}
            setChangeToken={setChangeToken}
            isMobile={isMobile}
          />
          {changeToken &&
            tokenNames.map((t) => (
              <PairTokens key={t} width={60} onClick={clickHandler} token={t} />
            ))}
        </Row>
      </Col>
      <Col md={4}>
        <Row
          justify="around"
          align="center"
          direction={isMobile ? 'row' : 'column'}
          style={{ height: '100%' }}
        >
          {pairSpliter().map(({ symbol, token, percent }, i, all) => {
            return (
              <PoolDepositCircle
                width={all.length === 1 ? 180 : 120}
                key={i}
                token={symbol}
                placeholder={placeholder[token]}
                value={values[token]}
                percent={percent < 100 ? percent : 100}
                inputHandler={inputHandler[token]}
                percentHandler={percentHandler[token]}
              />
            )
          })}
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={pairs} values={values} />
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { tokens, address, loggedIn } = state.account
  const { account, error, currentPrice, lpAmounts } = state.pool
  return {
    currentPrice,
    account,
    address,
    lpAmounts,
    loggedIn,
    tokens,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  removeError: bindActionCreators(removeError, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositSection)
