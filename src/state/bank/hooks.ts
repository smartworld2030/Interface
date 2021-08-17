import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { BankData } from './reducer'

export function useBankStates(): BankData {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => state.bank[chainId ?? -1])
}

export function useSttPrice(): BankData['sttPrice'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.bank[chainId ?? -1]?.sttPrice)
}

export function useBankBalances(): BankData['totalSatoshi'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.bank[chainId ?? -1]?.totalSatoshi)
}

export function useBankSatoshi(): { btcToSatoshi: string; bnbToSatoshi: string; sttsToSatoshi: string } {
  const { btcToSatoshi, bnbToSatoshi, sttsToSatoshi } = useBankStates()

  return { btcToSatoshi, bnbToSatoshi, sttsToSatoshi }
}

export function useBankDollars(): { btcToDollar: string; bnbToDollar: string; sttsToDollar: string } {
  const { bnbToSatoshi, sttsToSatoshi, latestAnswer } = useBankStates()
  const btcToDollar = (+latestAnswer / 10 ** 8).toFixed(2)
  const bnbToDollar = ((+bnbToSatoshi / 10 ** 8) * +btcToDollar).toFixed(2)
  const sttsToDollar = ((+sttsToSatoshi / 10 ** 8) * +btcToDollar).toFixed(2)
  return { btcToDollar, bnbToDollar, sttsToDollar }
}

export default useBankStates
