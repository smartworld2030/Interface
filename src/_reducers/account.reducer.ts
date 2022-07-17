import {
  ACCOUNT_LOGOUT,
  ACCOUNT_LOGGEDIN,
  CHANGE_THEME,
  UserActionTypes,
  DefaultUserState,
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_BALANCE_FAILURE,
} from '../_types/account.types'

const balances = { BTCB: 0, BUSD: 0, STT: 0, STTS: 0, BNB: 0, LPTOKEN: 0 }

const initialState: DefaultUserState = {
  loggedIn: false,
  loading: false,
  address: '',
  tokens: balances,
  theme: 'dark',
}

export function accountReducer(
  state = initialState,
  action: UserActionTypes
): DefaultUserState {
  switch (action.type) {
    case ACCOUNT_BALANCE_REQUEST:
      return { ...state, loading: true, error: '' }
    case ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        tokens: { ...balances, ...action.payload.tokens },
        error: action.payload.error,
      }
    case ACCOUNT_BALANCE_FAILURE:
      return { ...state, loading: false }

    case ACCOUNT_LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        address: action.payload.address,
      }
    case ACCOUNT_LOGOUT:
      return { ...state, loggedIn: false, loading: true }
    case CHANGE_THEME:
      localStorage.setItem('theme', action.theme)
      return { ...state, theme: action.theme }
    default:
      return state
  }
}
