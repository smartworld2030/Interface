import { Dispatch } from 'react'
import { AppActions, AppState } from '../_types'
import { errorHandler } from '../_helpers/alert'
import { bytesFormater, formaterNumber, formatToString } from '../_helpers/api'
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
  SatoshiPrice,
} from '../_types/bank.types'
import { ContractNames } from '../_types/wallet.types'
import { bankContract, priceContract, tokenContract } from './wallet.actions'
import { TokenBalances } from '../_types/account.types'
import erc20 from '../_contracts/erc20'

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

export const bankTotalSatoshi = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: BANK_SATOSHI_BALANCE_REQUEST })
  requestBank('totalSatoshi')
    .then((res) => {
      const data = {} as TokenBalances
      Object.keys(res).forEach((key) => {
        if (key.length > 1) data[key] = formaterNumber(res[key])
      })
      const satoshi = Object.keys(data).reduce(
        (items, item) => items + data[item],
        0
      )
      const total = formatToString(satoshi)
      dispatch({
        type: BANK_SATOSHI_BALANCE_SUCCESS,
        payload: { satoshi: data, total },
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
        payload: formaterNumber(res),
      })
    })
    .catch((err) => errorHandler(err, STT_PRICE_FAILURE))
}

export const tokenPrices = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: TOKEN_PRICE_REQUEST })
  const tokens = ['BTC', 'BNB', 'STTS', 'STT']
  Promise.all(
    tokens.map((token) => {
      if (token === 'STT') {
        return new Promise((resolve) =>
          requestBank('sttPrice').then((res) =>
            resolve({ token, price: bytesFormater(res) })
          )
        )
      }
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
      dispatch({
        type: TOKEN_PRICE_SUCCESS,
        payload: {
          prices,
          dollar: { BTC },
        },
      })
    })
    .catch((err) => errorHandler(err, TOKEN_PRICE_FAILURE))
}
