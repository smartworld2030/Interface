import {
  Invest02ActionTypes,
  DefaultInvest02State,
  INVEST02_MESSAGES,
  INVEST02_TRANSACTION_READY,
} from '../_types/invest02.types'
import {
  INVEST02_RESET,
  INVEST02_METHOD_REQUEST,
  INVEST02_METHOD_SUCCESS,
  INVEST02_METHOD_FAILURE,
  INVEST02_ACCOUNT_REQUEST,
  INVEST02_ACCOUNT_SUCCESS,
  INVEST02_ACCOUNT_FAILURE,
  INVEST02_TRANSACTION_MINED,
} from '../_types/invest02.types'

const account = {
  totalAmount: 0,
  hourly: 0,
  refPercent: 0,
  referrer: 0,
  referral: 0,
  btcb: 0,
  stts: 0,
  bnb: 0,
  deposits: 0,
  isBlocked: false,
  latestWithdraw: 0,
  depositDetails: [],
}

const invest02ReducerDefaultState: DefaultInvest02State = {
  invest02Loading: false,
  confirmed: false,
  maxPercent: 0,
  error: '',
  account,
}

export const invest02Reducer = (
  state = invest02ReducerDefaultState,
  action: Invest02ActionTypes
): DefaultInvest02State => {
  switch (action.type) {
    case INVEST02_METHOD_REQUEST:
      return { ...state, invest02Loading: true, method: action.payload.method }
    case INVEST02_METHOD_SUCCESS:
      return {
        ...state,
        confirmed: false,
        transaction: action.payload.transaction,
      }
    case INVEST02_METHOD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        invest02Loading: false,
        confirmed: false,
      }
    case INVEST02_TRANSACTION_MINED:
      return {
        ...state,
        invest02Loading: false,
        confirmed: true,
      }
    case INVEST02_TRANSACTION_READY:
      return {
        ...state,
        invest02Loading: false,
        confirmed: false,
      }
    case INVEST02_MESSAGES:
      return {
        ...state,
        error: action.payload.error,
      }
    case INVEST02_ACCOUNT_REQUEST:
      return { ...state, error: '' }
    case INVEST02_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: { ...account, ...action.payload.account },
        maxPercent: action.payload.maxPercent,
        error: action.payload.error,
      }
    case INVEST02_ACCOUNT_FAILURE:
      return { ...state, ...action.payload }
    case INVEST02_RESET:
      return { ...invest02ReducerDefaultState }
    default:
      return state
  }
}
