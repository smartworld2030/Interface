import { BigNumberish, utils } from 'ethers'
import erc20 from '../_contracts/erc20'
import MetaMaskOnboarding from '@metamask/onboarding'

export const { ethereum } = window

export const onBoard = new MetaMaskOnboarding()

export const formater = (balance: BigNumberish, token: string | number = 0) =>
  utils.formatUnits(
    balance,
    typeof token === 'number' ? token : erc20.decimals[token]
  )

export const roundDecimals = (value: number, decimal: number = 2) =>
  Math.round((value + Number.EPSILON) * 10 ** decimal) / 10 ** decimal
