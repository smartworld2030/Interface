import { Dispatch } from 'redux'
import { constants, Transaction, utils } from 'ethers'
import { errorHandler, warningHandler, successHandler } from '../_helpers/alert'
import { poolContract, provider, tokenContract } from './wallet.actions'
import {
  POOL_TRANSACTION_MINED,
  POOL_METHOD_REQUEST,
  POOL_METHOD_FAILURE,
  POOL_METHOD_SUCCESS,
  POOL_ACCOUNT_REQUEST,
  POOL_ACCOUNT_FAILURE,
  POOL_ACCOUNT_SUCCESS,
  POOL_MESSAGES,
  POOL_TRANSACTION_READY,
} from '../_types/pool.types'
import { formaterNumber, bytesFormater } from '../_helpers/api'
import { AppActions, AppState } from '../_types'
import info from '../_contracts/info'
import { accountTokenBalances } from './account.actions'

export const removeError = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({ type: POOL_MESSAGES, payload: { error: '' } })

export const requestPool = (method: any, args: any) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: POOL_METHOD_REQUEST, payload: { method } })
  // @ts-ignore
  poolContract.functions[method](...args)
    .then((transaction: Transaction) => {
      if (transaction.hash) {
        console.log(transaction)
        dispatch({
          type: POOL_METHOD_SUCCESS,
          payload: { transaction },
        })
        warningHandler('Transaction Pending', null, transaction.hash)
        provider.once(transaction.hash, () => {
          dispatch({
            type: POOL_TRANSACTION_MINED,
          })
          setTimeout(() => {
            dispatch({
              type: POOL_TRANSACTION_READY,
            })
          }, 5000)
          successHandler('Transaction Confirmed', null, transaction.hash)
          dispatch(poolInformation() as any)
          dispatch(accountTokenBalances(['BTCB', 'STT', 'STTS']) as any)
        })
      }
    })
    .catch((err) => {
      dispatch({ type: POOL_METHOD_FAILURE, payload: err })
      errorHandler(err)
    })
}

export type TokenSymbol = 'STTS' | 'BTCB' | 'BNB'
export interface DepositArgs {
  amountSTTSMin: string
  amountBNBMin: string
  deadline: string
  value: number
}

export const poolDeposit = (token: string, args: DepositArgs) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const referrer = getState().router.location.query.ref

  const accountInfo: any = await readPool('users', ['referrer'], [address])

  const allowance = await tokenContract.STTS.allowance(
    address,
    info[chainId].POOL
  )

  const requestDeposit = async () => {
    const { value, amountSTTSMin, amountBNBMin, deadline } = args
    const strValue = (value * 10 ** info.decimals[token]).toFixed().toString()

    if (utils.isAddress(accountInfo.referrer)) {
      dispatch(
        requestPool('updateFreeze', [
          amountSTTSMin,
          amountBNBMin,
          deadline,
          { value: strValue },
        ]) as any
      )
    } else {
      let isRef = utils.isAddress(referrer)
      if (isRef) {
        dispatch(
          requestPool('freeze', [
            referrer,
            amountSTTSMin,
            amountBNBMin,
            deadline,
            { value: strValue },
          ]) as any
        )
      } else {
        const error = 'No valid referrer found!'
        dispatch({ type: POOL_MESSAGES, payload: { error } })
        errorHandler(error)
      }
    }
  }

  if (bytesFormater(allowance) === 0) {
    dispatch({ type: POOL_METHOD_REQUEST, payload: { method: 'approve' } })

    tokenContract.STTS.approve(info[chainId].POOL, constants.MaxUint256)
      .then((transaction) => {
        provider.once(transaction.hash, (_) => {
          requestDeposit()
        })
      })
      .catch((err) => {
        dispatch({ type: POOL_METHOD_FAILURE, payload: err })
        errorHandler(err)
      })
  } else requestDeposit()
}

export const withdrawInterest = () => async (
  dispatch: Dispatch<AppActions>
) => {
  dispatch(requestPool('withdrawInterest', []) as any)
}

export const poolInformation = (address?: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  if (!address) address = getState().account.address
  dispatch({ type: POOL_ACCOUNT_REQUEST })
  const maxStts = await poolContract?.maxStts()
  const accountInfo: any = await readPool('users', ['referrer'], [address])
  if (utils.isAddress(accountInfo.referrer)) {
    const items = [
      {
        name: 'calculateInterest',
        tokens: ['daily', 'referral'],
        args: [address],
      },
      {
        name: 'userExpireTime',
        tokens: ['expires'],
        args: [address],
      },
      {
        name: 'userPriceInfo',
        tokens: ['stts', 'bnb'],
        args: [address, 0],
      },
      {
        name: 'users',
        tokens: ['referrer', 'totalStts', 'latestWithdraw'],
        args: [address],
      },
    ]

    Promise.all(
      items.map((item) => readPoolItems(item.name, item.tokens, item.args))
    )
      .then((data: any) => {
        const account: any = {}
        data.forEach((its) =>
          its.map((info) => (account[info.item] = info.balance))
        )
        if (account.deposits > 0) {
          readPool('userDepositStartTime', ['deposit'], [address]).then(
            (deps: any) => {
              account.depositDetails = []
              deps.forEach(
                (item, i) =>
                  (account.depositDetails[i] = item.map((info) => ({
                    [info.item]: info.balance,
                  })))
              )
              dispatch({
                type: POOL_ACCOUNT_SUCCESS,
                payload: {
                  account,
                  maxStts: bytesFormater(maxStts),
                },
              })
            }
          )
        }
      })
      .catch((err) => {
        errorHandler(err)
        dispatch({
          type: POOL_ACCOUNT_FAILURE,
          payload: { error: err, maxStts: bytesFormater(maxStts) },
        })
      })
  } else {
    dispatch({
      type: POOL_ACCOUNT_FAILURE,
      payload: { error: '', maxStts: bytesFormater(maxStts) },
    })
  }
}

export const readPoolItems = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    poolContract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) =>
          items.length > 1
            ? array.push({ item, balance: formaterNumber(res[item], item) })
            : array.push({ item, balance: bytesFormater(res) })
        )
        resolve(array)
      })
      .catch((err) => reject(err))
  )

export const readPool = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    poolContract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) =>
          items.length > 1
            ? (array[item] = formaterNumber(res[item], item))
            : (array[item] = bytesFormater(res[item]))
        )
        resolve(array)
      })
      .catch((err) => reject(err))
  )
