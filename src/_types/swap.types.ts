import { FAILURE, REQUEST, SUCCESS } from '.'

export interface DefaultSwapBankState {
  error: string
  loading: boolean
}

export interface DefaultSwapState {
  error: string
  loading: boolean
}

export interface RequestSwap {
  type: typeof REQUEST.SWAP
}

export interface SeccessSwap {
  type: typeof SUCCESS.SWAP
}

export interface FailureSwap {
  type: typeof FAILURE.SWAP
  error: string
}

export type SwapActionTypes = RequestSwap | SeccessSwap | FailureSwap
