import {
  WALLET_FAILURE,
  WALLET_REQUEST,
  WALLET_ACTIVATED,
  WalletActionTypes,
  DefaultWalletState,
  ADDRESS_CHANGE_REQUEST,
  ADDRESS_CHANGE_SUCCESS,
  ADDRESS_CHANGE_FAILURE,
  CHAIN_CHANGE_SUCCESS,
  ONBOARDING_REQUEST,
} from '../_types/wallet.types'

const initialState: DefaultWalletState = {
  error: 'available',
  chainId: 1,
  active: false,
  loading: false,
}

export function walletReducer(
  state = initialState,
  action: WalletActionTypes
): DefaultWalletState {
  switch (action.type) {
    case WALLET_REQUEST:
      return { ...state, loading: true }
    case ONBOARDING_REQUEST:
      return { ...state, loading: true }
    case WALLET_ACTIVATED:
      return {
        ...state,
        active: true,
        loading: false,
        ...action.payload,
      }
    case WALLET_FAILURE:
      return {
        ...state,
        active: false,
        loading: false,
        error: action.error,
      }
    case CHAIN_CHANGE_SUCCESS:
      return {
        ...state,
        chainId: action.payload.chainId,
      }
    case ADDRESS_CHANGE_REQUEST:
      return { ...state, loading: true }
    case ADDRESS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        active: true,
        address: action.payload.address,
      }
    case ADDRESS_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
