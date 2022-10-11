import { Dispatch } from 'react'
import erc20 from '../_contracts/erc20'
import { errorHandler } from '../_helpers/alert'
import { formaterNumber } from '../_helpers/api'
import { AppActions, AppState } from '../_types'
import {
  BANK_TOKEN_BALANCE_FAILURE,
  BANK_TOKEN_BALANCE_REQUEST,
  BANK_TOKEN_BALANCE_SUCCESS,
  SatoshiPrice,
  STT_PRICE_FAILURE,
  STT_PRICE_REQUEST,
  STT_PRICE_SUCCESS,
  TOKEN_PRICE_FAILURE,
  TOKEN_PRICE_REQUEST,
  TOKEN_PRICE_SUCCESS,
} from '../_types/bank.types'
import { ContractNames } from '../_types/wallet.types'
import {
  bankContract,
  landContract,
  priceContract,
  tokenContract,
} from './wallet.actions'

export const requestBank = async (
  method: any,
  args: any = null
): Promise<any> =>
  new Promise((resolve, reject) => {
    bankContract[method](args)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

export const requestSatoshi = async (
  method: SatoshiPrice,
  args: any = null
): Promise<any> =>
  new Promise((resolve, reject) => {
    bankContract[method](args)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })

export const bankTokenBalances =
  (tokens: ContractNames[]) =>
  (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const address = getState().bank.address
    const chainId = getState().wallet.chainId

    dispatch({ type: BANK_TOKEN_BALANCE_REQUEST })
    Promise.all(
      tokens.map(
        (token) =>
          new Promise((resolve) =>
            tokenContract[token]
              .balanceOf(address[chainId])
              .then((res) =>
                resolve({ token, balance: formaterNumber(res, token) })
              )
          )
      )
    )
      .then((data: any) =>
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
      )
      .catch((err) => errorHandler(err, BANK_TOKEN_BALANCE_FAILURE))
  }

export const sttPrice = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: STT_PRICE_REQUEST })
  requestBank('sttPrice')
    .then((res) => {
      dispatch({
        type: STT_PRICE_SUCCESS,
        payload: formaterNumber(res),
      })
    })
    .catch((err) => errorHandler(err, STT_PRICE_FAILURE))
}

export const tokenPrices = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: TOKEN_PRICE_REQUEST })
  const tokens = ['BTC', 'BNB', 'STTS']

  Promise.all(
    tokens.map((token) => {
      const tokenName = token.toLowerCase() as 'btc' | 'bnb' | 'stts'
      const decimals = (10 ** erc20.decimals[token]).toString()
      return new Promise((resolve) =>
        requestSatoshi(`${tokenName}ToSatoshi`, decimals).then((res) =>
          resolve({ token, price: formaterNumber(res) })
        )
      )
    })
  )
    .then(async (data: any) => {
      const prices = data.reduce((items, item) => {
        if (item.token === 'BTC' || item.token === 'BTCB')
          return {
            ...items,
            BTC: item.price,
            BTCB: item.price,
          }
        else
          return {
            ...items,
            [item.token]: item.price,
          }
      }, {})

      const latestPrice = await priceContract.latestAnswer()
      const BTC = formaterNumber(latestPrice, 8)
      const totalSupply = (await landContract.totalSupply()).toNumber()

      dispatch({
        type: TOKEN_PRICE_SUCCESS,
        payload: {
          prices,
          dollar: { BTC },
          totalSupply,
        },
      })
    })
    .catch((err) => errorHandler(err, TOKEN_PRICE_FAILURE))
}
