import { Dispatch } from 'react'
import { supportedChain } from '../_helpers/constants'
import { AppActions, AppState } from '../_types'
import { errorHandler } from '../_helpers/alert'
import { formater } from '../_helpers/api'
import {
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_BALANCE_FAILURE,
  CHANGE_THEME,
  ACCOUNT_SATOSHI_BALANCE_REQUEST,
  ACCOUNT_SATOSHI_BALANCE_SUCCESS,
  ACCOUNT_SATOSHI_BALANCE_FAILURE,
  TokenBalances,
} from '../_types/account.types'
import { ContractNames } from '../_types/wallet.types'
import { bankContract, investContract, tokenContract } from './wallet.actions'
import { ISmartWorld, SmartWorldMethod } from '../_types/ISmartWorld'
import { SmartInvestMethod } from '../_types/SmartInvest'

export const accountTokenBalances = (tokens: ContractNames[]) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const { address } = getState().wallet

  dispatch({ type: ACCOUNT_BALANCE_REQUEST })
  Promise.all(
    tokens.map(
      (token) =>
        new Promise((resolve) =>
          tokenContract[token]
            .balanceOf(address)
            .then((res) => resolve({ token, balance: formater(res, token) }))
        )
    )
  )
    .then((data: any) => {
      dispatch({
        type: ACCOUNT_BALANCE_SUCCESS,
        payload: {
          tokens: data.reduce(
            (items, item) => ({
              ...items,
              [item.token]: item.balance,
            }),
            {}
          ),
        },
      })
    })
    .catch((err) => errorHandler(err, ACCOUNT_BALANCE_FAILURE))
}

export const requestBank = async (
  method: SmartWorldMethod,
  args: any = null
): Promise<any> =>
  new Promise((resolve, reject) => {
    bankContract[method](args)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

// export const requestInvest = (method: keyof SmartInvestMethod, args?: any) => (
//   dispatch: Dispatch<AppActions>,
//   getState: () => AppState
// ) => {
//   const { chainId, address } = getState().wallet

//   dispatch({ type: BALANCE_REQUEST })
//   if (investContract && supportedChain(chainId)) {
//     investContract['userExpireTime'](args)
//       .then((res) => {
//         console.log(formater(res.hourly, 'stt'))
//         // dispatch({
//         //   type: BALANCE_SUCCESS,
//         //   payload: { balance: { ['satoshi']: formater(res.satoshi, 'btcb') } },
//         // })
//       })
//       .catch((err) => errorHandler(err, BALANCE_FAILURE))
//   }
// }

export const changeTheme = (theme: 'light' | 'dark') => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: CHANGE_THEME, theme })
}
