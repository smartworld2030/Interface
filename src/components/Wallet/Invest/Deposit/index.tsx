import { BalanceInput } from '@smartworld-libs/uikit'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-grid-system'
import { useBankSatoshi } from 'state/bank/hooks'
import { useInvestTokenBalances } from 'state/wallet/hooks'
import { removeError } from '../../../../_actions/invest.actions'
import { convertNumbers2English, percentToValue, truncate, valueToPercent } from '../../../../_helpers/api'
import DepositCircle from '../../../Layout/svgs/DepositCircle'
import TokenCircle from '../../../Layout/svgs/TokenCircle'
import DepositInfo from './DepositInfo'

interface DepositSectionProps {
  isMobile: boolean
}

export const tokenNames = ['STTS', 'BNB', 'BTC']

export const DepositSection: React.FC<DepositSectionProps> = ({ isMobile }) => {
  const prices = useBankSatoshi()
  const tokens = useInvestTokenBalances()
  const error = {}
  const [token, setToken] = useState('STTS')
  const [value, setValue] = useState<string>()

  useEffect(() => {
    return () => {
      setValue(undefined)
    }
  }, [token])

  const minimumAmount = (t: string) =>
    truncate((500000 / Number(prices[t.toLowerCase()])).toString(), t === 'STTS' ? 1 : 3, t !== 'BTC')

  const maxHandler = () => {
    console.log(tokens)
    setValue(tokens[token])
  }

  const percentHandler = (per: number) => {
    if (error) removeError()
    const percent = percentToValue(tokens[token], per)
    setValue(percent && percent !== 'NaN' ? percent : '0')
  }

  const inputHandler = (val: string) => {
    if (error) removeError()
    val = convertNumbers2English(val)
    if (val.length <= 20 && /^\d*\.?\d*$/.test(val))
      setValue(val === '00' ? Number(val).toString() : val === '.' ? '0.' : val)
  }

  return (
    <Row direction="row" style={{ height: '100%' }}>
      <Col md={2}>
        <Row direction={isMobile ? 'row' : 'column'} justify="around" align="center" style={{ height: '100%' }}>
          {tokenNames.map((t) => (
            <TokenCircle key={t} width={70} onClick={setToken} token={t} active={token === t} info={minimumAmount(t)} />
          ))}
        </Row>
      </Col>
      <Col md={4}>
        <Row justify="around" align="center" style={{ height: '100%' }}>
          <BalanceInput
            width={isMobile ? 210 : 190}
            unit={token}
            value={value}
            currencyValue="100"
            currencyUnit="USD"
            switchEditingUnits={() => console.log()}
            placeholder={tokens?.[token]?.toString()}
            onUserInput={inputHandler}
            maxButton={maxHandler}
            // percent={valueToPercent(value, tokens?.[token])}
            // inputHandler={inputHandler}
            // percentHandler={percentHandler}
          />
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={token} value={Number(value ?? 0)} prices={prices} />
      </Col>
    </Row>
  )
}

export default DepositSection
