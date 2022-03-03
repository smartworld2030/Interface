import React, { useMemo, useState } from 'react'
import { Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import Colors from '../../../../Theme/Colors'
import { formaterNumber } from '../../../../_helpers/api'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { withdrawInterest } from '../../../../_actions/invest02.actions'
import Popover from 'antd/lib/popover'
import { ExclamationTriangle } from 'components/Layout/svgs/ExclamationTriangle'
import Text from 'antd/lib/typography/Text'
import { FlexDiv } from 'components/Layout/divs/Divs'
import list from '_helpers/unblock.json'
import Button from 'antd/lib/button/button'
import { transferSTTS } from '_actions/smartworld.action'
import { copyAddress, shorter } from '_helpers/constants'
import { CopyOutlined } from '@ant-design/icons'
interface IProps {
  width: number
  isMobile: boolean
}
type WithdrawCircleProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const WithdrawSection: React.FC<WithdrawCircleProps> = ({
  width,
  address,
  chainId,
  latestWithdraw,
  referral,
  hourly,
  isMobile,
  isBlocked,
  withdrawInterest,
}) => {
  const unblockPrice = useMemo(
    () => (isBlocked ? list[chainId][address] : 0),
    [isBlocked, address, chainId]
  )
  const unblockAddress = process.env.REACT_APP_UNBLOCK_ADDRESS

  const half = width / 2
  const r = half - 10
  const c = 2 * Math.PI * r
  const period = 3600
  const secPast =
    latestWithdraw !== 0 ? (Date.now() / 1000 - latestWithdraw) % period : 0

  const secRemain = period - secPast
  const pastRadius = c * (secPast / period)

  const [visible, setVisible] = useState(false)

  return (
    <Row direction="row" style={{ height: '100%' }}>
      <Col md={1}>
        <Row
          direction={isMobile ? 'row' : 'column'}
          justify="around"
          align="center"
          style={{ height: '100%' }}
        >
          {isBlocked && unblockPrice ? (
            <Popover
              content={
                <FlexDiv
                  style={{ maxWidth: isMobile ? '100%' : 250, minHeight: 150 }}
                >
                  <Text
                    onClick={() =>
                      copyAddress(unblockAddress, 'Address Copied!')
                    }
                  >
                    Your account blocked and eligible to be unblock with
                    penalty!
                    <br />
                    send {unblockPrice} STTS to {shorter(unblockAddress)}
                    <CopyOutlined color={Colors.green} />, then wait for
                    unblock!
                  </Text>
                  <Text style={{ color: Colors.green }}>
                    Make sure you have ({unblockPrice} STTS) then click on
                    button blow to pay penalty, then wait for unblock(it may
                    take up to 24 hours).
                  </Text>
                  <Button
                    type="primary"
                    onClick={() => transferSTTS(unblockAddress, unblockPrice)}
                  >
                    UnBlock
                  </Button>
                </FlexDiv>
              }
              title="You are blocked!"
              trigger="click"
              visible={visible}
              onVisibleChange={setVisible}
            >
              <ExclamationTriangle
                color="red"
                size={isMobile ? '30px' : '25px'}
                onClick={() => setVisible((prev) => !prev)}
              />
            </Popover>
          ) : (
            <Popover
              content={
                <FlexDiv style={{ maxWidth: 250 }}>
                  <Text>
                    If smart world distinguishes a address which tries to hack
                    the system by the STTS liquidity pool swing, it blocks for
                    ever
                  </Text>
                </FlexDiv>
              }
              title="Warning"
              trigger="click"
              visible={visible}
              onVisibleChange={setVisible}
            >
              <ExclamationTriangle
                size={isMobile ? '30px' : '25px'}
                onClick={() => setVisible((prev) => !prev)}
              />
            </Popover>
          )}
        </Row>
      </Col>
      <Col md={10}>
        <Row
          direction={isMobile ? 'row' : 'column'}
          justify="around"
          align="center"
          style={{ height: '100%' }}
        >
          <svg height={width} width={width}>
            <defs>
              <clipPath id="cut-off-middle">
                <rect x={0} y={half * 0.55} width={width} height={half * 0.9} />
              </clipPath>
            </defs>
            <circle cx={half} cy={half} r={r} fill={Colors.background} />
            {/* <circle cx={half} cy={half} r={r - 14} fill="white" /> */}
            {/* <circle
          cx={half}
          cy={half}
          r={r}
          fill={Colors.background}
          clipPath="url(#cut-off-middle)"
        /> */}
            <circle
              cx={half}
              cy={half}
              r={r}
              strokeLinecap="round"
              stroke={Colors.green}
              strokeWidth={6}
              fill="none"
              strokeDashoffset={c * 0.25}
              strokeDasharray={`${pastRadius} ${c - pastRadius}`}
            >
              {latestWithdraw !== 0 && (
                <>
                  <animate
                    id="remains"
                    attributeName="stroke-dasharray"
                    values={`${pastRadius} ${c - pastRadius};${c} 0`}
                    dur={secRemain}
                  />
                  <animate
                    id="hourly"
                    begin="remains.end"
                    attributeName="stroke-dasharray"
                    values={`0 ${c};${c} 0`}
                    dur={period}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              x={half}
              y={width * 0.17}
              fontSize="11"
              fill="white"
            >
              REWARD
            </text>
            <text
              textAnchor="middle"
              x={half}
              y={width * 0.26}
              fontSize="14"
              fill="white"
            >
              <tspan>{formaterNumber(hourly, 'STT').toFixed(3)}</tspan>
              <tspan fill={Colors.green}> $</tspan>
            </text>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              x={half}
              y={width * 0.77}
              fontSize="14"
              fill="white"
            >
              <tspan>{formaterNumber(referral, 'STT').toFixed(3)}</tspan>
              <tspan fill={Colors.green}> $</tspan>
            </text>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              x={half}
              y={width * 0.85}
              fontSize="11"
              fill="white"
            >
              REFERRAL
            </text>
            <g
              onClick={
                referral + hourly > 0 ? () => withdrawInterest() : undefined
              }
            >
              <rect
                x={30}
                y={r * 0.87}
                rx="2"
                ry="2"
                width={r * 1.65}
                height={r * 0.445}
                strokeWidth="1"
                radius="5"
                fill="none"
                stroke="#434343"
              />
              <text
                textAnchor="middle"
                fill={Colors.green}
                x={half}
                y={half + 6}
                fontSize={width / 12}
              >
                WITHDRAW
              </text>
              <rect
                className="withdraw-button"
                x={30}
                y={r * 0.87}
                rx="2"
                ry="2"
                width={r * 1.65}
                height={r * 0.445}
                strokeWidth="1"
                radius="5"
                fill="none"
                stroke="#434343"
              />
            </g>
          </svg>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { chainId } = state.wallet
  const { error, tokens, address } = state.account
  const { hourly, referral, isBlocked, latestWithdraw } = state.invest02.account
  return {
    error,
    chainId,
    tokens,
    hourly,
    address,
    referral,
    isBlocked,
    latestWithdraw,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  withdrawInterest: bindActionCreators(withdrawInterest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawSection)
