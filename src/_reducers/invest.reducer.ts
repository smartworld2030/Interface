import {
  InvestActionTypes,
  DefaultInvestState,
  INVEST_MESSAGES,
  INVEST_TRANSACTION_READY,
} from '../_types/invest.types'
import {
  INVEST_RESET,
  INVEST_METHOD_REQUEST,
  INVEST_METHOD_SUCCESS,
  INVEST_METHOD_FAILURE,
  INVEST_ACCOUNT_REQUEST,
  INVEST_ACCOUNT_SUCCESS,
  INVEST_ACCOUNT_FAILURE,
  INVEST_TRANSACTION_MINED,
} from '../_types/invest.types'

const account = {
  satoshi: 0,
  hourly: 0,
  percent: 0,
  referrer: 0,
  referral: 0,
  btcb: 0,
  stts: 0,
  bnb: 0,
  deposits: 0,
  latestWithdraw: 0,
  depositDetails: [],
}

const investReducerDefaultState: DefaultInvestState = {
  investLoading: false,
  confirmed: false,
  maxPercent: 0,
  error: '',
  account,
}

export const investReducer = (
  state = investReducerDefaultState,
  action: InvestActionTypes
): DefaultInvestState => {
  switch (action.type) {
    case INVEST_METHOD_REQUEST:
      return { ...state, investLoading: true, method: action.payload.method }
    case INVEST_METHOD_SUCCESS:
      return {
        ...state,
        confirmed: false,
        transaction: action.payload.transaction,
      }
    case INVEST_METHOD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        investLoading: false,
        confirmed: false,
      }
    case INVEST_TRANSACTION_MINED:
      return {
        ...state,
        investLoading: false,
        confirmed: true,
      }
    case INVEST_TRANSACTION_READY:
      return {
        ...state,
        investLoading: false,
        confirmed: false,
      }
    case INVEST_MESSAGES:
      return {
        ...state,
        error: action.payload.error,
      }
    case INVEST_ACCOUNT_REQUEST:
      return { ...state, error: '' }
    case INVEST_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: { ...account, ...action.payload.account },
        maxPercent: action.payload.maxPercent,
        error: action.payload.error,
      }
    case INVEST_ACCOUNT_FAILURE:
      return { ...state }
    case INVEST_RESET:
      return { ...investReducerDefaultState }
    default:
      return state
  }
}
