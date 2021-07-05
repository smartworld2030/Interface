import React, { useState } from 'react'
import { Row, Col } from 'react-grid-system'
import { TokenValue } from '../../../Layout/typography/Tokens'
import { DepositButton } from '../../../Layout/svgs/DepositButton'

interface DepositInfoProps {
  token: string
  value: number
}

const DepositInfo: React.FC<DepositInfoProps> = ({ token, value }) => {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const depositHandler = () => {
    if (!loading && !done) {
      setLoading(true)
      setDone(false)
      setTimeout(() => {
        setLoading(false)
        setDone(true)
        setTimeout(() => {
          setDone(false)
        }, 2000)
      }, 5000)
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
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue title="Number of tokens:" token={token} value={value} />
          <TokenValue
            title="Price(Satoshi):"
            token="SATS"
            precision={0}
            value={value * 201.1}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            title="Price(Smart Bits):"
            token="STB"
            precision={1}
            value={(value * 201.1) / 100}
          />
          <TokenValue title="Price(Dollar):" token="$" value={value} />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <DepositButton
            width={90}
            onClick={depositHandler}
            done={done}
            loading={loading}
          />
        </Row>
      </Col>
      <Col xs={12} width="100%">
        <Row align="center" justify="around">
          <TokenValue
            value={value * 3.122}
            precision={2}
            title="Invetment Reward:"
          />
          <TokenValue
            value={value / 10}
            precision={2}
            token="%"
            title="Referral percent:"
          />
        </Row>
      </Col>
    </Row>
  )
}

export default DepositInfo
