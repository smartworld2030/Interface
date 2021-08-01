import { BigNumberish, utils } from 'ethers'
import erc20 from '../_contracts/erc20'
import MetaMaskOnboarding from '@metamask/onboarding'
import info from '../_contracts/info'

export const { ethereum } = window

export const onBoard = new MetaMaskOnboarding()

export const convertNumbers2English = (string: string) =>
  string
    // @ts-ignore
    .replace(/[\u0660-\u0669]/g, (c) => c.charCodeAt(0) - 0x0660)
    // @ts-ignore
    .replace(/[\u06f0-\u06f9]/g, (c) => c.charCodeAt(0) - 0x06f0)

export const bytesFormater = (balance: any) => parseInt(balance._hex)

export const formater = (balance: BigNumberish, token: string | number = 0) =>
  utils.formatUnits(
    balance,
    typeof token === 'number' ? token : erc20.decimals[token]
  )

export const formatToString = (balance: number, token: string | number = 0) =>
  balance * 10 ** (typeof token === 'number' ? token : info.decimals[token]) +
  ''

export const formaterNumber = (
  balance: BigNumberish,
  token: string | number = 0
) => {
  const decimal =
    typeof token === 'number'
      ? token
      : erc20.decimals[token]
      ? erc20.decimals[token]
      : 0
  return Number(formater(balance, decimal))
}
export const roundDecimals = (value: number, decimal: number = 2) =>
  Math.round(Number(value) * 10 ** decimal) / 10 ** decimal

export const roundDecimalsString = (value: number, decimal: number = 2) =>
  Math.round(value / 10 ** decimal).toString()

export const percentToValue = (val: number, per: number) => (val * per) / 100

export const valueToPercent = (val: number, max: number) =>
  roundDecimals((val / max) * 100)

export const truncate = (str: string, decimals: number) => {
  if (str.includes('.')) {
    const parts = str.split('.')
    return parts[0] + '.' + parts[1].slice(0, decimals)
  }
  return str
}
