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
  PoolAccountInfo,
} from '../_types/pool.types'
import {
  formaterNumber,
  bytesFormater,
  bytesFormaterString,
  deadline,
} from '../_helpers/api'
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
          dispatch(
            accountTokenBalances(['BTCB', 'STT', 'STTS', 'LPTOKEN']) as any
          )
        })
      }
    })
    .catch((err) => {
      dispatch({ type: POOL_METHOD_FAILURE, payload: err })
      errorHandler(err)
    })
}

export const poolUnfreeze = () => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const address = getState().account.address

  const { stts, minStts, minBnb } = (await readPool(
    'unfreezeInfo',
    ['stts', 'bnb', 'minStts', 'minBnb'],
    [address, 0],
    false
  )) as any

  if (stts > 0) {
    dispatch(requestPool('unfreeze', [minStts, minBnb, deadline(3)]) as any)
  } else {
    const error = 'Value not found!'
    dispatch({ type: POOL_MESSAGES, payload: { error } })
    errorHandler(error)
  }
}

export const poolUnfreezeLP = () => async (dispatch: Dispatch<AppActions>) => {
  dispatch(requestPool('unfreezeLP', []) as any)
}

export const poolFreeze = (stts: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const referrer = getState().router.location.query.ref
  const percent = getState().router.location.query.percent

  const account: any = await readPool('users', ['referrer'], [address])
  const backupRef: any = await poolContract.owner()

  const allowance = await tokenContract.STTS.allowance(
    address,
    info[chainId].POOL
  )

  const requestDeposit = async () => {
    const { bnb, minStts, minBnb } = (await readPool(
      'freezeInfo',
      ['bnb', 'minStts', 'minBnb'],
      [stts, 0],
      false
    )) as any
    console.log(stts, bnb, minStts, minBnb)
    if (
      utils.isAddress(account.referrer) &&
      account.referrer !== info.addressZero
    ) {
      dispatch(
        requestPool('updateFreeze', [
          stts,
          minStts,
          minBnb,
          deadline(3),
          { value: bnb },
        ]) as any
      )
    } else {
      let isRef = utils.isAddress(referrer) || utils.isAddress(backupRef)
      const per = referrer ? Number(percent) * 100 : 10000
      if (isRef && !isNaN(per)) {
        const ref = referrer || backupRef
        dispatch(
          requestPool('freeze', [
            ref,
            per,
            stts,
            minStts,
            minBnb,
            deadline(3),
            { value: bnb },
          ]) as any
        )
      } else {
        const error = 'Invalid referral link!'
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

export const poolFreezeLP = (lptoken: string) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const referrer = getState().router.location.query.ref
  const percent = getState().router.location.query.percent

  const backupRef: any = await poolContract.owner()
  const account: any = await readPool('users', ['referrer'], [address])

  const allowance = await tokenContract.LPTOKEN.allowance(
    address,
    info[chainId].POOL
  )

  const requestDeposit = async () => {
    if (
      utils.isAddress(account.referrer) &&
      account.referrer !== info.addressZero
    ) {
      dispatch(requestPool('updateFreezeLP', [lptoken]) as any)
    } else {
      let isRef = utils.isAddress(referrer) || utils.isAddress(backupRef)
      const per = referrer ? Number(percent) * 100 : 10000
      if (isRef && !isNaN(per)) {
        const ref = referrer || backupRef
        dispatch(requestPool('freezeLP', [ref, per, lptoken]) as any)
      } else {
        const error = 'Invalid referral link!'
        dispatch({ type: POOL_MESSAGES, payload: { error } })
        errorHandler(error)
      }
    }
  }

  if (bytesFormater(allowance) === 0) {
    dispatch({ type: POOL_METHOD_REQUEST, payload: { method: 'approve' } })

    tokenContract.LPTOKEN.approve(info[chainId].POOL, constants.MaxUint256)
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

  const currentPrice = (await poolContract.sttsToBnbPrice())
    .div(10 ** 8)
    .toNumber()
  const lpAmounts = await readPool(
    ['calculateLiquidityValue'],
    ['stts', 'bnb'],
    ['1000000000000000000']
  )

  let account: PoolAccountInfo = (await readPool(
    'users',
    ['referrer', 'liquidity', 'refAmounts', 'refPercent', 'latestWithdraw'],
    [address]
  )) as any

  if (account.liquidity > 0) {
    const items = [
      {
        name: 'calculateInterest',
        tokens: ['daily', 'referral'],
        args: [address],
      },
      {
        name: 'userDepositNumber',
        tokens: ['deposits'],
        args: [address],
      },
      {
        name: 'calculateDaily',
        tokens: ['nextReward'],
        args: [address, Math.floor(Date.now() / 1000) + 86400],
      },
    ]

    Promise.all(
      items.map((item) => readPoolItems(item.name, item.tokens, item.args))
    )
      .then((data: any) => {
        data.forEach((its) =>
          its.map((info) => (account[info.item] = info.value))
        )
        if (account.deposits > 0) {
          const deps = Array.from(Array(account.deposits))
          Promise.all(
            deps.map((_, i) =>
              readPoolItems(
                'userDepositDetails',
                ['startTime', 'reward'],
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
                    [info.item]: info.value,
                  })
              )
            )
            dispatch({
              type: POOL_ACCOUNT_SUCCESS,
              payload: {
                account,
                currentPrice,
                lpAmounts,
              },
            })
          })
        }
      })
      .catch((err) => {
        errorHandler(err)
        dispatch({
          type: POOL_ACCOUNT_FAILURE,
          payload: { error: err, currentPrice, lpAmounts },
        })
      })
  } else {
    dispatch({
      type: POOL_ACCOUNT_FAILURE,
      payload: { error: '', currentPrice, lpAmounts, account },
    })
  }
}

export const readPoolItems = async (
  method: any,
  items: any[],
  args: any,
  format = true
) =>
  new Promise((resolve, reject) =>
    poolContract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.map((item: string) =>
          format
            ? items.length > 1
              ? array.push({
                  item,
                  value: utils.isAddress(res[item])
                    ? res[item]
                    : formaterNumber(res[item], 0),
                })
              : array.push({
                  item,
                  value: utils.isAddress(res) ? res : bytesFormater(res),
                })
            : array.push({
                item,
                value: res,
              })
        )
        resolve(array)
      })
      .catch((err) => reject(err))
  )

export const readPool = async (
  method: any,
  items: any[],
  args: any,
  format = true
) =>
  new Promise((resolve, reject) =>
    poolContract[method](...args)
      .then((res) => {
        const obj: any = {}
        items.map((item: string) =>
          format && items.length > 1
            ? (obj[item] = utils.isAddress(res[item])
                ? res[item]
                : formaterNumber(res[item], item))
            : (obj[item] = utils.isAddress(res[item])
                ? res[item]
                : bytesFormaterString(res[item]))
        )
        resolve(obj)
      })
      .catch((err) => reject(err))
  )
