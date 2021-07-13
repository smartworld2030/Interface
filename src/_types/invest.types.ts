import { Transaction } from 'ethers'

export const INVEST_RESET = 'INVEST_RESET'
export const INVEST_METHOD_REQUEST = 'INVEST_METHOD_REQUEST'
export const INVEST_METHOD_SUCCESS = 'INVEST_METHOD_SUCCESS'
export const INVEST_METHOD_FAILURE = 'INVEST_METHOD_FAILURE'

export const INVEST_ACCOUNT_REQUEST = 'INVEST_ACCOUNT_REQUEST'
export const INVEST_ACCOUNT_SUCCESS = 'INVEST_ACCOUNT_SUCCESS'
export const INVEST_ACCOUNT_FAILURE = 'INVEST_ACCOUNT_FAILURE'

export const INVEST_TRANSACTION_MINED = 'INVEST_TRANSACTION_MINED'
export const INVEST_TRANSACTION_READY = 'INVEST_TRANSACTION_READY'

export const INVEST_MESSAGES = 'INVEST_MESSAGES'

export interface DefaultInvestState {
  transaction?: Transaction
  method?: string
  error?: string
  account: InvestInfo
  maxPercent: number
  confirmed: boolean
  investLoading: boolean
}

export type InvestInfo = {
  bnb: number
  stts: number
  btcb: number
  satoshi: number
  hourly: number
  percent: number
  referrer: number
  referral: number
  deposits: number
  latestWithdraw: number
  depositDetails: DepositDetail[]
}

type DepositDetail = {
  reward: string
  endTime: number
}

export interface RequestInvestAction {
  type: typeof INVEST_METHOD_REQUEST
  payload: { method: string }
}

export interface SeccessInvestAction {
  type: typeof INVEST_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface MinedInvestAction {
  type: typeof INVEST_TRANSACTION_MINED
}

export interface ReadyInvestAction {
  type: typeof INVEST_TRANSACTION_READY
}

export interface FailureInvestAction {
  type: typeof INVEST_METHOD_FAILURE
  payload: { error: string }
}

export interface AccountInvestRequestAction {
  type: typeof INVEST_ACCOUNT_REQUEST
}
export interface AccountInvestSuccessAction {
  type: typeof INVEST_ACCOUNT_SUCCESS
  payload: { account: InvestInfo; maxPercent: number; error?: string }
}

export interface AccountInvestFailureAction {
  type: typeof INVEST_ACCOUNT_FAILURE
  payload: { maxPercent?: number; error: string }
}

export interface MessageInvestAction {
  type: typeof INVEST_MESSAGES
  payload: { error: string }
}

export interface ResetInvestAction {
  type: typeof INVEST_RESET
}

export type InvestActionTypes =
  | ResetInvestAction
  | MinedInvestAction
  | ReadyInvestAction
  | RequestInvestAction
  | SeccessInvestAction
  | FailureInvestAction
  | MessageInvestAction
  | AccountInvestRequestAction
  | AccountInvestSuccessAction
  | AccountInvestFailureAction
