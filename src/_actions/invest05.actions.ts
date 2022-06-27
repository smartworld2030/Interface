import { Dispatch } from 'redux'
import { errorHandler, warningHandler, successHandler } from '../_helpers/alert'
import { invest05Contract, provider } from './wallet.actions'
import {
  INVEST05_TRANSACTION_MINED,
  INVEST05_METHOD_REQUEST,
  INVEST05_METHOD_FAILURE,
  INVEST05_METHOD_SUCCESS,
  INVEST05_ACCOUNT_REQUEST,
  INVEST05_ACCOUNT_FAILURE,
  INVEST05_ACCOUNT_SUCCESS,
  INVEST05_MESSAGES,
  INVEST05_TRANSACTION_READY,
} from '../_types/invest05.types'
import { formaterNumber, bytesFormater } from '../_helpers/api'
import { AppActions, AppState } from '../_types'
import { Transaction } from 'ethers'
import info from '../_contracts/info'
import { accountTokenBalances } from './account.actions'
import { parseEther, isAddress } from 'ethers/lib/utils'

export const removeError = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({ type: INVEST05_MESSAGES, payload: { error: '' } })

export const requestInvest05 =
  (method: any, args: any) => (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: INVEST05_METHOD_REQUEST, payload: { method } })
    // @ts-ignore
    invest05Contract.functions[method](...args)
      .then((transaction: Transaction) => {
        if (transaction.hash) {
          dispatch({
            type: INVEST05_METHOD_SUCCESS,
            payload: { transaction },
          })
          warningHandler('Transaction Pending', null, transaction.hash)
          provider.once(transaction.hash, (e) => {
            dispatch({
              type: INVEST05_TRANSACTION_MINED,
            })
            setTimeout(() => {
              dispatch({
                type: INVEST05_TRANSACTION_READY,
              })
            }, 5000)
            successHandler('Transaction Confirmed', null, transaction.hash)
            dispatch(invest05Information() as any)
            dispatch(accountTokenBalances(['BTCB', 'STT', 'STTS']) as any)
          })
        }
      })
      .catch((err) => {
        dispatch({ type: INVEST05_METHOD_FAILURE, payload: err })
        errorHandler(err)
      })
  }

export type TokenSymbol = 'STTS' | 'BTCB' | 'BNB'

export const investment05Deposit =
  (v: string) =>
  async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const referrer = getState().router.location.query.ref

    const value = parseEther(v)
    let ref = isAddress(referrer) ? referrer : info.addressZero
    dispatch(requestInvest05('invest', [ref, { value }]) as any)
  }

export const migrateByUser = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(requestInvest05('migrateByUser', []) as any)
}

export const migrateAndWithdraw =
  () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(requestInvest05('migrateAndWithdrawInterest', []) as any)
  }

export const withdrawInterest =
  () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(requestInvest05('withdrawInterest', []) as any)
  }

export const invest05Information =
  (address?: string) =>
  async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    if (!address) address = getState().account.address
    dispatch({ type: INVEST05_ACCOUNT_REQUEST })

    const items = [
      {
        name: 'FEE',
        tokens: 'fee',
        args: [],
        decimal: 3,
      },
      {
        name: 'MINIMUM_INVEST',
        tokens: 'minimum',
        args: [],
        decimal: 8,
      },

      {
        name: 'MAXIMUM_INVEST',
        tokens: 'maximum',
        args: [],
        decimal: 8,
      },
      {
        name: 'REFERRAL_PERCENT',
        tokens: 'maxPercent',
        args: [],
        decimal: 3,
      },
      {
        name: 'BNBPrice',
        tokens: 'bnbPrice',
        args: [],
        decimal: 8,
      },
    ]

    const defaultData = await Promise.all(
      items.map(({ name, tokens, args, decimal }) =>
        readInvest05Items(name, tokens, args, decimal)
      )
    ).then((data: any[]) =>
      data.reduce((prev, items) => ({ ...prev, ...items }), {})
    )

    const accountInfo: any = await readInvest05(
      'users',
      ['totalAmount'],
      [address]
    )

    if (accountInfo.totalAmount > 0) {
      const items = [
        {
          name: 'calculateInterest',
          tokens: ['hourly', 'referral'],
          args: [address],
        },
        {
          name: 'userDepositNumber',
          tokens: ['deposits'],
          args: [address],
        },
        {
          name: 'users',
          tokens: ['totalAmount', 'latestWithdraw'],
          args: [address],
        },
        {
          name: 'blacklist',
          tokens: ['isBlocked'],
          args: [address],
        },
      ]
      Promise.all(
        items.map((item) =>
          readInvest05Items(item.name, item.tokens, item.args)
        )
      )
        .then((data: any) => {
          const account: any = {}
          data.forEach((its) =>
            its.map((info) => {
              return (account[info.item] = info.balance)
            })
          )
          if (account.deposits > 0) {
            const deps = Array.from(Array(account.deposits))
            Promise.all(
              deps.map((_, i) =>
                readInvest05Items(
                  'userDepositDetails',
                  ['reward', 'endTime', 'amount', 'startTime'],
                  [address, i]
                )
              )
            ).then((deposits: any) => {
              account.depositDetails = []
              deposits.forEach((item, i) =>
                item.map(
                  (info) =>
                    (account.depositDetails[i] = {
                      ...account.depositDetails[i],
                      [info.item]: info.balance,
                    })
                )
              )
              dispatch({
                type: INVEST05_ACCOUNT_SUCCESS,
                payload: {
                  account,
                  ...defaultData,
                },
              })
            })
          }
        })
        .catch((err) => {
          errorHandler(err)
          dispatch({
            type: INVEST05_ACCOUNT_FAILURE,
            payload: {
              error: err,
              ...defaultData,
            },
          })
        })
    } else {
      dispatch({
        type: INVEST05_ACCOUNT_FAILURE,
        payload: {
          error: '',
          ...defaultData,
        },
      })
    }
  }

export const readInvest05Items = async (
  method: any,
  items: string[] | string,
  args: any,
  decimal?: number
) =>
  new Promise((resolve, reject) =>
    invest05Contract[method](...args)
      .then((res) => {
        const array: any[] = []
        if (typeof items === 'string') {
          resolve({ [items]: formaterNumber(res, decimal) })
        } else {
          items.map((item: string) =>
            items.length > 1 || item === 'totalAmount'
              ? array.push({ item, balance: formaterNumber(res[item], item) })
              : array.push({
                  item,
                  balance: item === 'isBlocked' ? res : bytesFormater(res),
                })
          )
          resolve(array)
        }
      })
      .catch((err) => reject(err))
  )

export const readInvest05 = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    invest05Contract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) => {
          return item === 'referrer'
            ? (array[item] = res[item])
            : items.length > 1
            ? (array[item] = formaterNumber(res[item], item))
            : (array[item] = bytesFormater(res[item]))
        })
        resolve(array)
      })
      .catch((err) => reject(err))
  )
