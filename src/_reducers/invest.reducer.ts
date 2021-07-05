import {
  InvestActionTypes,
  DefaultInvestState,
  DefaultInvestBankState,
} from '../_types/invest.types'
import { REQUEST, SUCCESS, FAILURE } from '../_types'

const investBankReducerDefaultState: DefaultInvestBankState = {
  data: [],
  loading: true,
  error: 'Not Found',
  nextLoad: 0,
}

export const investBankReducer = (
  state = investBankReducerDefaultState,
  action: InvestActionTypes
): DefaultInvestBankState => {
  switch (action.type) {
    case REQUEST.INVEST_BANK:
      return state
    case SUCCESS.INVEST_BANK:
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case FAILURE.INVEST_BANK:
      return {
        data: [],
        error: action.error,
        nextLoad: 0,
        loading: false,
      }
    default:
      return state
  }
}

const investReducerDefaultState: DefaultInvestState = {
  loading: true,
  error: 'Not Found',
}

export const investReducer = (
  state = investReducerDefaultState,
  action: InvestActionTypes
): DefaultInvestState => {
  switch (action.type) {
    case REQUEST.INVEST:
      return { ...state, loading: true, data: undefined }
    case SUCCESS.INVEST:
      if (action.data === undefined) {
        return {
          ...state,
          data: action.data,
          loading: false,
        }
      } else {
        return {
          ...state,
          data: action.data,
          loading: false,
        }
      }
    case FAILURE.INVEST:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
