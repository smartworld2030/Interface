import {
  SWAP_PRICE_REQUEST,
  SWAP_PRICE_SUCCESS,
  SWAP_PRICE_FAILURE,
} from '../_types/swap.types'
import { SwapActionTypes, DefaultSwapState } from '../_types/swap.types'

const swapReducerDefaultState: DefaultSwapState = {
  loading: true,
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
