import { BalanceInput } from '@smartworld-libs/uikit'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-grid-system'
import { useBankDollars, useBankSatoshi } from 'state/bank/hooks'
import { useInvestTokenBalances } from 'state/wallet/hooks'
import TokenCircle from '../../../Layout/svgs/TokenCircle'
import { truncate } from '../../../../_helpers/api'
import DepositInfo from './DepositInfo'

interface DepositSectionProps {
  isMobile: boolean
}

export const tokenNames = ['STTS', 'BNB', 'BTC']

export const DepositSection: React.FC<DepositSectionProps> = ({ isMobile }) => {
  const dollar = useBankDollars()
  const prices = useBankSatoshi()
  const tokens = useInvestTokenBalances()

  const [token, setToken] = useState('STTS')
  const [editingUnit, setEditingUnit] = useState<string | 'USD'>(token)
  const [values, setValues] = useState({
    [token]: tokens[token] ? tokens[token] : '',
    USD: `${tokens[token] * dollar[token]}`,
  })

  const conversionUnit = editingUnit === token ? 'USD' : token

  useEffect(() => {
    setEditingUnit(token)
    setValues({
      [token]: '',
      USD: '',
    })
    return () => {
      setValues({
        [token]: '',
        USD: '',
      })
    }
  }, [token])

  const minimumAmount = (t: string) =>
    truncate((500000 / Number(prices[t.toLowerCase()])).toString(), t === 'STTS' ? 1 : 3, t !== 'BTC')

  const currencyValues = !Number.isNaN(parseFloat(values[conversionUnit]))
    ? '~' +
      parseFloat(values[conversionUnit]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00'

  const handleInputChange = (input: string) => {
    const inputAsFloat = parseFloat(input)
    if (editingUnit !== 'USD') {
      setValues({
        [token]: input,
        USD: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat * dollar[token.toLowerCase()]}`,
      })
    } else {
      setValues({
        [token]: Number.isNaN(inputAsFloat) ? '' : `${inputAsFloat / dollar[token.toLowerCase()]}`,
        USD: input,
      })
    }
  }

  const switchEditingUnits = () => {
    const editingUnitAfterChange = editingUnit === token ? 'USD' : token
    // This is needed to persist same value as shown for currencyValue after switching
    // otherwise user will see lots of decimals
    const valuesAfterChange = { ...values }
    valuesAfterChange[editingUnitAfterChange] = !Number.isNaN(parseFloat(values[conversionUnit]))
      ? parseFloat(values[conversionUnit]).toFixed(2)
      : ''
    setValues(valuesAfterChange)
    setEditingUnit(editingUnitAfterChange)
  }

  const balanceValues = () => {
    const inputAsFloat = parseFloat(tokens?.[token])
    if (editingUnit !== 'USD') {
      return tokens?.[token]
    } else {
      return Number.isNaN(inputAsFloat) ? '0' : `${inputAsFloat * dollar[token.toLowerCase()]}`
    }
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
            value={values[editingUnit]}
            maxValue={balanceValues()}
            onUserInput={handleInputChange}
            unit={editingUnit}
            currencyValue={currencyValues}
            currencyUnit={conversionUnit}
            placeholder={balanceValues()}
            size={isMobile ? 230 : 210}
            borderColor="transparent"
            progressColor={balanceValues() === '0' ? 'transparent' : undefined}
            borderSize={2}
            knobSize={12}
            disabled={balanceValues() === '0'}
            switchEditingUnits={switchEditingUnits}
          />
        </Row>
      </Col>
      <Col md={6}>
        <DepositInfo token={token} value={Number(values[token] ?? 0)} prices={prices} />
      </Col>
    </Row>
  )
}

export default DepositSection
