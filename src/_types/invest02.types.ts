import { Transaction } from 'ethers'

export const INVEST02_RESET = 'INVEST02_RESET'
export const INVEST02_METHOD_REQUEST = 'INVEST02_METHOD_REQUEST'
export const INVEST02_METHOD_SUCCESS = 'INVEST02_METHOD_SUCCESS'
export const INVEST02_METHOD_FAILURE = 'INVEST02_METHOD_FAILURE'

export const INVEST02_ACCOUNT_REQUEST = 'INVEST02_ACCOUNT_REQUEST'
export const INVEST02_ACCOUNT_SUCCESS = 'INVEST02_ACCOUNT_SUCCESS'
export const INVEST02_ACCOUNT_FAILURE = 'INVEST02_ACCOUNT_FAILURE'

export const INVEST02_TRANSACTION_MINED = 'INVEST02_TRANSACTION_MINED'
export const INVEST02_TRANSACTION_READY = 'INVEST02_TRANSACTION_READY'

export const INVEST02_MESSAGES = 'INVEST02_MESSAGES'

export interface DefaultInvest02State {
  transaction?: Transaction
  method?: string
  error?: string
  account: Invest02Info
  fee: number
  minimum: number
  confirmed: boolean
  invest02Loading: boolean
}

export type Invest02Info = {
  bnb: number
  stts: number
  btcb: number
  isBlocked: boolean
  totalAmount: number
  hourly: number
  refPercent: number
  referrer: number
  referral: number
  deposits: number
  latestWithdraw: number
  depositDetails: DepositDetail[]
}

type DepositDetail = {
  period: number
  reward: number
  startTime: number
  amount: number
  endTime: number
}

export interface RequestInvest02Action {
  type: typeof INVEST02_METHOD_REQUEST
  payload: { method: string }
}

export interface SeccessInvest02Action {
  type: typeof INVEST02_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface MinedInvest02Action {
  type: typeof INVEST02_TRANSACTION_MINED
}

export interface ReadyInvest02Action {
  type: typeof INVEST02_TRANSACTION_READY
}

export interface FailureInvest02Action {
  type: typeof INVEST02_METHOD_FAILURE
  payload: { error: string }
}

export interface AccountInvest02RequestAction {
  type: typeof INVEST02_ACCOUNT_REQUEST
}
export interface AccountInvest02SuccessAction {
  type: typeof INVEST02_ACCOUNT_SUCCESS
  payload: {
    account: Invest02Info
    fee: number
    minimum: number
    error?: string
  }
}

export interface AccountInvest02FailureAction {
  type: typeof INVEST02_ACCOUNT_FAILURE
  payload: {
    fee?: number
    minimum: number
    error: string
  }
}

export interface MessageInvest02Action {
  type: typeof INVEST02_MESSAGES
  payload: { error: string }
}

export interface ResetInvest02Action {
  type: typeof INVEST02_RESET
}

export type Invest02ActionTypes =
  | ResetInvest02Action
  | MinedInvest02Action
  | ReadyInvest02Action
  | RequestInvest02Action
  | SeccessInvest02Action
  | FailureInvest02Action
  | MessageInvest02Action
  | AccountInvest02RequestAction
  | AccountInvest02SuccessAction
  | AccountInvest02FailureAction
