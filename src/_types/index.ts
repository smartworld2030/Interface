import { CallHistoryMethodAction, RouterState } from 'connected-react-router'
import { DefaultUserState, UserActionTypes } from './account.types'
import { DefaultBankState, BankActionTypes } from './bank.types'
import { SnackActionTypes, DefaultSnackState } from './snackbar.types'
import { DefaultWalletState, WalletActionTypes } from './wallet.types'
import { InvestActionTypes } from './invest.types'
import { FreezeActionTypes } from './freeze.types'
import { SwapActionTypes } from './swap.types'

export const REQUEST = {
  INVEST: 'REQUEST_INVEST',
  FREEZE: 'REQUEST_FREEZE',
  SWAP: 'REQUEST_SWAP',
  INVEST_BANK: 'REQUEST_INVEST_BANK',
  FREEZE_BANK: 'REQUEST_FREEZE_BANK',
  SWAP_BANK: 'REQUEST_SWAP_BANK',
} as const
export const SUCCESS = {
  INVEST: 'SUCCESS_INVEST',
  FREEZE: 'SUCCESS_FREEZE',
  SWAP: 'SUCCESS_SWAP',
  INVEST_BANK: 'SUCCESS_INVEST_BANK',
  FREEZE_BANK: 'SUCCESS_FREEZE_BANK',
  SWAP_BANK: 'SUCCESS_SWAP_BANK',
} as const
export const FAILURE = {
  INVEST: 'FAILURE_INVEST',
  FREEZE: 'FAILURE_FREEZE',
  SWAP: 'FAILURE_SWAP',
  INVEST_BANK: 'FAILURE_INVEST_BANK',
  FREEZE_BANK: 'FAILURE_FREEZE_BANK',
  SWAP_BANK: 'FAILURE_SWAP_BANK',
} as const
export const SAVE = {
  INVEST_BANK: 'SAVE_INVEST_BANK',
  FREEZE_BANK: 'SAVE_FREEZE_BANK',
  SWAP_BANK: 'SAVE_SWAP_BANK',
} as const

export const investBank = {
  request: REQUEST.INVEST_BANK,
  success: SUCCESS.INVEST_BANK,
  failure: FAILURE.INVEST_BANK,
}

export const freezeBank = {
  request: REQUEST.FREEZE_BANK,
  success: SUCCESS.FREEZE_BANK,
  failure: FAILURE.FREEZE_BANK,
}

export const swapBank = {
  request: REQUEST.SWAP_BANK,
  success: SUCCESS.SWAP_BANK,
  failure: FAILURE.SWAP_BANK,
}

export const BankPages = {
  investBank,
  freezeBank,
  swapBank,
}

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
  snackbar: DefaultSnackState
}
