import { Dispatch } from 'redux'
import { errorHandler, warningHandler, successHandler } from '../_helpers/alert'
import { investContract, provider, tokenContract } from './wallet.actions'
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
import { accountTokenBalances } from './account.actions'

export const removeError = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({ type: INVEST_MESSAGES, payload: { error: '' } })

export const requestInvest = (method: any, args: any) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({ type: INVEST_METHOD_REQUEST, payload: { method } })
  // @ts-ignore
  investContract.functions[method](...args)
    .then((transaction: Transaction) => {
      if (transaction.hash) {
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
          dispatch(accountTokenBalances(['BTCB', 'STT', 'STTS']) as any)
        })
      }
    })
    .catch((err) => {
      dispatch({ type: INVEST_METHOD_FAILURE, payload: err })
      errorHandler(err)
    })
}

export type TokenSymbol = 'STTS' | 'BTCB' | 'BNB'

export const investmentDeposit = (token: string, value: number) => async (
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
    const strValue = (value * 10 ** info.decimals[token]).toFixed().toString()
    console.log(strValue, info.decimals[token])
    if (accountInfo.id > 0) {
      if (token === 'STTS')
        dispatch(
          requestInvest('updateStts', [
            (Number(strValue) - 100000).toString(),
          ]) as any
        )
      else if (token === 'BTCB')
        dispatch(requestInvest('updateBtcb', [strValue]) as any)
      else if (token === 'BNB')
        dispatch(requestInvest('updateBnb', [{ value: strValue }]) as any)
    } else {
      let refInfo = utils.isAddress(referrer)
        ? ((await readInvest('users', ['id'], [referrer])) as { id: number })
        : { id: 0 }
      if (refInfo.id > 0) {
        if (token === 'STTS')
          dispatch(
            requestInvest('investStts', [
              referrer,
              (Number(strValue) - 100000).toString(),
            ]) as any
          )
        else if (token === 'BTCB') {
          dispatch(requestInvest('investBtcb', [referrer, strValue]) as any)
        } else if (token === 'BNB')
          dispatch(
            requestInvest('investBnb', [referrer, { value: strValue }]) as any
          )
      } else {
        const error = 'No valid referrer found!'
        dispatch({ type: INVEST_MESSAGES, payload: { error } })
        errorHandler(error)
      }
    }
  }

  if (token !== 'BNB' && bytesFormater(allowance) === 0) {
    dispatch({ type: INVEST_METHOD_REQUEST, payload: { method: 'approve' } })

    tokenContract[token]
      .approve(info[chainId].STT, constants.MaxUint256)
      .then((transaction) => {
        provider.once(transaction.hash, (_) => {
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
  const maxPercent = await investContract.maxPercent()
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
      .then((data: any) => {
        const account: any = {}
        data.forEach((its) =>
          its.map((info) => (account[info.item] = info.balance))
        )
        if (account.deposits > 0) {
          const deps = Array.from(Array(account.deposits))
          Promise.all(
            deps.map((_, i) =>
              readInvestItems(
                'userDepositDetails',
                ['reward', 'endTime'],
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
              type: INVEST_ACCOUNT_SUCCESS,
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
          type: INVEST_ACCOUNT_FAILURE,
          payload: { error: err, maxPercent: bytesFormater(maxPercent) },
        })
      })
  } else {
    dispatch({
      type: INVEST_ACCOUNT_FAILURE,
      payload: { error: '', maxPercent: bytesFormater(maxPercent) },
    })
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
