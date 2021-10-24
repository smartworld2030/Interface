import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import { invest02Information } from '../../../../_actions/invest02.actions'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'
import { truncate } from '../../../../_helpers/api'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({
  address,
  account,
}) => {
  const [selected, setSeleted] = useState(-1)
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
  const calcDollar = () => (account.referral + account.hourly) / 10 ** 8

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
                title="Referral percent"
                precision={3}
                token="%"
                value={account.refPercent / 1000}
              />
              <TokenValue
                value={
                  account.depositDetails.reduce(
                    (items, item) => items + Number(item.reward),
                    0
                  ) /
                  10 ** 8
                }
                token="$"
                precision={3}
                title="Hourly reward"
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                value={calcDollar()}
                precision={3}
                title="Rewards(Dollar)"
                token="$"
              />
              <TokenValue
                token="$"
                precision={0}
                value={account.totalAmount}
                title="Total investment"
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <ReferralButton
                width={90}
                onClick={copyHandler}
                disable={account.totalAmount === 0}
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              {account.depositDetails.length ? (
                <Row direction="column">
                  <p className="ant-statistic-title">Deposit details</p>
                  <Row align="center" justify="around">
                    {account.depositDetails.map((item, i) => {
                      const endTime = new Date(item.endTime * 1000)
                      const startTime = new Date(item.startTime * 1000)
                      return selected === i ? (
                        <p
                          className="deposit-items"
                          onClick={() => setSeleted(-1)}
                          key={i}
                        >
                          <LeftRetangle />
                          Amount:{' '}
                          {truncate((item.amount / 10 ** 8).toString(), 2)} $
                          <LeftRetangle />
                          Hourly:{' '}
                          {truncate((item.reward / 10 ** 8).toString(), 4)} $
                          <br />
                          <LeftRetangle />
                          Start: {startTime.toDateString()}
                          <LeftRetangle />
                          End: {endTime.toDateString()}
                        </p>
                      ) : (
                        selected === -1 && (
                          <p
                            className="deposit-items"
                            onClick={() => setSeleted(i)}
                            key={i}
                          >
                            <LeftRetangle />
                            {i + 1}
                          </p>
                        )
                      )
                    })}
                  </Row>
                </Row>
              ) : (
                <></>
              )}
            </Row>
          </Col>
        </>
      )}
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address, tokens } = state.account
  const { account } = state.invest02
  return {
    account,
    address,
    tokens,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  invest02Information: bindActionCreators(invest02Information, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)

const LeftRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5" fill={Colors.green} />
  </svg>
)
