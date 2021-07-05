import React from 'react'
import { Row } from 'react-grid-system'
import Colors from '../../../../Theme/Colors'

interface WithdrawCircleProps {
  width: number
  hourly: number | string
  lastWithdraw: number
  referral: number | string
  setOpen: () => void
}

const WithdrawSection: React.FC<WithdrawCircleProps> = ({
  width,
  setOpen,
  lastWithdraw,
  referral,
  hourly,
}) => {
  const half = width / 2
  const r = half - 10
  const c = 2 * Math.PI * r
  const period = 3600
  const secPast = (Date.now() / 1000 - lastWithdraw) % period
  const secRemain = period - secPast
  const pastRadius = c * (secPast / period)
  console.log({ secPast, secRemain, pastRadius })
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
        <circle cx={half} cy={half} r={r - 14} fill="white" />
        <circle
          cx={half}
          cy={half}
          r={r}
          fill={Colors.background}
          clipPath="url(#cut-off-middle)"
        />
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
        </circle>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x={half}
          y={width * 0.16}
          fontSize="8"
        >
          HOURLY
        </text>
        <text
          textAnchor="middle"
          x={half}
          y={width * 0.25}
          fontSize={width / 18}
        >
          <tspan>{hourly}</tspan>
          <tspan fill={Colors.green}> STT</tspan>
        </text>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x={half}
          y={width * 0.78}
          fontSize={width / 18}
        >
          <tspan>{referral}</tspan>
          <tspan fill={Colors.green}> STT</tspan>
        </text>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          x={half}
          y={width * 0.85}
          fontSize="8"
        >
          REFERRAL
        </text>
        <g onClick={setOpen}>
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

export default WithdrawSection
