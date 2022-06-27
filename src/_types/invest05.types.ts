import { Transaction } from 'ethers'

export const INVEST05_RESET = 'INVEST05_RESET'
export const INVEST05_METHOD_REQUEST = 'INVEST05_METHOD_REQUEST'
export const INVEST05_METHOD_SUCCESS = 'INVEST05_METHOD_SUCCESS'
export const INVEST05_METHOD_FAILURE = 'INVEST05_METHOD_FAILURE'

export const INVEST05_ACCOUNT_REQUEST = 'INVEST05_ACCOUNT_REQUEST'
export const INVEST05_ACCOUNT_SUCCESS = 'INVEST05_ACCOUNT_SUCCESS'
export const INVEST05_ACCOUNT_FAILURE = 'INVEST05_ACCOUNT_FAILURE'

export const INVEST05_TRANSACTION_MINED = 'INVEST05_TRANSACTION_MINED'
export const INVEST05_TRANSACTION_READY = 'INVEST05_TRANSACTION_READY'

export const INVEST05_MESSAGES = 'INVEST05_MESSAGES'

export interface DefaultInvest05State {
  transaction?: Transaction
  method?: string
  error?: string
  account: Invest05Info
  fee: number
  minimum: number
  maximum: number
  maxPercent: number
  bnbPrice: number
  confirmed: boolean
  invest05Loading: boolean
}

export type Invest05Info = {
  bnb: number
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
  reward: number
  startTime: number
  amount: number
  endTime: number
}

export interface RequestInvest05Action {
  type: typeof INVEST05_METHOD_REQUEST
  payload: { method: string }
}

export interface SeccessInvest05Action {
  type: typeof INVEST05_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface MinedInvest05Action {
  type: typeof INVEST05_TRANSACTION_MINED
}

export interface ReadyInvest05Action {
  type: typeof INVEST05_TRANSACTION_READY
}

export interface FailureInvest05Action {
  type: typeof INVEST05_METHOD_FAILURE
  payload: { error: string }
}

export interface AccountInvest05RequestAction {
  type: typeof INVEST05_ACCOUNT_REQUEST
}
export interface AccountInvest05SuccessAction {
  type: typeof INVEST05_ACCOUNT_SUCCESS
  payload: {
    account: Invest05Info
    fee: number
    minimum: number
    error?: string
  }
}

export interface AccountInvest05FailureAction {
  type: typeof INVEST05_ACCOUNT_FAILURE
  payload: {
    fee?: number
    minimum: number
    maximum: number
    maxPercent: number
    error: string
  }
}

export interface MessageInvest05Action {
  type: typeof INVEST05_MESSAGES
  payload: { error: string }
}

export interface ResetInvest05Action {
  type: typeof INVEST05_RESET
}

export type Invest05ActionTypes =
  | ResetInvest05Action
  | MinedInvest05Action
  | ReadyInvest05Action
  | RequestInvest05Action
  | SeccessInvest05Action
  | FailureInvest05Action
  | MessageInvest05Action
  | AccountInvest05RequestAction
  | AccountInvest05SuccessAction
  | AccountInvest05FailureAction
