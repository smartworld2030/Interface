import { Row, Col } from 'react-grid-system'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'
import Colors from '../../../../Theme/Colors'

interface DepositInfoProps {
  token: string
  value: number
}

const DepositInfo: React.FC<DepositInfoProps> = ({ token, value }) => {
  let prices, dollar, error, loading, account, confirmed, maxPercent, investmentDeposit
  const depositHandler = () => {
    if (!loading && !confirmed) {
      console.log(token, value)
      investmentDeposit(token, value)
    }
  }

  const calcSatoshi = () => prices[token] * value

  const calcDollar = () => (calcSatoshi() / 10 ** 8) * dollar.BTC

  const calcSTT = () => calcSatoshi() / 2.5 / prices.STT

  const calcPercent = () => {
    const multiple = token === 'STTS' ? 1.25 : 1
    const cal = (calcSatoshi() * multiple * maxPercent) / 5000000

    return cal + account.percent <= maxPercent ? cal : maxPercent - account.percent
  }

  const disableHandler = () => value <= 0 || calcSatoshi() < 500000 || !!error

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
          {confirmed && <p style={{ color: Colors.green }}>Confirmed!</p>}
          {loading && <p style={{ color: Colors.green }}>Waiting...</p>}
          {error && <p style={{ color: Colors.red }}>{error}</p>}
          <DepositButton
            width={90}
            onClick={depositHandler}
            done={confirmed}
            loading={loading}
            disable={disableHandler()}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue value={calcSTT()} precision={0} title="Invetment reward" />
          <TokenValue
            value={account.percent / 250}
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
