import {
  PoolActionTypes,
  DefaultPoolState,
  POOL_MESSAGES,
  POOL_TRANSACTION_READY,
} from '../_types/pool.types'
import {
  POOL_RESET,
  POOL_METHOD_REQUEST,
  POOL_METHOD_SUCCESS,
  POOL_METHOD_FAILURE,
  POOL_ACCOUNT_REQUEST,
  POOL_ACCOUNT_SUCCESS,
  POOL_ACCOUNT_FAILURE,
  POOL_TRANSACTION_MINED,
} from '../_types/pool.types'

const account = {
  daily: 0,
  referral: 0,
  referrer: 0,
  refAmounts: 0,
  deposits: 0,
  liquidity: 0,
  latestWithdraw: 0,
  depositDetails: [],
}

const poolReducerDefaultState: DefaultPoolState = {
  poolLoading: false,
  confirmed: false,
  currentPrice: 0,
  lpAmounts: { stts: 0, bnb: 0 },
  error: '',
  account,
}

export const poolReducer = (
  state = poolReducerDefaultState,
  action: PoolActionTypes
): DefaultPoolState => {
  switch (action.type) {
    case POOL_METHOD_REQUEST:
      return { ...state, poolLoading: true, method: action.payload.method }
    case POOL_METHOD_SUCCESS:
      return {
        ...state,
        confirmed: false,
        transaction: action.payload.transaction,
      }
    case POOL_METHOD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        poolLoading: false,
        confirmed: false,
      }
    case POOL_TRANSACTION_MINED:
      return {
        ...state,
        poolLoading: false,
        confirmed: true,
      }
    case POOL_TRANSACTION_READY:
      return {
        ...state,
        poolLoading: false,
        confirmed: false,
      }
    case POOL_MESSAGES:
      return {
        ...state,
        error: action.payload.error,
      }
    case POOL_ACCOUNT_REQUEST:
      return { ...state, error: '' }
    case POOL_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: { ...account, ...action.payload.account },
        currentPrice: action.payload.currentPrice,
        error: action.payload.error,
      }
    case POOL_ACCOUNT_FAILURE:
      return {
        ...state,
        ...action.payload,
        account: { ...account, ...action.payload.account },
      }
    case POOL_RESET:
      return { ...poolReducerDefaultState }
    default:
      return state
  }
}
