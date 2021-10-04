import { Dispatch } from 'redux'
import { errorHandler, warningHandler, successHandler } from '../_helpers/alert'
import { invest02Contract, provider, tokenContract } from './wallet.actions'
import {
  INVEST02_TRANSACTION_MINED,
  INVEST02_METHOD_REQUEST,
  INVEST02_METHOD_FAILURE,
  INVEST02_METHOD_SUCCESS,
  INVEST02_ACCOUNT_REQUEST,
  INVEST02_ACCOUNT_FAILURE,
  INVEST02_ACCOUNT_SUCCESS,
  INVEST02_MESSAGES,
  INVEST02_TRANSACTION_READY,
} from '../_types/invest02.types'
import { formaterNumber, bytesFormater } from '../_helpers/api'
import { AppActions, AppState } from '../_types'
import { constants, Transaction, utils } from 'ethers'
import info from '../_contracts/info'
import { accountTokenBalances } from './account.actions'

export const removeError = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({ type: INVEST02_MESSAGES, payload: { error: '' } })

export const requestInvest02 = (method: any, args: any) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: INVEST02_METHOD_REQUEST, payload: { method } })
  // @ts-ignore
  invest02Contract.functions[method](...args)
    .then((transaction: Transaction) => {
      if (transaction.hash) {
        dispatch({
          type: INVEST02_METHOD_SUCCESS,
          payload: { transaction },
        })
        warningHandler('Transaction Pending', null, transaction.hash)
        provider.once(transaction.hash, () => {
          dispatch({
            type: INVEST02_TRANSACTION_MINED,
          })
          setTimeout(() => {
            dispatch({
              type: INVEST02_TRANSACTION_READY,
            })
          }, 5000)
          successHandler('Transaction Confirmed', null, transaction.hash)
          dispatch(invest02Information() as any)
          dispatch(accountTokenBalances(['BTCB', 'STT', 'STTS']) as any)
        })
      }
    })
    .catch((err) => {
      dispatch({ type: INVEST02_METHOD_FAILURE, payload: err })
      errorHandler(err)
    })
}

export type TokenSymbol = 'STTS' | 'BTCB' | 'BNB'

export const investment02Deposit = (token: string, value: number) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const referrer = getState().router.location.query.ref
  let allowance

  const account: any = await readInvest02('users', ['referrer'], [address])

  if (token !== 'BNB')
    allowance = await tokenContract[token].allowance(address, info[chainId].STT)

  const requestDeposit = async () => {
    const strValue = (value * 10 ** info.decimals[token]).toFixed().toString()
    console.log(account.referrer)
    if (account.referrer !== info.addressZero) {
      if (token === 'STTS')
        dispatch(
          requestInvest02('updateStts', [
            (Number(strValue) - 100000).toString(),
          ]) as any
        )
      else if (token === 'BTCB')
        dispatch(requestInvest02('updateBtcb', [strValue]) as any)
      else if (token === 'BNB')
        dispatch(requestInvest02('updateBnb', [{ value: strValue }]) as any)
    } else {
      let isRef = utils.isAddress(referrer)
      if (isRef) {
        if (token === 'STTS')
          dispatch(
            requestInvest02('investStts', [
              referrer,
              (Number(strValue) - 100000).toString(),
            ]) as any
          )
        else if (token === 'BTCB') {
          dispatch(requestInvest02('investBtcb', [referrer, strValue]) as any)
        } else if (token === 'BNB')
          dispatch(
            requestInvest02('investBnb', [referrer, { value: strValue }]) as any
          )
      } else {
        const error = 'No valid referrer found!'
        dispatch({ type: INVEST02_MESSAGES, payload: { error } })
        errorHandler(error)
      }
    }
  }

  if (token !== 'BNB' && bytesFormater(allowance) === 0) {
    dispatch({ type: INVEST02_METHOD_REQUEST, payload: { method: 'approve' } })

    tokenContract[token]
      .approve(info[chainId].STT, constants.MaxUint256)
      .then((transaction) => {
        provider.once(transaction.hash, (_) => {
          requestDeposit()
        })
      })
      .catch((err) => {
        dispatch({ type: INVEST02_METHOD_FAILURE, payload: err })
        errorHandler(err)
      })
  } else requestDeposit()
}

export const withdrawInterest = (address?: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  dispatch(requestInvest02('withdrawInterest', []) as any)
}

export const invest02Information = (address?: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  if (!address) address = getState().account.address
  console.log(address)
  dispatch({ type: INVEST02_ACCOUNT_REQUEST })
  const maxPercent = await invest02Contract.maxPercent()
  const accountInfo: any = await readInvest02(
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
        tokens: ['totalAmount', 'refPercent', 'latestWithdraw'],
        args: [address],
      },
    ]

    Promise.all(
      items.map((item) => readInvest02Items(item.name, item.tokens, item.args))
    )
      .then((data: any) => {
        const account: any = {}
        data.forEach((its) =>
          its.map((info) => (account[info.item] = info.balance))
        )
        if (account.deposits > 0) {
          const deps = Array.from(Array(account.deposits))
          Promise.all(
            deps.map((_, i) =>
              readInvest02Items(
                'userDepositDetails',
                ['period', 'reward', 'endTime'],
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
              type: INVEST02_ACCOUNT_SUCCESS,
              payload: {
                account,
                maxPercent: bytesFormater(maxPercent),
              },
            })
          })
        }
      })
      .catch((err) => {
        errorHandler(err)
        dispatch({
          type: INVEST02_ACCOUNT_FAILURE,
          payload: { error: err, maxPercent: bytesFormater(maxPercent) },
        })
      })
  } else {
    dispatch({
      type: INVEST02_ACCOUNT_FAILURE,
      payload: { error: '', maxPercent: bytesFormater(maxPercent) },
    })
  }
}

export const readInvest02Items = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    invest02Contract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) =>
          items.length > 1 || item === 'totalAmount'
            ? array.push({ item, balance: formaterNumber(res[item], item) })
            : array.push({ item, balance: bytesFormater(res) })
        )
        resolve(array)
      })
      .catch((err) => reject(err))
  )

export const readInvest02 = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    invest02Contract[method](...args)
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
