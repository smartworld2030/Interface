import {
  WALLET_FAILURE,
  WALLET_REQUEST,
  WALLET_ACTIVATED,
  WalletActionTypes,
  DefaultWalletState,
  ADDRESS_CHANGE_REQUEST,
  ADDRESS_CHANGE_SUCCESS,
  ADDRESS_CHANGE_FAILURE,
  CHAIN_CHANGE_FAILURE,
  CHAIN_CHANGE_SUCCESS,
  ONBOARDING_REQUEST,
  WALLET_WAITING_MESSAGE,
} from '../_types/wallet.types'

const initialState: DefaultWalletState = {
  error: { msg: '', code: 0 },
  chainId: 1,
  active: false,
  waiting: false,
}

export function walletReducer(
  state = initialState,
  action: WalletActionTypes
): DefaultWalletState {
  switch (action.type) {
    case WALLET_REQUEST:
      return { ...state, waiting: true }
    case ONBOARDING_REQUEST:
      return { ...state, waiting: true, error: action.payload.error }
    case WALLET_ACTIVATED:
      return {
        ...state,
        active: true,
        waiting: false,
        ...action.payload,
      }
    case WALLET_FAILURE:
      return {
        ...state,
        active: false,
        waiting: false,
        error: action.error,
      }
    case CHAIN_CHANGE_SUCCESS:
      return {
        ...state,
        chainId: action.payload.chainId,
      }
    case ADDRESS_CHANGE_REQUEST:
      return { ...state, waiting: true }
    case ADDRESS_CHANGE_SUCCESS:
      return {
        ...state,
        waiting: false,
        active: true,
      }
    case WALLET_WAITING_MESSAGE:
      return {
        ...state,
        error: action.payload.error,
      }
    case ADDRESS_CHANGE_FAILURE:
      return {
        ...state,
        waiting: false,
        error: action.payload.error,
      }
    case CHAIN_CHANGE_FAILURE:
      return {
        ...state,
        waiting: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
