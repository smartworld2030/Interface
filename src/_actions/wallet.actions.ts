import { Dispatch } from 'react'
import {
  WALLET_FAILURE,
  WALLET_REQUEST,
  WALLET_ACTIVATED,
  ONBOARDING_REQUEST,
  CHAIN_CHANGE_REQUEST,
  CHAIN_CHANGE_SUCCESS,
  ADDRESS_CHANGE_REQUEST,
  ADDRESS_CHANGE_SUCCESS,
  ADDRESS_CHANGE_FAILURE,
  ContractObject,
  InvestContract,
  BankContract,
} from '../_types/wallet.types'
import { AppActions, AppState } from '../_types'
import { errorHandler, seccessHandler, warningHandler } from '../_helpers/alert'
import { supportedChain, tooShorter } from '../_helpers/constants'
import { ethereum } from '../_helpers/api'
import chainList from '../_helpers/chainList'
import { Contract, ethers } from 'ethers'
import { onBoard } from '../_helpers/api'
import erc20 from '../_contracts/erc20'
import bank from '../_contracts/bank'
import invest from '../_contracts/invest'

let timer: NodeJS.Timeout

export let provider
export let signer
export let tokenContract: ContractObject
export let investContract: InvestContract
export let bankContract: BankContract

export const initialization = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: WALLET_REQUEST })
  if (!getState().wallet.active) {
    if (ethereum && ethereum.isMetaMask) {
      provider = new ethers.providers.Web3Provider(ethereum, 'any')
      provider.send('eth_requestAccounts', [])
      signer = provider.getSigner()

      provider.on('network', ({ chainId }) => {
        dispatch({ type: CHAIN_CHANGE_SUCCESS, payload: { chainId } })

        ethereum?._metamask.isUnlocked().then((isUnlocked: boolean) => {
          if (isUnlocked) {
            if (supportedChain(chainId)) {
              tokenContract = {
                STT: new Contract(
                  erc20.address[chainId].stt,
                  erc20.abi,
                  signer
                ),
                STTS: new Contract(
                  erc20.address[chainId].stts,
                  erc20.abi,
                  signer
                ),
                BTCB: new Contract(
                  erc20.address[chainId].btcb,
                  erc20.abi,
                  signer
                ),
              }
              investContract = new Contract(
                invest.address[chainId],
                invest.abi,
                signer
              )
              bankContract = new Contract(
                erc20.address[chainId].stt,
                bank.abi,
                signer
              )
              signer.getAddress().then((address) =>
                dispatch({
                  type: WALLET_ACTIVATED,
                  payload: {
                    chainId,
                    address,
                  },
                })
              )
              seccessHandler('Connected To ' + chainList[chainId]?.name)
            } else {
              warningHandler('Please Change to Binance Smart Chain Mainnet!')
              dispatch({
                type: ADDRESS_CHANGE_FAILURE,
                payload: { error: 'available' },
              })
            }
          } else {
            warningHandler('Please unlock MetaMask!')
          }
        })
      })

      ethereum.on('chainChanged', () => {
        window.location.reload()
      })

      ethereum.on('accountsChanged', ([account]) => {
        dispatch({
          type: ADDRESS_CHANGE_REQUEST,
        })
        clearTimeout(timer)
        if (account) {
          timer = setTimeout(() => {
            signer.getAddress().then((address) => {
              dispatch({
                type: ADDRESS_CHANGE_SUCCESS,
                payload: { address },
              })
              seccessHandler(`Account Changed ${tooShorter(address)}`)
            })
          }, 1000)
        } else {
          dispatch({
            type: ADDRESS_CHANGE_FAILURE,
            payload: { error: 'notConnected' },
          })
        }
      })
    } else {
      dispatch({ type: WALLET_FAILURE, error: 'notAvailable' })
      errorHandler('MetaMask Is not Available!')
    }
  }
}

export const changeToMain = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: CHAIN_CHANGE_REQUEST })
  ethereum
    ?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    })
    .catch((error) => {
      errorHandler(error.message, WALLET_FAILURE)
      dispatch({ type: WALLET_FAILURE, error: 'notAvailable' })
    })
}

export const startOnBoarding = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({ type: ONBOARDING_REQUEST })
  onBoard.startOnboarding()
}
