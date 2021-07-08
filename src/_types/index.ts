import { CallHistoryMethodAction, RouterState } from 'connected-react-router'
import { DefaultUserState, UserActionTypes } from './account.types'
import { DefaultBankState, BankActionTypes } from './bank.types'
import { SnackActionTypes } from './snackbar.types'
import { DefaultWalletState, WalletActionTypes } from './wallet.types'
import { InvestActionTypes, DefaultInvestState } from './invest.types'
import { FreezeActionTypes, DefaultFreezeState } from './freeze.types'
import { SwapActionTypes, DefaultSwapState } from './swap.types'

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
  | UserActionTypes
  | BankActionTypes
  | WalletActionTypes
  | FreezeActionTypes
  | SnackActionTypes
  | SwapActionTypes
  | CallHistoryMethodAction

export type AppState = {
  bank: DefaultBankState
  router: RouterState
  account: DefaultUserState
  wallet: DefaultWalletState
  invest: DefaultInvestState
  freeze: DefaultFreezeState
  swap: DefaultSwapState
}
