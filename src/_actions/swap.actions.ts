import { Dispatch } from 'react'
import {
  SWAP_METHOD_REQUEST,
  SWAP_METHOD_SUCCESS,
  SWAP_METHOD_FAILURE,
  SWAP_METHOD_MINED,
  SWAP_METHOD_READY,
} from '../_types/swap.types'
import { AppActions, AppState } from '../_types'
import { provider, swapContract, tokenContract } from './wallet.actions'
import { errorHandler, successHandler, warningHandler } from '../_helpers/alert'
import { constants, Transaction } from 'ethers'
import { bytesFormater, formaterNumber } from '../_helpers/api'
import swap from '../_contracts/swap'

export const requestSwap = (method: any, args: any) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: SWAP_METHOD_REQUEST, payload: { method } })
  const chainId = getState().wallet.chainId
  const address = getState().account.address

  const requester = () => {
    // @ts-ignore
    swapContract.functions[method](...args)
      .then((transaction: Transaction) => {
        if (transaction.hash) {
          console.log(transaction)
          dispatch({
            type: SWAP_METHOD_SUCCESS,
            payload: { transaction },
          })
          warningHandler('Transaction Pending', null, transaction.hash)
          provider.once(transaction.hash, () => {
            dispatch({
              type: SWAP_METHOD_MINED,
            })
            setTimeout(() => {
              dispatch({
                type: SWAP_METHOD_READY,
              })
            }, 5000)
            successHandler('Transaction Confirmed', null, transaction.hash)
          })
        }
      })
      .catch((err) => {
        dispatch({ type: SWAP_METHOD_FAILURE, payload: { error: err } })
        errorHandler(err)
      })
  }
  if (address && method === 'safeBnbSwap' && formaterNumber(args[0]) !== 0) {
    const allowance = await tokenContract.STTS.allowance(
      address,
      swap.address[chainId]
    )
    if (bytesFormater(allowance) === 0) {
      dispatch({ type: SWAP_METHOD_REQUEST, payload: { method: 'approve' } })
      tokenContract.STTS.approve(swap.address[chainId], constants.MaxUint256)
        .then((transaction) => {
          provider.once(transaction.hash, (_) => {
            requester()
          })
        })
        .catch((err) => {
          dispatch({ type: SWAP_METHOD_FAILURE, payload: err })
          errorHandler(err)
        })
    } else requester()
  } else requester()
}
