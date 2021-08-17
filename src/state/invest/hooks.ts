import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { InvestData } from './reducer'

export function useInvestStates(): InvestData {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => state.invest[chainId ?? -1])
}

export function useInvestMax(): InvestData['maxPercent'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.invest[chainId ?? -1]?.maxPercent)
}

export default useInvestStates
