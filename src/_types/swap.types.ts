export const SWAP_PRICE_REQUEST = 'SWAP_PRICE_REQUEST'
export const SWAP_PRICE_FAILURE = 'SWAP_PRICE_FAILURE'
export const SWAP_PRICE_SUCCESS = 'SWAP_PRICE_SUCCESS'

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

export type SwapActionTypes =
  | SwapPriceRequest
  | SwapPriceSeccess
  | SwapPriceFailure
