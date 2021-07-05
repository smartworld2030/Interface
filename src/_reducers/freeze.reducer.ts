import {
  FreezeActionTypes,
  DefaultFreezeState,
  DefaultFreezeBankState,
} from '../_types/freeze.types'
import { SAVE, REQUEST, SUCCESS, FAILURE } from '../_types'

const freezeBankReducerDefaultState: DefaultFreezeBankState = {
  loading: true,
  error: 'Not Found',
}

export const freezeBankReducer = (
  state = freezeBankReducerDefaultState,
  action: FreezeActionTypes
): DefaultFreezeBankState => {
  switch (action.type) {
    case REQUEST.FREEZE_BANK:
      return state
    case SUCCESS.FREEZE_BANK:
      return {
        ...state,
        loading: false,
      }
    case SAVE.FREEZE_BANK:
      let match = false
      return {
        ...state,
      }
    case FAILURE.FREEZE_BANK:
      return {
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}

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
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
