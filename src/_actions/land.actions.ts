import axios from 'axios'
import { push } from 'connected-react-router'
import { Bytes, Transaction } from 'ethers'
import { Dispatch } from 'redux'
import land from '_contracts/land'
import { errorHandler, successHandler, warningHandler } from '_helpers/alert'
import { bytesFormater, formaterNumber } from '_helpers/api'
import { AppActions, AppState } from '_types'
import {
  LAND_ACCOUNT_SUCCESS,
  LAND_DATA_FAILED,
  LAND_DATA_REQUEST,
  LAND_DATA_SUCCESS,
  LAND_METHOD_FAILURE,
  LAND_METHOD_REQUEST,
  LAND_METHOD_SUCCESS,
  LAND_TRANSACTION_MINED,
  LAND_TRANSACTION_READY,
  MAP_DATA_RESET,
  MINT_LAND_REQUEST,
  TILES_DATA_FAILED,
  TILES_DATA_REQUEST,
  TILES_DATA_SUCCESS,
} from '_types/land.types'
import { accountTokenBalances } from './account.actions'
import { landContract, multiContract, provider } from './wallet.actions'

let controller = new AbortController()

export const fetchTiles = () => async (dispatch: Dispatch) => {
  dispatch({ type: TILES_DATA_REQUEST })

  import('assets/tiles.json')
    .then((tiles) => {
      dispatch({ type: TILES_DATA_SUCCESS, payload: tiles.default })
    })
    .catch((error) => {
      dispatch({ type: TILES_DATA_FAILED, payload: { error } })
    })
}

export const pushTile =
  (tileId: number) => (dispatch: Dispatch, getState: () => AppState) => {
    const ref = getState().router.location.query.ref
    if (ref) dispatch(push(`/land?tile=${tileId}&ref=${ref}`))
    else dispatch(push(`/land?tile=${tileId}`))
  }

export const resetTile =
  () => (dispatch: Dispatch, getState: () => AppState) => {
    const ref = getState().router.location.query.ref
    dispatch(push(`/land${ref ? `?ref=${ref}` : ''}`))
    dispatch({ type: MAP_DATA_RESET })
  }

export const fetchLandData =
  (landId: number | string) => async (dispatch: Dispatch) => {
    dispatch({ type: LAND_DATA_REQUEST, payload: { landId } })

    controller.abort()

    controller = new AbortController()

    axios
      .get(`${land.ipfs}/${landId}.json`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        dispatch({ type: LAND_DATA_SUCCESS, payload: data })
      })
      .catch((err) => {
        if (err.message === 'canceled') return
        console.log(err)
        const error = "Couldn't fetch land data, please try again later"
        errorHandler(error)
        dispatch({ type: LAND_DATA_FAILED, payload: { error } })
      })
  }

export const requestLand =
  (method: any, args: any) => (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: LAND_METHOD_REQUEST, payload: { method } })
    console.log(method, args)
    // @ts-ignore
    landContract.functions[method](...args)
      .then((transaction: Transaction) => {
        if (transaction.hash) {
          dispatch({
            type: LAND_METHOD_SUCCESS,
            payload: { transaction },
          })
          warningHandler('Transaction Pending', null, transaction.hash)
          provider.once(transaction.hash, () => {
            dispatch({
              type: LAND_TRANSACTION_MINED,
            })
            setTimeout(() => {
              dispatch({
                type: LAND_TRANSACTION_READY,
              })
            }, 5000)
            successHandler('Transaction Confirmed', null, transaction.hash)
            dispatch(landInformation() as any)
            dispatch(accountTokenBalances(['BTCB', 'STT', 'STTS']) as any)
          })
        }
      })
      .catch((err) => {
        errorHandler(err)
        dispatch({ type: LAND_METHOD_FAILURE, payload: err })
      })
  }

export const mint =
  (landId: number, landData: string) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    let referrer = '0x0000000000000000000000000000000000000000'
    const value = getState().land.landPrice
    const refLink = getState().router.location.query.ref

    if (refLink) {
      const isValid = await landContract.isUser(refLink)

      if (!isValid) return errorHandler('Invalid Referral Link')
      referrer = refLink
    }

    console.log(value)
    dispatch({ type: MINT_LAND_REQUEST })

    dispatch(
      requestLand('mint', [referrer, landId, landData, { value }]) as any
    )
  }

// Withdraw Intereset function for land smart contract
export const withdrawInterest = () => async (dispatch: Dispatch) => {
  dispatch(requestLand('withdrawInterest', []) as any)
}

export const landInformation =
  (address?: string) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({ type: LAND_METHOD_REQUEST })
    if (!address) address = getState().account.address

    try {
      const landPrice = (await landContract.LAND_PRICE()).toString()
      //   // get all sold land ids
      const totalSupply = (await landContract.totalSupply()).toNumber()
      //   const landsIds = []

      // using multicall to get all token ids
      const tokenCalls = Array.from({ length: totalSupply }, (_, i) => [
        landContract.address,
        landContract.interface.encodeFunctionData('tokenByIndex', [i]),
      ])

      const results = await multiContract.aggregate(tokenCalls)

      // make arrayof tokenId as number from results
      const landsIds: number[] = results.returnData.map((id: Bytes) =>
        Number(id)
      )

      // get all land owners
      const ownerCalls = landsIds.map((id) => [
        landContract.address,
        landContract.interface.encodeFunctionData('ownerOf', [id]),
      ])

      const ownerResults = await multiContract.aggregate(ownerCalls)

      // if owner is the same as address, add to owned lands
      const ownedLands = []
      const landsOwners: { [key: string]: string } = landsIds.reduce(
        (acc, id, i) => {
          const owner = landContract.interface.decodeFunctionResult(
            'ownerOf',
            ownerResults.returnData[i]
          )[0]

          if (owner === address) ownedLands.push(id)
          return { ...acc, [id]: owner }
        },
        {}
      )

      const landInformation = {
        landsIds,
        landsOwners,
        ownedLands,
        totalSupply,
        landPrice,
      }

      dispatch({ type: LAND_ACCOUNT_SUCCESS, payload: landInformation })
    } catch (error) {
      errorHandler(error)
      console.log(error)
      dispatch({ type: LAND_METHOD_FAILURE, payload: { error } })
    }
  }

export const readInvest03Items = async (
  method: any,
  items: any[],
  args: any
) => {
  return new Promise((resolve, reject) =>
    landContract[method](...args)
      .then((res) => {
        const array: any[] = []
        items.forEach((item: string) => {
          items.length > 1 || item === 'totalAmount' || item === 'referral'
            ? array.push({ item, balance: formaterNumber(res[item], item) })
            : array.push({
                item,
                balance: item === 'isBlocked' ? res : bytesFormater(res),
              })
        })
        resolve(array)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  )
}
