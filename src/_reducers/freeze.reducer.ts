import { FreezeActionTypes, DefaultFreezeState } from '../_types/freeze.types'
import { REQUEST, SUCCESS, FAILURE } from '../_types'

const freezeReducerDefaultState: DefaultFreezeState = {
  loading: true,
  error: 'Not Found',
}

export const freezeReducer = (
  state = freezeReducerDefaultState,
  action: FreezeActionTypes
): DefaultFreezeState => {
  switch (action.type) {
    case REQUEST.FREEZE:
    case SUCCESS.FREEZE:
      return {
        ...state,
        loading: false,
      }
    case FAILURE.FREEZE:
      return {
        ...state,
        // error: action,
        loading: false,
      }
    default:
      return state
  }
}
