import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { Col, Row } from 'react-grid-system'
import QRCode from 'react-qr-code'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Colors from '../../../../Theme/Colors'
import { migrateByUser } from '../../../../_actions/invest02.actions'
import { successHandler } from '../../../../_helpers/alert'
import { truncate } from '../../../../_helpers/api'
import { AppActions, AppState } from '../../../../_types'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({
  address,
  referral,
  hourly,
  refPercent,
  depositDetails,
  totalAmount,
  migrateByUser,
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

  const calcDollar = () => (referral + hourly) / 10 ** 8

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
                value={refPercent / 1000}
              />
              <TokenValue
                value={
                  depositDetails
                    ? depositDetails.reduce(
                        (all, item) => all + Number(item.reward),
                        0
                      ) /
                      10 ** 8
                    : 0
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
                value={totalAmount}
                title="Total investment"
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <ReferralButton
                width={90}
                onClick={copyHandler}
                disable={totalAmount === 0}
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              {depositDetails?.length ? (
                <Row direction="column">
                  <p className="ant-statistic-title">Deposit details</p>
                  <Row align="center" justify="around">
                    {depositDetails?.map((item, i) => {
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
  const {
    account: {
      referral,
      hourly,
      refPercent,
      depositDetails,
      totalAmount,
      isBlocked,
    },
  } = state.invest02
  const zero = isBlocked
    ? {
        hourly: 0,
        totalAmount: 0,
        referral: 0,
        latestWithdraw: 0,
        refPercent: 0,
        depositDetails: undefined,
      }
    : {}

  return {
    referral,
    hourly,
    refPercent,
    depositDetails,
    totalAmount,
    address,
    tokens,
    ...zero,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  migrateByUser: bindActionCreators(migrateByUser, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailSection as any)

const LeftRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5" fill={Colors.green} />
  </svg>
)
