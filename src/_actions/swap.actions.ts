import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../_types'
import {
  SWAP_PRICE_REQUEST,
  // SWAP_PRICE_FAILURE,
  // SWAP_PRICE_SUCCESS,
} from '../_types/swap.types'
import { AppActions } from '../_types'
import { swapContract } from './wallet.actions'
import { formaterNumber, formatToString } from '../_helpers/api'
import swap from '../_contracts/swap'
// import { errorHandler } from '../components/Layout/SnackBar/alert'

export const requestSwapBnb = () => (
  dispatch: ThunkDispatch<AppState, undefined, AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: SWAP_PRICE_REQUEST })
  const chainId = getState().wallet.chainId
  const address = getState().account.address
  const typedValue = getState().swap.typedValue

  const amountsIn = swapContract.getAmountsIn(
    formatToString(1, swap.decimals.bnb),
    swap.pair[chainId].bnb
  )
  const min = formaterNumber(amountsIn, 8)
  swapContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
    min,
    swap.pair[chainId].bnb,
    address,
    Date.now(),
    {
      value: formatToString(typedValue, 18),
    }
  )
}

// export const requestSwap = () => (
//   dispatch: ThunkDispatch<AppState, undefined, AppActions>,
//   getState: () => AppState
// ) => {
//   dispatch({ type: SWAP_PRICE_REQUEST })
//   const chainId = getState().wallet.chainId
//   swapContract
//     .getAmountsIn(
//       formatToString(1, swap.decimals[pair[0]]),
//       swap.pair[chainId][pair[0]]
//     )
//     .then((result) => {
//       console.log(formaterNumber(result[0], 8))
//       // setPrice(formaterNumber(result[0], 8))
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
