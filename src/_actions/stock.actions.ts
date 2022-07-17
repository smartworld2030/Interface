import { constants, Transaction } from 'ethers'
import { Dispatch } from 'react'
import stock from '_contracts/stock'
import { warningHandler, successHandler, errorHandler } from '_helpers/alert'
import { bytesFormater, formaterNumber } from '_helpers/api'
import { AppActions, AppState } from '_types'
import {
  STOCK_INFO_FAILURE,
  STOCK_INFO_REQUEST,
  STOCK_INFO_SUCCESS,
  STOCK_METHOD_FAILURE,
  STOCK_METHOD_REQUEST,
  STOCK_METHOD_SUCCESS,
  STOCK_TRANSACTION_MINED,
  STOCK_TRANSACTION_READY,
} from '_types/stock.types'
import { accountTokenBalances } from './account.actions'
import { tokenContract, provider, stockContract } from './wallet.actions'

export const requestBuyStock =
  (method: string, value: number) =>
  async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch({ type: STOCK_METHOD_REQUEST, payload: { method } })
    const chainId = getState().wallet.chainId
    const address = getState().account.address
    console.log(value)

    const requester = () => {
      // @ts-ignore
      stockContract.functions[method](value)
        .then((transaction: Transaction) => {
          if (transaction.hash) {
            console.log(transaction)
            dispatch({
              type: STOCK_METHOD_SUCCESS,
              payload: { transaction },
            })
            warningHandler('Transaction Pending', null, transaction.hash)
            provider.once(transaction.hash, () => {
              dispatch({
                type: STOCK_TRANSACTION_MINED,
              })
              setTimeout(() => {
                dispatch({
                  type: STOCK_TRANSACTION_READY,
                })
              }, 5000)
              successHandler('Transaction Confirmed', null, transaction.hash)
              dispatch(accountTokenBalances(['BUSD', 'STC', 'STR']) as any)
            })
          }
        })
        .catch((err) => {
          dispatch({ type: STOCK_METHOD_FAILURE, payload: err })
          errorHandler(err)
        })
    }

    const allowance = await tokenContract.BUSD.allowance(
      address,
      stock.address[chainId]
    )

    if (bytesFormater(allowance) === 0) {
      dispatch({ type: STOCK_METHOD_REQUEST, payload: { method: 'approve' } })
      tokenContract.BUSD.approve(stock.address[chainId], constants.MaxUint256)
        .then((transaction) => {
          provider.once(transaction.hash, (_) => {
            requester()
          })
        })
        .catch((err) => {
          dispatch({ type: STOCK_METHOD_FAILURE, payload: err })
          errorHandler(err)
        })
    } else requester()
  }

export const stockInformation =
  (address?: string) =>
  async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    if (!address) address = getState().account.address
    dispatch({ type: STOCK_INFO_REQUEST })

    const items = [
      {
        name: 'remainingCarStock',
        tokens: ['remainingCarStock'],
        args: [],
      },
      {
        name: 'remainingRobotStock',
        tokens: ['remainingRobotStock'],
        args: [],
      },
      {
        name: 'strBalanceOf',
        tokens: ['STR'],
        args: [address],
      },
      {
        name: 'stcBalanceOf',
        tokens: ['STC'],
        args: [address],
      },
      {
        name: 'busdBalanceOf',
        tokens: ['BUSD'],
        args: [address],
      },
    ]

    Promise.all(
      items.map((item) => readstockItems(item.name, item.tokens, item.args))
    )
      .then((res: any) => {
        const data: any = {}
        res.forEach((its: any[]) =>
          its.map((info) => {
            return (data[info.item] = info.balance)
          })
        )
        dispatch({
          type: STOCK_INFO_SUCCESS,
          payload: {
            data,
          },
        })
      })
      .catch((err) => {
        errorHandler(err)
        dispatch({
          type: STOCK_INFO_FAILURE,
          payload: err,
        })
      })
  }

export const readstockItems = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    stockContract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) =>
          items.length > 1 || item === 'BUSD'
            ? array.push({ item, balance: formaterNumber(res, item) })
            : array.push({
                item,
                balance: bytesFormater(res),
              })
        )
        resolve(array)
      })
      .catch((err) => reject(err))
  )
