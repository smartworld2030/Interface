import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { investInformation } from '../../../../_actions/invest.actions'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { notification } from 'antd'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({
  address,
  pathname,
  account,
  tokens,
}) => {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const link = `${window.location.origin}${pathname}?ref=${address}`

  const copyHandler = () => {
    if (!loading && !done) {
      if (navigator.clipboard) navigator.clipboard.writeText(link)
      else {
        var textField = document.createElement('textarea')
        textField.innerText = link
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
      notification.success({
        message: 'Reffral Link Copied!',
        placement: 'bottomRight',
        duration: 2,
        closeIcon: <div></div>,
      })
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
            token="%"
            value={account.percent / 100}
          />
          {/* <TokenValue
            value={account.hourly}
            precision={2}
            title="Hourly reward:"
          /> */}
        </Row>
      </Col>
      <Col xs={12} width="100%">
        {/* <Row align="center" justify="around">
          {/* <TokenValue
            title="Total mined:"
            precision={2}
            token={'STT'}
            value={1685}
          />
          <TokenValue value={0} precision={2} title="" />
        </Row>  */}
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
          <TokenValue
            token="SATS"
            precision={0}
            value={account.satoshi}
            title="Total investment:"
          />
          <TokenValue
            value={tokens.STT}
            token="STT"
            precision={0}
            title="Total rewards:"
          />
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address, tokens, error } = state.account
  const { account } = state.invest
  const {
    location: { pathname },
  } = state.router
  return {
    pathname,
    account,
    address,
    tokens,
    error,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investInformation: bindActionCreators(investInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)
