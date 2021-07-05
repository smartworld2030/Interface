import { FAILURE, REQUEST, SAVE, SUCCESS } from '../_types'
import {
  SwapActionTypes,
  DefaultSwapState,
  DefaultSwapBankState,
} from '../_types/swap.types'

const swapBankReducerDefaultState: DefaultSwapBankState = {
  loading: true,
  error: 'Not Found',
}

export const swapBankReducer = (
  state = swapBankReducerDefaultState,
  action: SwapActionTypes
): DefaultSwapBankState => {
  switch (action.type) {
    case REQUEST.SWAP_BANK:
      return state
    case SUCCESS.SWAP_BANK:
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case FAILURE.SWAP_BANK:
      return {
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}

const swapReducerDefaultState: DefaultSwapState = {
  loading: true,
  error: 'Not Found',
}

export const swapReducer = (
  state = swapReducerDefaultState,
  action: SwapActionTypes
): DefaultSwapState => {
  switch (action.type) {
    case REQUEST.SWAP:
      return { ...state, loading: true }
    case SUCCESS.SWAP:
      return {
        ...state,
        loading: false,
      }
    case FAILURE.SWAP:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
