import React, { useState } from 'react'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'

interface ReferralSectionProps {}

export const DetailSection: React.FC<ReferralSectionProps> = ({}) => {
  let address, account, tokens, prices, dollar
  const [done, setDone] = useState(false)
  const { pathname } = useLocation()
  const link = `${window.location.origin}${pathname}?ref=${address}`

  const copyHandler = () => {
    if (!done) {
      copy(link)
      successHandler('Reffral Link Copied!')
      setDone(true)
    }
  }
  const calcSatoshi = () => ((account.referral + account.hourly) / 10 ** 8) * prices.STT

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC
  const calcHourly = () => account.depositDetails.reduce((items, item) => items + Number(item.reward), 0) / 10 ** 8

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
              <TokenValue title="Referral percent" precision={2} token="%" value={account.percent / 250} />
              <TokenValue value={calcHourly()} precision={2} title="Hourly reward" />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue title="Rewards(Satoshi)" precision={0} token="SATS" value={calcSatoshi()} />
              <TokenValue value={calcDollar()} precision={2} title="Rewards(Dollar)" token="$" />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <ReferralButton width={90} onClick={copyHandler} disable={account.satoshi === 0} />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue token="SATS" precision={0} value={account.satoshi} title="Total investment" />
              <TokenValue value={tokens.STT} token="STT" precision={0} title="Total rewards" />
            </Row>
          </Col>
        </>
      )}
    </Row>
  )
}

export default DetailSection
