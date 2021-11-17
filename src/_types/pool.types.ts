import { Transaction } from 'ethers'

export const POOL_RESET = 'POOL_RESET'
export const POOL_METHOD_REQUEST = 'POOL_METHOD_REQUEST'
export const POOL_METHOD_SUCCESS = 'POOL_METHOD_SUCCESS'
export const POOL_METHOD_FAILURE = 'POOL_METHOD_FAILURE'

export const POOL_ACCOUNT_REQUEST = 'POOL_ACCOUNT_REQUEST'
export const POOL_ACCOUNT_SUCCESS = 'POOL_ACCOUNT_SUCCESS'
export const POOL_ACCOUNT_FAILURE = 'POOL_ACCOUNT_FAILURE'

export const POOL_TRANSACTION_MINED = 'POOL_TRANSACTION_MINED'
export const POOL_TRANSACTION_READY = 'POOL_TRANSACTION_READY'

export const POOL_MESSAGES = 'POOL_MESSAGES'

export interface DefaultPoolState {
  transaction?: Transaction
  method?: string
  error?: string
  account: PoolAccountInfo
  currentPrice: number
  lpAmounts: LpAmounts
  confirmed: boolean
  poolLoading: boolean
}

export type PoolAccountInfo = {
  daily: number
  referral: number
  referrer: number
  refAmounts: number
  deposits: number
  liquidity: number
  latestWithdraw: number
  depositDetails: DepositDetail[]
}

type DepositDetail = {
  startTime: number
  reward: number
}

export type LpAmounts = {
  stts: number
  bnb: number
}

export interface RequestPoolAction {
  type: typeof POOL_METHOD_REQUEST
  payload: { method: string }
}

export interface SeccessPoolAction {
  type: typeof POOL_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface MinedPoolAction {
  type: typeof POOL_TRANSACTION_MINED
}

export interface ReadyPoolAction {
  type: typeof POOL_TRANSACTION_READY
}

export interface FailurePoolAction {
  type: typeof POOL_METHOD_FAILURE
  payload: { error: string }
}

export interface AccountPoolRequestAction {
  type: typeof POOL_ACCOUNT_REQUEST
}
export interface AccountPoolSuccessAction {
  type: typeof POOL_ACCOUNT_SUCCESS
  payload: {
    account: PoolAccountInfo
    currentPrice: number
    error?: string
  }
}

export interface AccountPoolFailureAction {
  type: typeof POOL_ACCOUNT_FAILURE
  payload: {
    currentPrice: number
    account?: PoolAccountInfo
    error: string
  }
}

export interface MessagePoolAction {
  type: typeof POOL_MESSAGES
  payload: { error: string }
}

export interface ResetPoolAction {
  type: typeof POOL_RESET
}

export type PoolActionTypes =
  | ResetPoolAction
  | MinedPoolAction
  | ReadyPoolAction
  | RequestPoolAction
  | SeccessPoolAction
  | FailurePoolAction
  | MessagePoolAction
  | AccountPoolRequestAction
  | AccountPoolSuccessAction
  | AccountPoolFailureAction
