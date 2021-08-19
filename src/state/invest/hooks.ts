import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { InvestData } from './reducer'

export function useInvestStates(): InvestData {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => state.invest[chainId ?? -1])
}

export function useInvestMax(): number {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => +state.invest[chainId ?? -1]?.maxPercent)
}

export function useUserDetails(): InvestData {
  return useInvestStates()
}

export function useUserInfo(): InvestData['users'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.invest[chainId ?? -1]?.users)
}

export function useUserInterest(): InvestData['calculateInterest'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.invest[chainId ?? -1]?.calculateInterest)
}

export function useUserPercent(): InvestData['calculatePercent'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.invest[chainId ?? -1]?.calculatePercent)
}

export function useUserInvestBalance(): InvestData['userBalances'] {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.invest[chainId ?? -1]?.userBalances)
}

export default useInvestStates
