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
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'
import { UnfreezeButton } from '../../../Layout/svgs/UnfreezeButton'
import { poolUnfreeze } from '../../../../_actions/pool.actions'

interface ReferralSectionProps {
  isMobile: boolean
}

type IProps = ReferralSectionProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<IProps> = ({
  address,
  account,
  tokens,
  prices,
  dollar,
  loading,
  isMobile,
  confirmed,
  poolUnfreeze,
}) => {
  const [done, setDone] = useState(false)
  const { pathname } = useLocation()
  const link = `https://ewktx-7qaaa-aaaad-qakkq-cai.ic.fleek.co${pathname}?ref=${address}`

  const copyHandler = () => {
    if (!done) {
      copy(link)
      successHandler('Reffral Link Copied!')
      setDone(true)
    }
  }
  const calcSatoshi = () =>
    ((account.referral + account.daily) / 10 ** 8) * prices.STT

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const remainigDays = () =>
    account.expired
      ? 0
      : account.expires
      ? Math.floor((account.expires - Date.now() / 1000) / 86400)
      : 37

  const calcDaily = () =>
    account.nextReward > 0 ? (account.nextReward / 10 ** 8).toFixed(8) : 0

  const formatedDaily = () =>
    calcDaily() > 1
      ? !account.expired
        ? (account.nextReward / 10 ** 8).toFixed(2)
        : 0
      : calcDaily()

  const unfreezeHandler = () => {
    if (!loading && !confirmed) {
      poolUnfreeze()
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
                title="Remaining Days"
                precision={0}
                token="Day"
                value={remainigDays()}
              />
              <TokenValue value={formatedDaily()} title="Next reward" />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                title="Rewards(Satoshi)"
                precision={0}
                token="SATS"
                value={calcSatoshi() > 1 ? calcSatoshi() : 0}
              />
              <TokenValue
                value={calcDollar() > 0.01 ? calcDollar() : 0}
                precision={2}
                title="Rewards(Dollar)"
                token="$"
              />
            </Row>
          </Col>
          <Col xs={12} width="75%">
            <Row
              align="center"
              justify={account.expired ? 'between' : 'around'}
              direction={isMobile ? 'column' : 'row'}
              style={account.expired && isMobile ? { height: 200 } : {}}
            >
              <ReferralButton
                width={90}
                onClick={copyHandler}
                disable={account.liquidity === 0}
              />
              {account.expired && (
                <UnfreezeButton
                  width={65}
                  onClick={unfreezeHandler}
                  done={confirmed}
                  loading={loading}
                />
              )}
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                token="STTS"
                precision={0}
                value={account.totalStts}
                title="Total pool"
              />
              <TokenValue
                value={tokens.STT}
                token="STT"
                precision={0}
                title="Total rewards"
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
  const { account, confirmed, poolLoading: loading } = state.pool
  const { prices, dollar } = state.bank
  return {
    account,
    address,
    tokens,
    prices,
    error,
    dollar,
    loading,
    confirmed,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  poolUnfreeze: bindActionCreators(poolUnfreeze, dispatch),
  investInformation: bindActionCreators(investInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)
