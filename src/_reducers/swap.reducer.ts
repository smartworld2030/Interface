import { FAILURE, REQUEST, SUCCESS } from '../_types'
import { SwapActionTypes, DefaultSwapState } from '../_types/swap.types'

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
        // error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
