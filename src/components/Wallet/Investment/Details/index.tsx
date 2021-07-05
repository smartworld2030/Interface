import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { accountTokenBalances } from '../../../../_actions/account.actions'
import { tokenPrice } from '../../../../_actions/bank.actions'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({}) => {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const copyHandler = () => {
    if (!loading && !done) {
      setLoading(true)
      setDone(false)
      setTimeout(() => {
        setLoading(false)
        setDone(true)
        setTimeout(() => {
          setDone(false)
        }, 2000)
      }, 1000)
    }
  }

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
            title="Referral percent:"
            precision={2}
            token={'%'}
            value={1}
          />
          <TokenValue value={100} precision={2} title="Hourly reward:" />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Referral percent:"
            precision={2}
            token={'%'}
            value={1}
          />
          <TokenValue value={100} precision={2} title="Hourly reward:" />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <ReferralButton
            width={90}
            loading={loading}
            onClick={copyHandler}
            done={done}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue value={100} token={'SATS'} title="Total investment:" />
          <TokenValue value={100} token={'STT'} title="Total rewards:" />
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)
