import { CallHistoryMethodAction, RouterState } from 'connected-react-router'
import { DefaultUserState, UserActionTypes } from './account.types'
import { DefaultBankState, BankActionTypes } from './bank.types'
import { SnackActionTypes } from './snackbar.types'
import { DefaultWalletState, WalletActionTypes } from './wallet.types'
import { InvestActionTypes, DefaultInvestState } from './invest.types'
import { Invest02ActionTypes, DefaultInvest02State } from './invest02.types'
import { SwapActionTypes, DefaultSwapState } from './swap.types'
import { DefaultPoolState, PoolActionTypes } from './pool.types'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export const REQUEST = {
  INVEST: 'REQUEST_INVEST',
  FREEZE: 'REQUEST_FREEZE',
  SWAP: 'REQUEST_SWAP',
} as const
export const SUCCESS = {
  INVEST: 'SUCCESS_INVEST',
  FREEZE: 'SUCCESS_FREEZE',
  SWAP: 'SUCCESS_SWAP',
} as const
export const FAILURE = {
  INVEST: 'FAILURE_INVEST',
  FREEZE: 'FAILURE_FREEZE',
  SWAP: 'FAILURE_SWAP',
} as const

export type AppActions =
  | InvestActionTypes
  | Invest02ActionTypes
  | PoolActionTypes
  | UserActionTypes
  | BankActionTypes
  | WalletActionTypes
  | PoolActionTypes
  | SnackActionTypes
  | SwapActionTypes
  | CallHistoryMethodAction

export interface DefaultListState {
  address: string
  '97': { [key: string]: number }
  '56': { [key: string]: number }
}

export type AppState = {
  list: DefaultListState
  bank: DefaultBankState
  router: RouterState
  account: DefaultUserState
  wallet: DefaultWalletState
  invest: DefaultInvestState
  invest02: DefaultInvest02State
  swap: DefaultSwapState
  pool: DefaultPoolState
}
