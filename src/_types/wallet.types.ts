import { Contract } from 'ethers'
import { ISmartWorld } from './ISmartWorld'
import { SmartInvest } from './SmartInvest'

export const ONBOARDING_REQUEST = 'ONBOARDING_REQUEST'
export const WALLET_WAITING_MESSAGE = 'WALLET_WAITING_MESSAGE'

export const WALLET_REQUEST = 'WALLET_REQUEST'
export const WALLET_ACTIVATED = 'WALLET_ACTIVATED'
export const WALLET_FAILURE = 'WALLET_FAILURE'

export const CHAIN_CHANGE_REQUEST = 'CHAIN_CHANGE_REQUEST'
export const CHAIN_CHANGE_SUCCESS = 'CHAIN_CHANGE_SUCCESS'
export const CHAIN_CHANGE_FAILURE = 'CHAIN_CHANGE_FAILURE'

export const ADDRESS_CHANGE_REQUEST = 'ADDRESS_CHANGE_REQUEST'
export const ADDRESS_CHANGE_SUCCESS = 'ADDRESS_CHANGE_SUCCESS'
export const ADDRESS_CHANGE_FAILURE = 'ADDRESS_CHANGE_FAILURE'

export type BankContract = ISmartWorld | Contract
export type InvestContract = SmartInvest | Contract
export type PriceContract = { latestAnswer: any } | Contract
export type SwapContract =
  | { sortTokens: any; getAmountsIn: any; getAmountsOut: any; WETH: any }
  | any
  | Contract

export interface DefaultWalletState {
  active: boolean
  waiting: boolean
  error: ErrorObject
  chainId: number
}

export interface ErrorObject {
  msg: string
  code: number
}

export interface RegisterRequestAction {
  type: typeof WALLET_REQUEST
}
export interface RegisterSuccessAction {
  type: typeof WALLET_ACTIVATED
  payload: {
    chainId: number
  }
}
export type ContractNames = 'STT' | 'STTS' | 'BTCB'

export type ContractObject = {
  [key in ContractNames]: Contract
}
export interface RegisterFailureAction {
  type: typeof WALLET_FAILURE
  error: ErrorObject
}

export interface ChainChangeRequestAction {
  type: typeof CHAIN_CHANGE_REQUEST
}
export interface ChainChangeSuccessAction {
  type: typeof CHAIN_CHANGE_SUCCESS
  payload: {
    chainId: number
  }
}
export interface ChainChangeFailureAction {
  type: typeof CHAIN_CHANGE_FAILURE
  payload: {
    error: ErrorObject
  }
}

export interface WalletWaitingAction {
  type: typeof WALLET_WAITING_MESSAGE
  payload: {
    error: ErrorObject
  }
}

export interface AccountChangeRequestAction {
  type: typeof ADDRESS_CHANGE_REQUEST
}

export interface AccountChangeSuccessAction {
  type: typeof ADDRESS_CHANGE_SUCCESS
}

export interface AccountChangeFailureAction {
  type: typeof ADDRESS_CHANGE_FAILURE
  payload: {
    error: ErrorObject
  }
}

export interface OnBoardingRequestAction {
  type: typeof ONBOARDING_REQUEST
  payload: {
    error: ErrorObject
  }
}

export type WalletActionTypes =
  | ChainChangeRequestAction
  | OnBoardingRequestAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | WalletWaitingAction
  | ChainChangeRequestAction
  | ChainChangeSuccessAction
  | ChainChangeFailureAction
  | AccountChangeRequestAction
  | AccountChangeSuccessAction
  | AccountChangeFailureAction
