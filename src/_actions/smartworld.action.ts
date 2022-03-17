import { Transaction } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { warningHandler, successHandler, errorHandler } from '_helpers/alert'
import { ethereum } from '_helpers/api'
import { tokenContract, provider } from './wallet.actions'

export const requestSTTSTransfer = (method: any, args: any) => {
  tokenContract.STTS.functions[method](...args)
    .then((transaction: Transaction) => {
      if (transaction.hash) {
        warningHandler('Transaction Pending', null, transaction.hash)
        provider.once(transaction.hash, () => {
          successHandler('Transaction Confirmed', null, transaction.hash)
        })
      }
    })
    .catch((err: any) => {
      errorHandler(err)
    })
}

export const transferSTTS = (address: string, value: number) => {
  requestSTTSTransfer('transfer', [address, value * 10 ** 8])
}

export const requestBNBTransfer = (
  from: string,
  to: string,
  value: number | string
) => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [{ from, to, value: parseEther(value.toString()).toHexString() }],
    })
    .then((transaction: Transaction) => {
      if (transaction.hash) {
        warningHandler('Transaction Pending', null, transaction.hash)
        provider.once(transaction.hash, () => {
          successHandler('Transaction Confirmed', null, transaction.hash)
        })
      }
    })
    .catch((err) => {
      errorHandler(err)
    })
}

export const transferBNB = (from: string, to: string, value: number) => {
  requestBNBTransfer(from, to, value)
}
