import { Transaction } from 'ethers'

export const SWAP_PRICE_REQUEST = 'SWAP_PRICE_REQUEST'
export const SWAP_PRICE_FAILURE = 'SWAP_PRICE_FAILURE'
export const SWAP_PRICE_SUCCESS = 'SWAP_PRICE_SUCCESS'

export const SWAP_TOKENS_REQUEST = 'SWAP_TOKENS_REQUEST'
export const SWAP_TOKENS_FAILURE = 'SWAP_TOKENS_FAILURE'
export const SWAP_TOKENS_SUCCESS = 'SWAP_TOKENS_SUCCESS'

export const SWAP_METHOD_MINED = 'SWAP_METHOD_MINED'
export const SWAP_METHOD_READY = 'SWAP_METHOD_READY'

export const SWAP_METHOD_REQUEST = 'SWAP_METHOD_REQUEST'
export const SWAP_METHOD_FAILURE = 'SWAP_METHOD_FAILURE'
export const SWAP_METHOD_SUCCESS = 'SWAP_METHOD_SUCCESS'

export interface DefaultSwapBankState {
  error: string
  loading: boolean
}

export interface DefaultSwapState {
  error: string
  loading: boolean
  input: string
  output: string
  independentField: 'input' | 'output'
  typedValue: number
  recipient: null
}

export type SwapToken = 'STT' | 'STTS' | 'BNB'

export interface SwapPriceRequest {
  type: typeof SWAP_PRICE_REQUEST
}

export interface SwapPriceSeccess {
  type: typeof SWAP_PRICE_SUCCESS
}

export interface SwapPriceFailure {
  type: typeof SWAP_PRICE_FAILURE
  error: string
}

export interface SwapTokensRequest {
  type: typeof SWAP_TOKENS_REQUEST
}

export interface SwapTokensSeccess {
  type: typeof SWAP_TOKENS_SUCCESS
}

export interface SwapTokensFailure {
  type: typeof SWAP_TOKENS_FAILURE
  error: string
}

export interface SwapMethodRequest {
  type: typeof SWAP_METHOD_REQUEST
  payload: { method: string }
}

export interface SwapMethodSeccess {
  type: typeof SWAP_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface SwapMethodFailure {
  type: typeof SWAP_METHOD_FAILURE
  payload: { error: string }
}

export interface SwapMethodMinedAction {
  type: typeof SWAP_METHOD_MINED
}

export interface SwapMethodReadyAction {
  type: typeof SWAP_METHOD_READY
}

export type SwapActionTypes =
  | SwapPriceRequest
  | SwapPriceSeccess
  | SwapPriceFailure
  | SwapMethodRequest
  | SwapMethodSeccess
  | SwapMethodFailure
  | SwapTokensRequest
  | SwapTokensSeccess
  | SwapTokensFailure
  | SwapMethodMinedAction
  | SwapMethodReadyAction
