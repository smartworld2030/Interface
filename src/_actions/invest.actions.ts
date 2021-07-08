import { Dispatch } from 'redux'
import { errorHandler, warningHandler, successHandler } from '../_helpers/alert'
import { investContract, provider, tokenContract } from './wallet.actions'
import { SmartInvestMethod } from '../_types/SmartInvest'
import {
  INVEST_TRANSACTION_MINED,
  INVEST_METHOD_REQUEST,
  INVEST_METHOD_FAILURE,
  INVEST_METHOD_SUCCESS,
  INVEST_ACCOUNT_REQUEST,
  INVEST_ACCOUNT_FAILURE,
  INVEST_ACCOUNT_SUCCESS,
  INVEST_MESSAGES,
  INVEST_TRANSACTION_READY,
} from '../_types/invest.types'
import { formaterNumber, bytesFormater } from '../_helpers/api'

import { AppActions, AppState } from '../_types'
import { constants, Transaction, utils } from 'ethers'
import info from '../_contracts/info'

export const removeError = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({ type: INVEST_MESSAGES, payload: { error: '' } })

export const requestInvest = (method: SmartInvestMethod, args: any) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: INVEST_METHOD_REQUEST, payload: { method } })
  // @ts-ignore
  investContract.functions[method](...args)
    .then((transaction: Transaction) => {
      if (transaction.hash) {
        console.log(transaction)
        dispatch({
          type: INVEST_METHOD_SUCCESS,
          payload: { transaction },
        })
        warningHandler('Transaction Pending', null, transaction.hash)
        provider.once(transaction.hash, () => {
          dispatch({
            type: INVEST_TRANSACTION_MINED,
          })
          setTimeout(() => {
            dispatch({
              type: INVEST_TRANSACTION_READY,
            })
          }, 5000)
          successHandler('Transaction Confirmed', null, transaction.hash)
          dispatch(investInformation() as any)
        })
      }
    })
    .catch((err) => {
      dispatch({ type: INVEST_METHOD_FAILURE, payload: err })
      errorHandler(err)
    })
}

export type TokenSymbol = 'STTS' | 'BTCB' | 'BNB'

export const investmentDeposit = (token: string, value: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const referrer = getState().router.location.query.ref
  let allowance

  const accountInfo: any = await readInvest('users', ['id'], [address])

  if (token !== 'BNB')
    allowance = await tokenContract[token].allowance(address, info[chainId].STT)

  const requestDeposit = async () => {
    if (accountInfo.id > 0) {
      if (token === 'STTS')
        dispatch(requestInvest('updateStts', [value]) as any)
      else if (token === 'BTCB')
        dispatch(requestInvest('updateBtcb', [value]) as any)
      else if (token === 'BNB')
        dispatch(requestInvest('updateBnb', [{ value }]) as any)
    } else {
      let refInfo = utils.isAddress(referrer)
        ? ((await readInvest('users', ['id'], [referrer])) as { id: number })
        : { id: 0 }
      if (refInfo.id > 0) {
        if (token === 'STTS')
          dispatch(requestInvest('investStts', [referrer, value]) as any)
        else if (token === 'BTCB') {
          dispatch(requestInvest('investBtcb', [referrer, value]) as any)
        } else if (token === 'BNB')
          dispatch(requestInvest('investBnb', [referrer, { value }]) as any)
      } else {
        errorHandler('No valid referrer found!', INVEST_MESSAGES)
      }
    }
  }

  if (token !== 'BNB' && bytesFormater(allowance) === 0) {
    dispatch({ type: INVEST_METHOD_REQUEST, payload: { method: 'approve' } })

    tokenContract[token]
      .approve(info[chainId].STT, constants.MaxUint256)
      .then((transaction) => {
        provider.once(transaction.hash, (tx) => {
          requestDeposit()
        })
      })
      .catch((err) => {
        dispatch({ type: INVEST_METHOD_FAILURE, payload: err })
        errorHandler(err)
      })
  } else requestDeposit()
}

export const withdrawInterest = (address?: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  dispatch(requestInvest('withdrawInterest', []) as any)
}

export const investInformation = (address?: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  if (!address) address = getState().account.address
  dispatch({ type: INVEST_ACCOUNT_REQUEST })
  const accountInfo: any = await readInvest('users', ['id'], [address])
  if (accountInfo.id > 0) {
    const items = [
      {
        name: 'calculateInterest',
        tokens: ['hourly', 'referral'],
        args: [address],
      },
      {
        name: 'userBalances',
        tokens: ['bnb', 'btcb', 'satoshi', 'stts'],
        args: [address],
      },
      {
        name: 'userDepositNumber',
        tokens: ['deposits'],
        args: [address],
      },
      {
        name: 'calculatePercent',
        tokens: ['percent'],
        args: [address, 0],
      },
      { name: 'users', tokens: ['id', 'latestWithdraw'], args: [address] },
    ]

    Promise.all(
      items.map((item) => readInvestItems(item.name, item.tokens, item.args))
    )
      .then(async (data: any) => {
        const account: any = {}
        const maxPercent = await investContract.maxPercent()
        data.forEach((its) =>
          its.map((info) => (account[info.item] = info.balance))
        )
        dispatch({
          type: INVEST_ACCOUNT_SUCCESS,
          payload: { account, maxPercent: bytesFormater(maxPercent) },
        })
      })
      .catch((err) => errorHandler(err, INVEST_ACCOUNT_FAILURE))
  }
}

export const readInvestItems = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    investContract[method](...args)
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

export const readInvest = async (method: any, items: any[], args: any) =>
  new Promise((resolve, reject) =>
    investContract[method](...args)
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
