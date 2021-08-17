import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const CurrencySelectButton = styled(Button).attrs({
  variant: 'text',
  scale: 'sm',
})`
  padding: 2.5rem 0 0.5rem;
`
const LabelRow = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        <CurrencySelectButton
          selected={!!currency}
          className="open-currency-select-button"
          onClick={() => {
            if (!disableCurrencySelect) {
              onPresentCurrencyModal()
            }
          }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            {pair ? (
              <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
            ) : currency ? (
              <CurrencyLogo currency={currency} size="16px" style={{ marginRight: '8px' }} />
            ) : null}
            {pair ? (
              <Text id="pair">
                {pair?.token0.symbol}:{pair?.token1.symbol}
              </Text>
            ) : (
              <Text id="pair">
                {(currency && currency.symbol && currency.symbol.length > 20
                  ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                  : currency?.symbol) || t('Select a currency')}
              </Text>
            )}
            {!disableCurrencySelect && <ChevronDownIcon />}
          </Flex>
        </CurrencySelectButton>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              {account && (
                <Text onClick={onMax} fontSize="10px" style={{ display: 'inline', cursor: 'pointer', width: '100%' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance ? (
                    t('Balance: %amount%', {
                      amount: selectedCurrencyBalance?.toSignificant(6) ?? '',
                    })
                  ) : (
                    <InputRow
                      style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}
                      selected={disableCurrencySelect}
                    >
                      {!hideInput && (
                        <NumericalInput
                          className="token-amount-input"
                          value={value}
                          onUserInput={(val) => {
                            onUserInput(val)
                          }}
                        />
                      )}
                    </InputRow>
                  )}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        {account && currency && showMaxButton && label !== 'To' && (
          <Button onClick={onMax} scale="sm" variant="text">
            MAX
          </Button>
        )}
      </Container>
    </InputPanel>
  )
}
