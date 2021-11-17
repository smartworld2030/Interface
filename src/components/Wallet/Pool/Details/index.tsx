import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import { investInformation } from '../../../../_actions/invest.actions'
import { TokenValue } from '../../../Layout/typography/Tokens'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'
import { UnfreezeButton } from '../../../Layout/svgs/UnfreezeButton'
import { poolUnfreeze, poolUnfreezeLP } from '../../../../_actions/pool.actions'
import { truncate } from '../../../../_helpers/api'
import { EmptyCircleInput } from '../../../Layout/svgs/EmptyCircleInput'

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
  poolUnfreezeLP,
}) => {
  const [clicked, setClicked] = useState(false)

  const clickHandler = () => {
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 5000)
  }

  const [percent, setPercent] = useState(100)
  const [selected, setSeleted] = useState(-1)
  const [done, setDone] = useState(false)
  const { pathname } = useLocation()
  const link = `${window.location.origin}${pathname}?percent=${percent}&ref=${address}`

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

  const unfreezeLPHandler = () => {
    if (!loading && !confirmed) {
      poolUnfreezeLP()
      setClicked(false)
    }
  }

  const unfreezeHandler = () => {
    if (!loading && !confirmed) {
      poolUnfreeze()
      setClicked(false)
    }
  }
  const roundSlideTune = (event) => {
    const x = event.pageX || event.touches[0]?.clientX
    const y = event.pageY || event.touches[0]?.clientY
    let elPos = event.target.getBoundingClientRect()
    let dX = 0,
      dY = 0,
      cX = elPos.width / 2,
      cY = elPos.height / 2,
      eX = x - elPos.left,
      eY = y - elPos.top

    if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
      dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2
      dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2
    } else {
      dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2
      dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2
    }
    if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
      dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2
      dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2
    } else {
      dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2
      dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2
    }

    dX = Math.round((dX / 150) * 100)
    dY = Math.round((dY / 150) * 100)

    if (0 <= dX && dX < 50 && dY === 0) {
      setPercent(100 - Math.round(((50 - dX) / 50) * 12.5))
    } else if (dX === 0 && 0 <= dY && dY <= 100) {
      setPercent(100 - Math.round(12.5 + (dY / 100) * 25))
    } else if (0 <= dX && dX <= 100 && dY === 100) {
      setPercent(100 - Math.round(37.5 + (dX / 100) * 25))
    } else if (dX === 100 && 0 <= dY && dY <= 100) {
      setPercent(100 - Math.round(62.5 + ((100 - dY) / 100) * 25))
    } else if (50 <= dX && dX <= 100 && dY === 0) {
      setPercent(100 - Math.round(87.5 + ((100 - dX) / 50) * 12.5))
    }
  }

  const circleSlider = (event) => {
    if (event.buttons === 1 || event.buttons === 3) {
      roundSlideTune(event)
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
                value={calcDollar() > 0.01 ? calcDollar() : 0}
                precision={2}
                title="Rewards(Dollar)"
                token="$"
              />
              <TokenValue
                value={
                  account.depositDetails.reduce(
                    (items, item) => items + Number(item.reward),
                    0
                  ) /
                  10 ** 8
                }
                token="STTS"
                precision={3}
                title="Daily reward"
              />
            </Row>
          </Col>
          <Col xs={12} width="75%">
            <Row
              align="center"
              justify={account.liquidity ? 'between' : 'around'}
              style={
                account.liquidity ? { flexFlow: 'column', height: 160 } : {}
              }
            >
              <EmptyCircleInput
                width={90}
                onClick={copyHandler}
                onTouchEnd={roundSlideTune}
                onTouchMove={roundSlideTune}
                onMouseMove={circleSlider}
                disable={account.liquidity === 0}
                percent={percent}
              />
              {!!account.liquidity && clicked && (
                <Row
                  align="center"
                  justify={account.liquidity ? 'between' : 'around'}
                  direction="row"
                  style={{ width: 100 }}
                >
                  <UnfreezeButton
                    width={40}
                    onClick={unfreezeLPHandler}
                    done={confirmed}
                    loading={loading}
                    text="LP"
                  />
                  <UnfreezeButton
                    width={40}
                    onClick={unfreezeHandler}
                    done={confirmed}
                    loading={loading}
                    text="STTS"
                    secondText="BNB"
                  />
                </Row>
              )}
              {!!account.liquidity && !clicked && (
                <UnfreezeButton
                  onClick={clickHandler}
                  width={60}
                  text="Unfreeze"
                  done={confirmed}
                  loading={loading}
                />
              )}
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              {account.depositDetails.length ? (
                <Row direction="column">
                  <p className="ant-statistic-title">Deposit details</p>
                  <Row align="center" justify="around">
                    {account.depositDetails.map((item, i) => {
                      const startTime = new Date(item.startTime * 1000)
                      return selected === i ? (
                        <p
                          className="deposit-items"
                          onClick={() => setSeleted(-1)}
                          key={i}
                        >
                          <LeftRetangle />
                          Amount:{' '}
                          {truncate(
                            ((item.reward * 10000) / 5 / 10 ** 8).toString(),
                            2
                          )}{' '}
                          STTS
                          <LeftRetangle />
                          Daily:{' '}
                          {truncate((item.reward / 10 ** 8).toString(), 4)} STTS
                          <br />
                          <LeftRetangle />
                          Start: {startTime.toDateString()}
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
  poolUnfreezeLP: bindActionCreators(poolUnfreezeLP, dispatch),
  investInformation: bindActionCreators(investInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)

const LeftRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5" fill={Colors.green} />
  </svg>
)
