//@ts-nocheck
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateBankStates } from './actions'
import useBlockNumber from 'state/application/hooks'
import { useBankContract, useBtcPriceContract, useMulticallContract } from 'hooks/useContract'
import { multiCallMultipleData } from 'state/multicall/hooks'

export default function Updater(): null {
  const dispatch = useDispatch()
  const latestBlockNumber = useBlockNumber()
  const { chainId } = useActiveWeb3React()
  const multicallContract = useMulticallContract()
  const bankContract = useBankContract()
  const tokenPrice = useBtcPriceContract()

  const multicalls = [
    {
      contract: bankContract,
      methods: ['totalSatoshi', 'sttPrice', 'btcToSatoshi', 'bnbToSatoshi', 'sttsToSatoshi'],
      args: [[], [], [10 ** 18 + ''], [10 ** 18 + ''], [10 ** 8 + '']],
    },
    {
      contract: tokenPrice,
      methods: ['latestAnswer'],
      args: [[]],
    },
  ]

  useEffect(() => {
    if (!latestBlockNumber || !chainId || !multicallContract) return
    multiCallMultipleData(multicalls).then((results) => {
      const states = Object.keys(results).reduce(
        (items, method) =>
          results[method] && {
            ...items,
            [method]:
              Object.keys(results[method]).length === 1
                ? results[method].toString()
                : Object.keys(results[method]).reduce(
                    (res, key) => key.length > 1 && { ...res, [key]: results[method][key].toString() },
                    {},
                  ),
          },
        {},
      )
      dispatch(updateBankStates({ chainId, states }))
    })
  }, [chainId, multicalls, multicallContract, bankContract, dispatch, latestBlockNumber])

  return null
}
