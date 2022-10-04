import {
  BankActionTypes,
  BANK_SATOSHI_BALANCE_FAILURE,
  BANK_SATOSHI_BALANCE_REQUEST,
  BANK_SATOSHI_BALANCE_SUCCESS,
  BANK_TOKEN_BALANCE_FAILURE,
  BANK_TOKEN_BALANCE_REQUEST,
  BANK_TOKEN_BALANCE_SUCCESS,
  DefaultBankState,
  TOKEN_PRICE_FAILURE,
  TOKEN_PRICE_REQUEST,
  TOKEN_PRICE_SUCCESS,
} from '../_types/bank.types'

const balances = { BTCB: 0, STT: 0, STTS: 0, BNB: 0 }
const prices = { BTCB: 0, STT: 0, STTS: 0, BNB: 0 }
const dollar = { BTC: 0 }

const initialState: DefaultBankState = {
  bankLoading: false,
  tokens: balances,
  totalSupply: 0,
  total: '',
  prices,
  dollar,
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
      return { ...state, bankLoading: true }
    case BANK_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        bankLoading: false,
        tokens: { ...balances, ...action.payload.tokens },
      }
    case BANK_TOKEN_BALANCE_FAILURE:
      return { ...state, bankLoading: false }
    case BANK_SATOSHI_BALANCE_REQUEST:
      return { ...state, bankLoading: true }
    case BANK_SATOSHI_BALANCE_SUCCESS:
      return {
        ...state,
        bankLoading: false,
        total: action.payload.total,
        satoshi: { ...state.satoshi, ...action.payload.satoshi },
      }
    case BANK_SATOSHI_BALANCE_FAILURE:
      return { ...state, bankLoading: false }
    case TOKEN_PRICE_REQUEST:
      return { ...state, bankLoading: true }
    case TOKEN_PRICE_SUCCESS:
      return {
        ...state,
        bankLoading: false,
        prices: { ...state.prices, ...action.payload.prices },
        dollar: { ...state.dollar, ...action.payload.dollar },
        tokens: { ...state.tokens, ...action.payload.tokens },
        totalSupply: action.payload.totalSupply,
      }
    case TOKEN_PRICE_FAILURE:
      return { ...state, bankLoading: false }
    default:
      return state
  }
}
