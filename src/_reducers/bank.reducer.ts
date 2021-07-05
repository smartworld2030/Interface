import {
  BankActionTypes,
  DefaultBankState,
  TOKEN_PRICE_FAILURE,
  TOKEN_PRICE_REQUEST,
  TOKEN_PRICE_SUCCESS,
  BANK_TOKEN_BALANCE_REQUEST,
  BANK_TOKEN_BALANCE_SUCCESS,
  BANK_TOKEN_BALANCE_FAILURE,
  BANK_SATOSHI_BALANCE_REQUEST,
  BANK_SATOSHI_BALANCE_SUCCESS,
  BANK_SATOSHI_BALANCE_FAILURE,
} from '../_types/bank.types'

const initialState: DefaultBankState = {
  loading: false,
  tokens: { BTCB: '0.0', STT: '0.0', STTS: '0.0', BNB: '0.0' },
  address: {
    56: '0xbBe476b50D857BF41bBd1EB02F777cb9084C1564',
    97: '0x6DFcd84CD2DF9fC3663056c3CbE9F6b5C2Ca6855',
  },
}

export function bankReducer(
  state = initialState,
  action: BankActionTypes
): DefaultBankState {
  switch (action.type) {
    case BANK_TOKEN_BALANCE_REQUEST:
      return { ...state, loading: true }
    case BANK_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        tokens: { ...state.tokens, ...action.payload.tokens },
      }
    case BANK_TOKEN_BALANCE_FAILURE:
      return { ...state, loading: false }
    case BANK_SATOSHI_BALANCE_REQUEST:
      return { ...state, loading: true }
    case BANK_SATOSHI_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        satoshi: { ...state.satoshi, ...action.payload.satoshi },
      }
    case BANK_SATOSHI_BALANCE_FAILURE:
      return { ...state, loading: false }
    case TOKEN_PRICE_REQUEST:
      return { ...state, loading: true }
    case TOKEN_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        // satoshi: { ...state.satoshi, ...action.payload },
      }
    case TOKEN_PRICE_FAILURE:
      return { ...state, loading: false }
    default:
      return state
  }
}
