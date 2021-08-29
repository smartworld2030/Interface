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

export function useBankSatoshi(): { btc: string; bnb: string; stts: string; stt: string } {
  const { btcToSatoshi, bnbToSatoshi, sttsToSatoshi } = useBankStates()

  return { btc: btcToSatoshi, bnb: bnbToSatoshi, stts: sttsToSatoshi, stt: useSttPrice() }
}

export default useBankStates
