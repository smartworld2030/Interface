import { Dispatch } from 'react'
import { supportedChain } from '../_helpers/constants'
import { AppActions, AppState } from '../_types'
import { errorHandler } from '../_helpers/alert'
import { formater } from '../_helpers/api'
import {
  BANK_TOKEN_BALANCE_REQUEST,
  BANK_TOKEN_BALANCE_SUCCESS,
  BANK_TOKEN_BALANCE_FAILURE,
  BANK_SATOSHI_BALANCE_REQUEST,
  BANK_SATOSHI_BALANCE_SUCCESS,
  BANK_SATOSHI_BALANCE_FAILURE,
  STT_PRICE_FAILURE,
  STT_PRICE_REQUEST,
  STT_PRICE_SUCCESS,
  TOKEN_PRICE_REQUEST,
  TOKEN_PRICE_SUCCESS,
  TOKEN_PRICE_FAILURE,
} from '../_types/bank.types'
import { ContractNames } from '../_types/wallet.types'
import { bankContract, investContract, tokenContract } from './wallet.actions'
import { ISmartWorld, SmartWorldMethod } from '../_types/ISmartWorld'
import { SmartInvestMethod } from '../_types/SmartInvest'
import { TokenBalances } from '../_types/account.types'

export const requestBank = async (
  method: SmartWorldMethod,
  args: any = null
): Promise<any> =>
  new Promise((resolve, reject) => {
    bankContract[method](args)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

export const bankTokenBalances = (tokens: ContractNames[]) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const address = getState().bank.address
  const chainId = getState().wallet.chainId

  dispatch({ type: BANK_TOKEN_BALANCE_REQUEST })
  Promise.all(
    tokens.map(
      (token) =>
        new Promise((resolve) =>
          tokenContract[token]
            .balanceOf(address[chainId])
            .then((res) => resolve({ token, balance: formater(res, token) }))
        )
    )
  )
    .then((data: any) => {
      console.log(data)
      dispatch({
        type: BANK_TOKEN_BALANCE_SUCCESS,
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
    .catch((err) => errorHandler(err, BANK_TOKEN_BALANCE_FAILURE))
}

export const bankTotalSatoshi = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: BANK_SATOSHI_BALANCE_REQUEST })
  requestBank('totalSatoshi')
    .then((res) => {
      const data = {} as TokenBalances
      Object.keys(res).map((key) => {
        if (key.length > 1) data[key] = formater(res[key])
      })
      dispatch({
        type: BANK_SATOSHI_BALANCE_SUCCESS,
        payload: { satoshi: data },
      })
    })
    .catch((err) => errorHandler(err, BANK_SATOSHI_BALANCE_FAILURE))
}

export const sttPrice = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: STT_PRICE_REQUEST })
  requestBank('sttPrice')
    .then((res) => {
      dispatch({
        type: STT_PRICE_SUCCESS,
        payload: formater(res),
      })
    })
    .catch((err) => errorHandler(err, STT_PRICE_FAILURE))
}

export const tokenPrice = (tokens: ['btc', 'bnb', 'stts']) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: TOKEN_PRICE_REQUEST })
  // Promise.all(
  tokens.map(
    (token) =>
      // new Promise((resolve) =>
      requestBank(`${token}ToSatoshi`)
        .then(
          (res) => console.log(res)
          // resolve({ token, price: formater(res, token) })
          // )
        )
        .then((data: any) => {
          console.log(data)
          // dispatch({
          //   type: TOKEN_PRICE_SUCCESS,
          //   payload: {
          //     tokens: data.reduce(
          //       (items, item) => ({
          //         ...items,
          //         [item.token]: item.balance,
          //       }),
          //       {}
          //     ),
          //   },
          // })
        })
        .catch((err) => errorHandler(err, TOKEN_PRICE_FAILURE))

    // tokens.forEach((token) => {
    //   requestBank(`${token}ToSatoshi`)
    //     .then((res) => {
    //       dispatch({
    //         type: TOKEN_PRICE_SUCCESS,
    //         payload: formater(res),
    //       })
    //     })
    //     .catch((err) => errorHandler(err, TOKEN_PRICE_FAILURE))
    // })
  )
  // )
}

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
