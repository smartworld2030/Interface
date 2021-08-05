import React, { useState } from 'react'
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { removeError } from '../../../../_actions/invest.actions'
import { AppActions, AppState } from '../../../../_types'
import { valueToPercent } from '../../../../_helpers/api'
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

export const tokenNames = ['STTS-BNB']

export const DepositSection: React.FC<DepositSectionProps> = ({
  currentPrice,
  isMobile,
  account,
  tokens,
}) => {
  const [pairs, setPairs] = useState<string>(tokenNames[0])
  const [changeToken, setChangeToken] = useState(false)

  const clickHandler = (pairs: string) => {
    setChangeToken(false)
    setPairs(pairs)
  }

  const pairSpliter = () =>
    pairs.split('-').map((token) => ({
      token: token.toLocaleLowerCase(),
      symbol: token,
      percent: valueToPercent(
        tokens[token],
        account.update[token.toLowerCase()]
      ),
    }))

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
          {pairSpliter().map(({ symbol, token, percent }) => (
            <PoolDepositCircle
              disable={account.update[token] === 0}
              width={120}
              key={token}
              token={symbol}
              placeholder={currentPrice[token].toString()}
              value={account.update[token]}
              percent={percent < 100 ? percent : 100}
              inputHandler={() => {}}
              percentHandler={() => {}}
            />
          ))}
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={pairs} values={account.update} />
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { tokens, address, loggedIn } = state.account
  const { account, error, currentPrice } = state.pool
  return {
    currentPrice,
    account,
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
