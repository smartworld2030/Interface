import { Dispatch } from 'redux'
import {
  WALLET_FAILURE,
  WALLET_REQUEST,
  WALLET_ACTIVATED,
  WALLET_WAITING_MESSAGE,
  ONBOARDING_REQUEST,
  CHAIN_CHANGE_REQUEST,
  CHAIN_CHANGE_FAILURE,
  ContractObject,
  InvestContract,
  BankContract,
  PriceContract,
} from '../_types/wallet.types'
import { AppActions, AppState } from '../_types'
import { errorHandler, successHandler, warningHandler } from '../_helpers/alert'
import { supportedChain, tooShorter } from '../_helpers/constants'
import { ethereum } from '../_helpers/api'
import chainList from '../_helpers/chainList'
import { Contract, providers } from 'ethers'
import { onBoard } from '../_helpers/api'
import erc20 from '../_contracts/erc20'
import bank from '../_contracts/bank'
import invest from '../_contracts/invest'
import { ACCOUNT_LOGGEDIN, ACCOUNT_LOGOUT } from '../_types/account.types'
import { accountTokenBalances } from './account.actions'
import { INVEST_RESET } from '../_types/invest.types'
import tokenPrice from '../_contracts/tokenPrice'
import info from '../_contracts/info'

let timer: NodeJS.Timeout
let interval: NodeJS.Timeout

export let provider: providers.Web3Provider
export let signer: providers.JsonRpcSigner
export let tokenContract: ContractObject
export let investContract: InvestContract
export let bankContract: BankContract
export let priceContract: PriceContract

export const initialization = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: WALLET_REQUEST })
  if (!getState().wallet.active) {
    if (ethereum && ethereum.isMetaMask) {
      provider = new providers.Web3Provider(ethereum, 'any')
      provider.send('eth_requestAccounts', [])
      signer = provider.getSigner()

      ethereum.on('chainChanged', () => {
        window.location.reload()
      })

      ethereum.on('accountsChanged', (accounts) => {
        accountHandler(accounts[0])
      })

      provider.on('network', ({ chainId }) => {
        dispatch({ type: CHAIN_CHANGE_REQUEST, payload: { chainId } })
        console.log(chainId)
        if (supportedChain(chainId)) {
          tokenContract = {
            STT: new Contract(erc20.address[chainId].stt, erc20.abi, signer),
            STTS: new Contract(erc20.address[chainId].stts, erc20.abi, signer),
            BTCB: new Contract(erc20.address[chainId].btcb, erc20.abi, signer),
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
          priceContract = new Contract(
            tokenPrice.address[chainId].btc,
            tokenPrice.abi,
            signer
          )
          dispatch({
            type: WALLET_ACTIVATED,
            payload: {
              chainId,
            },
          })
          dispatch({ type: CHAIN_CHANGE_REQUEST, payload: { chainId } })
          successHandler('Connected To ' + chainList[chainId]?.name)
        } else {
          const msg = 'Please Change to Binance Smart Chain Mainnet!'
          warningHandler(msg)
          dispatch({
            type: CHAIN_CHANGE_FAILURE,
            payload: {
              error: {
                code: 301,
                msg,
              },
            },
          })
        }
        ethereum?._metamask.isUnlocked().then((isUnlocked: boolean) => {
          if (isUnlocked) {
            signer.getAddress().then((address) => accountHandler(address))
          } else {
            accountHandler()
          }
        })
      })
    } else {
      dispatch({
        type: WALLET_FAILURE,
        error: {
          msg: 'notAvailable',
          code: 401,
        },
      })
      const msg = 'MetaMask Is not Available!'
      errorHandler(msg, WALLET_WAITING_MESSAGE)
      dispatch({
        type: WALLET_WAITING_MESSAGE,
        payload: { error: { msg, code: 401 } },
      })
    }
  }

  const accountHandler = (account?: string) => {
    dispatch({
      type: ACCOUNT_LOGOUT,
    })
    dispatch({
      type: INVEST_RESET,
    })
    clearTimeout(timer)
    if (account) {
      timer = setTimeout(() => {
        signer.getAddress().then((address) => {
          dispatch({
            type: ACCOUNT_LOGGEDIN,
            payload: { address },
          })
          dispatch(
            accountTokenBalances(address, ['STT', 'STTS', 'BTCB']) as any
          )
          successHandler(`Account Changed ${tooShorter(address)}`)
        })
      }, 1000)
    } else {
      const msg = 'Please unlock your MetaMask!'
      warningHandler(msg)
      dispatch({
        type: WALLET_WAITING_MESSAGE,
        payload: {
          error: {
            code: 301,
            msg,
          },
        },
      })
    }

    clearInterval(interval)
    interval = setInterval(async () => {
      const accounts = await ethereum?.request({ method: 'eth_accounts' })
      if (!account && accounts.length > 0) accountHandler(accounts[0])
      else if (account && accounts.length === 0) accountHandler()
    }, 1000)
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
      dispatch({
        type: WALLET_FAILURE,
        error: { msg: 'MetaMask Is not Available!', code: 401 },
      })
    })
}

export const addTokenToWallet = (tokens: string[]) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  tokens.forEach(
    (token: string) =>
      new Promise((resolve, reject) => {
        const chainId = getState().wallet.chainId
        const address = info[chainId][token]
        const symbol = token
        const decimals = info.decimals[token]
        const image = 'http://placekitten.com/200/300'
        ethereum
          ?.request({
            method: 'wallet_watchAsset',
            params: {
              // @ts-ignore
              type: 'ERC20',
              options: {
                address,
                symbol,
                decimals,
                image,
              },
            },
          })
          .then((result) => resolve(result))
          .catch((err) => {})
      })
  )
}

export const startOnBoarding = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: ONBOARDING_REQUEST,
    payload: { error: { msg: 'Waiting for MetaMask!', code: 304 } },
  })
  onBoard.startOnboarding()
}
