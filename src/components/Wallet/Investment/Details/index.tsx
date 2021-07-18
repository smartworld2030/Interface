import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import { investInformation } from '../../../../_actions/invest.actions'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { notification } from 'antd'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({
  address,
  account,
  tokens,
  prices,
  dollar,
}) => {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const link = `${window.location.origin}${pathname}?ref=${address}`

  const copyHandler = () => {
    if (!loading && !done) {
      copy(link)
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
      }, 500)
    }
  }
  const calcSatoshi = () =>
    ((account.referral + account.hourly) / 10 ** 8) * prices.STT

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

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
      {done ? (
        <QRCode
          size={150}
          value={link}
          bgColor={Colors.mainBackground}
          fgColor="white"
          onClick={() => setDone(false)}
          style={{ position: 'relative' }}
        />
      ) : (
        <>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                title="Referral percent:"
                precision={2}
                token="%"
                value={account.percent / 250}
              />
              {/* <TokenValue
            value={account.hourly}
            precision={2}
            title="Hourly reward:"
          /> */}
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                title="Rewards(Satoshi):"
                precision={0}
                token="SATS"
                value={calcSatoshi()}
              />
              <TokenValue
                value={calcDollar()}
                precision={2}
                title="Rewards(Dollar):"
                token="$"
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <ReferralButton
                width={90}
                loading={loading}
                onClick={copyHandler}
                done={done}
                disable={account.satoshi === 0}
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
        </>
      )}
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address, tokens, error } = state.account
  const { account } = state.invest
  const { prices, dollar } = state.bank
  return {
    account,
    address,
    tokens,
    prices,
    dollar,
    error,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investInformation: bindActionCreators(investInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)
