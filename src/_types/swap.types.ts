import { FAILURE, REQUEST, SUCCESS, SAVE } from '.'

export interface DefaultSwapBankState {
  error: string
  loading: boolean
}

export interface DefaultSwapState {
  error: string
  loading: boolean
}

export interface RequestSwapBank {
  type: typeof REQUEST.SWAP_BANK
}
export interface SeccessSwapBank {
  type: typeof SUCCESS.SWAP_BANK
  payload: {
    nextLoad: number
  }
}
export interface FailureSwapBank {
  type: typeof FAILURE.SWAP_BANK
  error: string
}

export interface SaveGuides {
  type: typeof SAVE.SWAP_BANK
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

export type SwapActionTypes =
  | RequestSwapBank
  | SeccessSwapBank
  | FailureSwapBank
  | RequestSwap
  | SeccessSwap
  | FailureSwap
  | SaveGuides
