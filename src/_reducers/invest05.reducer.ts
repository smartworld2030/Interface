import {
  Invest05ActionTypes,
  DefaultInvest05State,
  INVEST05_MESSAGES,
  INVEST05_TRANSACTION_READY,
} from '../_types/invest05.types'
import {
  INVEST05_RESET,
  INVEST05_METHOD_REQUEST,
  INVEST05_METHOD_SUCCESS,
  INVEST05_METHOD_FAILURE,
  INVEST05_ACCOUNT_REQUEST,
  INVEST05_ACCOUNT_SUCCESS,
  INVEST05_ACCOUNT_FAILURE,
  INVEST05_TRANSACTION_MINED,
} from '../_types/invest05.types'

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

const invest05ReducerDefaultState: DefaultInvest05State = {
  invest05Loading: false,
  confirmed: false,
  fee: 5,
  minimum: 50,
  maximum: 500,
  maxPercent: 10,
  bnbPrice: 0,
  error: '',
  account,
}

export const invest05Reducer = (
  state = invest05ReducerDefaultState,
  action: Invest05ActionTypes
): DefaultInvest05State => {
  switch (action.type) {
    case INVEST05_METHOD_REQUEST:
      return { ...state, invest05Loading: true, method: action.payload.method }
    case INVEST05_METHOD_SUCCESS:
      return {
        ...state,
        confirmed: false,
        transaction: action.payload.transaction,
      }
    case INVEST05_METHOD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        invest05Loading: false,
        confirmed: false,
      }
    case INVEST05_TRANSACTION_MINED:
      return {
        ...state,
        invest05Loading: false,
        confirmed: true,
      }
    case INVEST05_TRANSACTION_READY:
      return {
        ...state,
        invest05Loading: false,
        confirmed: false,
      }
    case INVEST05_MESSAGES:
      return {
        ...state,
        error: action.payload.error,
      }
    case INVEST05_ACCOUNT_REQUEST:
      return { ...state, error: '' }
    case INVEST05_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case INVEST05_ACCOUNT_FAILURE:
      return { ...state, ...action.payload }
    case INVEST05_RESET:
      return { ...invest05ReducerDefaultState }
    default:
      return state
  }
}
