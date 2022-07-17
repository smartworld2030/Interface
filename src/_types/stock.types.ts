import { Transaction } from 'ethers'

export const STOCK_RESET = 'STOCK_RESET'
export const STOCK_METHOD_REQUEST = 'STOCK_METHOD_REQUEST'
export const STOCK_METHOD_SUCCESS = 'STOCK_METHOD_SUCCESS'
export const STOCK_METHOD_FAILURE = 'STOCK_METHOD_FAILURE'

export const STOCK_INFO_REQUEST = 'STOCK_INFO_REQUEST'
export const STOCK_INFO_SUCCESS = 'STOCK_INFO_SUCCESS'
export const STOCK_INFO_FAILURE = 'STOCK_INFO_FAILURE'

export const STOCK_TRANSACTION_MINED = 'STOCK_TRANSACTION_MINED'
export const STOCK_TRANSACTION_READY = 'STOCK_TRANSACTION_READY'

export const STOCK_MESSAGES = 'STOCK_MESSAGES'

export interface DefaultStockState {
  transaction?: Transaction
  method?: string
  error?: string
  data: StockInfo
  confirmed: boolean
  stockLoading: boolean
}

export type StockInfo = {
  remainingCarStock: number
  remainingRobotStock: number
  STR: number
  STC: number
  BUSD: number
}

export interface RequestStockAction {
  type: typeof STOCK_METHOD_REQUEST
  payload: { method: string }
}

export interface SeccessStockAction {
  type: typeof STOCK_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface MinedStockAction {
  type: typeof STOCK_TRANSACTION_MINED
}

export interface ReadyStockAction {
  type: typeof STOCK_TRANSACTION_READY
}

export interface FailureStockAction {
  type: typeof STOCK_METHOD_FAILURE
  payload: { error: string }
}

export interface AccountStockRequestAction {
  type: typeof STOCK_INFO_REQUEST
}
export interface AccountStockSuccessAction {
  type: typeof STOCK_INFO_SUCCESS
  payload: {
    data: StockInfo
    error?: string
  }
}

export interface AccountStockFailureAction {
  type: typeof STOCK_INFO_FAILURE
  payload: {
    error: string
  }
}

export interface MessageStockAction {
  type: typeof STOCK_MESSAGES
  payload: { error: string }
}

export interface ResetStockAction {
  type: typeof STOCK_RESET
}

export type StockActionTypes =
  | ResetStockAction
  | MinedStockAction
  | ReadyStockAction
  | RequestStockAction
  | SeccessStockAction
  | FailureStockAction
  | MessageStockAction
  | AccountStockRequestAction
  | AccountStockSuccessAction
  | AccountStockFailureAction
