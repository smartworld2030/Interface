import { Row } from 'react-grid-system'
import { connect } from 'react-redux'
import Colors from '../../../../Theme/Colors'
import { formaterNumber, roundDecimals } from '../../../../_helpers/api'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { withdrawInterest } from '../../../../_actions/pool.actions'

interface IProps {
  width: number
}

type WithdrawCircleProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const WithdrawSection: React.FC<WithdrawCircleProps> = ({
  width,
  latestWithdraw,
  referral,
  daily,
  withdrawInterest,
}) => {
  const half = width / 2
  const r = half - 10
  const c = 2 * Math.PI * r
  const period = 86400
  const secPast =
    latestWithdraw !== 0 ? (Date.now() / 1000 - latestWithdraw) % period : 0

  const secRemain = period - secPast
  const pastRadius = c * (secPast / period)

  const calcDaily = () => (daily > 0 ? (daily / 10 ** 8).toFixed(8) : 0)

  const formatedDaily = () =>
    calcDaily() > 1 ? (daily / 10 ** 8).toFixed(2) : calcDaily()

  return (
    <Row
      direction="column"
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
                id="daily"
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
          <tspan>{formatedDaily()}</tspan>
          <tspan fill={Colors.green}> STT</tspan>
        </text>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x={half}
          y={width * 0.77}
          fontSize="14"
          fill="white"
        >
          <tspan>{roundDecimals(formaterNumber(referral, 'STT'), 2)}</tspan>
          <tspan fill={Colors.green}> STT</tspan>
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
          onClick={referral + daily > 0 ? () => withdrawInterest() : undefined}
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
  )
}

const mapStateToProps = (state: AppState) => {
  const { error, tokens } = state.account
  const { daily, referral, latestWithdraw } = state.pool.account
  return {
    error,
    tokens,
    daily,
    referral,
    latestWithdraw,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  withdrawInterest: bindActionCreators(withdrawInterest, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawSection)
