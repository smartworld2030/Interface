import { Dispatch } from 'react'
import { AppActions, AppState } from '../_types'
import { errorHandler } from '../_helpers/alert'
import { formaterNumber } from '../_helpers/api'
import {
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_BALANCE_FAILURE,
  CHANGE_THEME,
} from '../_types/account.types'
import { ContractNames } from '../_types/wallet.types'
import { provider, tokenContract } from './wallet.actions'

export const accountTokenBalances = (
  tokens: ContractNames[],
  address?: string
) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  if (tokenContract) {
    const account = address ? address : getState().account.address
    dispatch({ type: ACCOUNT_BALANCE_REQUEST })
    Promise.all(
      tokens.map((token) =>
        new Promise((resolve) =>
          tokenContract[token]
            .balanceOf(account)
            .then((res) =>
              resolve({ token, balance: formaterNumber(res, token) })
            )
        ).catch((err) => console.log(err))
      )
    )
      .then((data: any) => {
        provider.getBalance(account).then((res) => {
          let error
          let balance = formaterNumber(res, 'BNB')
          if (Number(balance) <= 0.001) {
            error = 'You need BNB for transaction fee!'
          }
          if (balance > 0.01) balance = balance - 0.01
          data.push({ token: 'BNB', balance })
          const tokens = data.reduce(
            (items, item) => ({
              ...items,
              [item.token]: item.balance,
            }),
            {}
          )
          dispatch({
            type: ACCOUNT_BALANCE_SUCCESS,
            payload: {
              tokens,
              error,
            },
          })
        })
      })
      .catch((err) => errorHandler(err, ACCOUNT_BALANCE_FAILURE))
  }
}

export const changeTheme = (theme: 'light' | 'dark') => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: CHANGE_THEME, theme })
}
