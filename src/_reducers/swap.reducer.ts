import {
  SWAP_PRICE_REQUEST,
  SWAP_PRICE_SUCCESS,
  SWAP_PRICE_FAILURE,
  SWAP_METHOD_REQUEST,
  SWAP_METHOD_SUCCESS,
  SWAP_METHOD_FAILURE,
  SWAP_METHOD_MINED,
} from '../_types/swap.types'
import { SwapActionTypes, DefaultSwapState } from '../_types/swap.types'

const swapReducerDefaultState: DefaultSwapState = {
  loading: true,
  swapLoading: false,
  error: 'Not Found',
  input: '',
  output: '',
  independentField: 'input',
  typedValue: 0,
  recipient: null,
}

export const swapReducer = (
  state = swapReducerDefaultState,
  action: SwapActionTypes
): DefaultSwapState => {
  switch (action.type) {
    case SWAP_METHOD_REQUEST:
      return { ...state, swapLoading: true, error: 'Waiting...' }
    case SWAP_METHOD_SUCCESS:
      return {
        ...state,
        swapLoading: true,
      }
    case SWAP_METHOD_MINED:
      return {
        ...state,
        swapLoading: false,
      }
    case SWAP_METHOD_FAILURE:
      return {
        ...state,
        // error: action.error,
        swapLoading: false,
      }
    case SWAP_PRICE_REQUEST:
      return { ...state, loading: true }
    case SWAP_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case SWAP_PRICE_FAILURE:
      return {
        ...state,
        // error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
