export const ACCOUNT_BALANCE_REQUEST = 'ACCOUNT_BALANCE_REQUEST'
export const ACCOUNT_BALANCE_SUCCESS = 'ACCOUNT_BALANCE_SUCCESS'
export const ACCOUNT_BALANCE_FAILURE = 'ACCOUNT_BALANCE_FAILURE'

export const ACCOUNT_SATOSHI_BALANCE_REQUEST = 'ACCOUNT_SATOSHI_BALANCE_REQUEST'
export const ACCOUNT_SATOSHI_BALANCE_SUCCESS = 'ACCOUNT_SATOSHI_BALANCE_SUCCESS'
export const ACCOUNT_SATOSHI_BALANCE_FAILURE = 'ACCOUNT_SATOSHI_BALANCE_FAILURE'

export const ACCOUNT_LOGGEDIN = 'ACCOUNT_LOGGEDIN'
export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT'

export const LOST_REQUEST = 'ACCOUNT_LOST_REQUEST'
export const LOST_SUCCESS = 'ACCOUNT_LOST_SUCCESS'
export const LOST_FAILURE = 'ACCOUNT_LOST_FAILURE'

export const CHANGE_THEME = 'CHANGE_THEME'

export interface DefaultUserState {
  loggedIn: boolean
  loading: boolean
  address: string
  tokens: TokenBalances
  error?: string
  theme: 'light' | 'dark'
}

export type TokenBalances = {
  STT: number
  STTS: number
  BTCB: number
  BUSD: number
  BNB: number
  LPTOKEN: number
}

export interface AccountBalanceRequestAction {
  type: typeof ACCOUNT_BALANCE_REQUEST
}
export interface AccountBalanceSuccessAction {
  type: typeof ACCOUNT_BALANCE_SUCCESS
  payload: { tokens: TokenBalances; error?: string }
}

export interface AccountBalanceFailureAction {
  type: typeof ACCOUNT_BALANCE_FAILURE
  payload: { error: string }
}

export interface LoginAction {
  type: typeof ACCOUNT_LOGGEDIN
  payload: { address: string }
}
export interface LogoutAction {
  type: typeof ACCOUNT_LOGOUT
}

export interface LostRequestAction {
  type: typeof LOST_REQUEST
}
export interface LostSuccessAction {
  type: typeof LOST_SUCCESS
  message: string
}
export interface LostFailureAction {
  type: typeof LOST_FAILURE
  payload: { error: string }
}

export interface ChangeThemeAction {
  type: typeof CHANGE_THEME
  theme: 'light' | 'dark'
}

export type UserActionTypes =
  | AccountBalanceRequestAction
  | AccountBalanceSuccessAction
  | AccountBalanceFailureAction
  | LostRequestAction
  | LostSuccessAction
  | LostFailureAction
  | LogoutAction
  | LoginAction
  | ChangeThemeAction
