import { CallHistoryMethodAction, RouterState } from 'connected-react-router'
import { DefaultUserState, UserActionTypes } from './account.types'
import { BankActionTypes, DefaultBankState } from './bank.types'
import { DefaultInvestState, InvestActionTypes } from './invest.types'
import { DefaultInvest02State, Invest02ActionTypes } from './invest02.types'
import { DefaultLandState, LandActionTypes } from './land.types'
import { DefaultPoolState, PoolActionTypes } from './pool.types'
import { SnackActionTypes } from './snackbar.types'
import { DefaultStockState, StockActionTypes } from './stock.types'
import { DefaultSwapState, SwapActionTypes } from './swap.types'
import { DefaultWalletState, WalletActionTypes } from './wallet.types'

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
  | LandActionTypes
  | InvestActionTypes
  | Invest02ActionTypes
  | PoolActionTypes
  | UserActionTypes
  | BankActionTypes
  | StockActionTypes
  | WalletActionTypes
  | PoolActionTypes
  | SnackActionTypes
  | SwapActionTypes
  | CallHistoryMethodAction

export type AppState = {
  land: DefaultLandState
  bank: DefaultBankState
  router: RouterState
  account: DefaultUserState
  wallet: DefaultWalletState
  invest: DefaultInvestState
  invest02: DefaultInvest02State
  stock: DefaultStockState
  swap: DefaultSwapState
  pool: DefaultPoolState
}
