import {
  StockActionTypes,
  DefaultStockState,
  STOCK_MESSAGES,
  STOCK_TRANSACTION_READY,
  StockInfo,
} from '../_types/stock.types'
import {
  STOCK_RESET,
  STOCK_METHOD_REQUEST,
  STOCK_METHOD_SUCCESS,
  STOCK_METHOD_FAILURE,
  STOCK_INFO_REQUEST,
  STOCK_INFO_SUCCESS,
  STOCK_INFO_FAILURE,
  STOCK_TRANSACTION_MINED,
} from '../_types/stock.types'

const data: StockInfo = {
  remainingCarStock: 10000,
  remainingRobotStock: 10000,
  STC: 0,
  STR: 0,
  BUSD: 0,
}

const stockReducerDefaultState: DefaultStockState = {
  stockLoading: false,
  confirmed: false,
  error: '',
  data,
}

export const stockReducer = (
  state = stockReducerDefaultState,
  action: StockActionTypes
): DefaultStockState => {
  switch (action.type) {
    case STOCK_METHOD_REQUEST:
      return { ...state, stockLoading: true, method: action.payload.method }
    case STOCK_METHOD_SUCCESS:
      return {
        ...state,
        confirmed: false,
        transaction: action.payload.transaction,
      }
    case STOCK_METHOD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        stockLoading: false,
        confirmed: false,
      }
    case STOCK_TRANSACTION_MINED:
      return {
        ...state,
        stockLoading: false,
        confirmed: true,
      }
    case STOCK_TRANSACTION_READY:
      return {
        ...state,
        stockLoading: false,
        confirmed: false,
      }
    case STOCK_MESSAGES:
      return {
        ...state,
        error: action.payload.error,
      }
    case STOCK_INFO_REQUEST:
      return { ...state, error: '' }
    case STOCK_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case STOCK_INFO_FAILURE:
      return { ...state, ...action.payload }
    case STOCK_RESET:
      return { ...stockReducerDefaultState }
    default:
      return state
  }
}
