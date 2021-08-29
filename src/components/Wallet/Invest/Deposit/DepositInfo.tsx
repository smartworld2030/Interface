import { Row, Col } from 'react-grid-system'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import { useBankDollars } from 'state/bank/hooks'
import { useInvestMax, useUserInvestInfo } from 'state/invest/hooks'
import { useUserInvest } from 'hooks/useInvest'
import { useDispatch } from 'react-redux'
import { investmentDeposit } from '_actions/invest.actions'

interface DepositInfoProps {
  token: string
  value: number
  prices: { [key: string]: string }
}

const DepositInfo: React.FC<DepositInfoProps> = ({ token, prices, value }) => {
  const dollar = useBankDollars()
  const maxPercent = useInvestMax()
  const account = useUserInvestInfo()
  const dispatch = useDispatch()

  const depositHandler = () => {
    // if (!loading && !confirmed) {
    console.log(token, value)
    dispatch(investmentDeposit(token, value))
    // }
  }

  const calcSatoshi = () => +prices[token.toLowerCase()] * value

  const calcDollar = () => value * +dollar[token.toLowerCase()]

  const calcSTT = () => calcSatoshi() / 2.5 / +prices.stt

  const calcPercent = () => {
    const multiple = token === 'STTS' ? 1.25 : 1
    const cal = (calcSatoshi() * multiple * maxPercent) / 5000000

    return Number(cal + account.refPercent) <= maxPercent ? cal : maxPercent - +account.refPercent
  }

  const disableHandler = () => value <= 0 || calcSatoshi() < 500000

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
          <TokenValue title="Number of tokens" precision={token === 'STTS' ? 0 : 4} token={token} value={value} />
          <TokenValue title="Price(Satoshi)" token="SATS" precision={0} value={calcSatoshi()} />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue title="Price(Smart Bits)" token="STB" precision={1} value={calcSatoshi() / 100} />
          <TokenValue title="Price(Dollar)" precision={2} token="$" value={calcDollar()} />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around" direction="column">
          {/* <p style={{ color: Colors.green }}>Confirmed!</p>
          <p style={{ color: Colors.green }}>Waiting...</p>
          <p style={{ color: Colors.red }}>{error}</p>} */}
          <DepositButton onClick={depositHandler} done={false} loading={false} disable={disableHandler()} />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue value={calcSTT()} precision={0} title="Invetment reward" />
          <TokenValue
            value={+account.refPercent / 250}
            precision={3}
            token="%"
            title="Referral percent"
            double={calcPercent() / 250 < 0.001 ? 0 : calcPercent() / 250}
            doubled
          />
        </Row>
      </Col>
    </Row>
  )
}

export default DepositInfo
