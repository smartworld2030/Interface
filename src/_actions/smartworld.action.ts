import { Transaction } from 'ethers'
import { warningHandler, successHandler, errorHandler } from '_helpers/alert'
import { tokenContract, provider } from './wallet.actions'

export const requestInvest = (method: any, args: any) => {
  tokenContract.STTS.functions[method](...args)
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

export const transferSTTS = (address: string, value: number) => {
  requestInvest('transfer', [address, value * 10 ** 8])
}
