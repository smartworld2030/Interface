import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateBankStates } from './actions'
import { useBankContract, useBtcPriceContract } from 'hooks/useContract'
import { useMultiCallFetcher } from 'state/multicall/hooks'
import useDebounce from 'hooks/useDebounce'

export default function Updater(): null {
  const dispatch = useDispatch()
  const { chainId } = useActiveWeb3React()
  const bankContract = useBankContract()
  const tokenPrice = useBtcPriceContract()

  const multicalls = useMemo(
    () => [
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
    ],
    [bankContract, tokenPrice],
  )

  const results = useMultiCallFetcher(multicalls)

  const compiledStates = useMemo(() => {
    if (!Object.keys(results).length) return undefined
    return Object.keys(results).reduce(
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
  }, [results])

  const states = useDebounce(compiledStates, 500)

  useEffect(() => {
    if (!chainId || !states || !Object.keys(states).length) return
    dispatch(
      updateBankStates({
        chainId,
        states,
      }),
    )
  }, [states, chainId, dispatch])

  return null
}
