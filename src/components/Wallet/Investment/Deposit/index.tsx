import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { accountTokenBalances } from '../../../../_actions/account.actions'
import { tokenPrice } from '../../../../_actions/bank.actions'
import DepositCircle from '../../../Layout/svgs/DepositCircle'
import TokenCircle from '../../../Layout/svgs/TokenCircle'
import DepositInfo from './DepositInfo'

interface IProps {
  isMobile: boolean
}
type DepositSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DepositSection: React.FC<DepositSectionProps> = ({
  isMobile,
  accountTokenBalances,
  tokenPrice,
}) => {
  const [token, setToken] = useState<string>('STTS')
  const [value, setValue] = useState(100)

  useEffect(() => {
    // accountTokenBalances(['STT', 'STTS', 'BTCB'])
    tokenPrice(['btc', 'bnb', 'stts'])
    // @ts-ignore
    // requestInvest('BTCB')
  }, [])

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
            token={'STTS'}
            active={token === 'STTS'}
          />
          <TokenCircle
            width={70}
            onClick={setToken}
            token={'BNB'}
            active={token === 'BNB'}
          />
          <TokenCircle
            width={70}
            onClick={setToken}
            token={'BTC'}
            active={token === 'BTC'}
          />
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <DepositCircle
            width={210}
            token={token}
            value={value}
            setValue={setValue}
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
  const { tokens, error } = state.account
  return {
    tokens,
    error,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  accountTokenBalances: bindActionCreators(accountTokenBalances, dispatch),
  tokenPrice: bindActionCreators(tokenPrice, dispatch),
  // requestInvest: bindActionCreators(requestInvest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositSection)
