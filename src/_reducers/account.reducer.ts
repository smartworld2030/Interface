import {
  ACCOUNT_LOGOUT,
  CHANGE_THEME,
  UserActionTypes,
  DefaultUserState,
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_BALANCE_FAILURE,
} from '../_types/account.types'

const initialState: DefaultUserState = {
  loggedIn: true,
  loading: false,
  tokens: { BTCB: '0.0', STT: '0.0', STTS: '0.0', BNB: '0.0' },
  theme: 'dark',
}

export function accountReducer(
  state = initialState,
  action: UserActionTypes
): DefaultUserState {
  switch (action.type) {
    case ACCOUNT_BALANCE_REQUEST:
      return { ...state, loggedIn: false, loading: true }
    case ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        tokens: { ...state.tokens, ...action.payload.tokens },
      }
    case ACCOUNT_BALANCE_FAILURE:
      return { ...state, loading: false }
    case ACCOUNT_LOGOUT:
      return { ...state, account: undefined, loggedIn: false, loading: false }
    case CHANGE_THEME:
      localStorage.setItem('theme', action.theme)
      return { ...state, theme: action.theme }
    default:
      return state
  }
}
