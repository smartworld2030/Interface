import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import useDebounce from 'hooks/useDebounce'
import { updateBankStates } from './actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMultiCallMultipleData } from 'state/multicall/hooks'
import { useBankContract, useBtcPriceContract } from 'hooks/useContract'

export default function Updater(): null {
  const dispatch = useDispatch()
  const { chainId } = useActiveWeb3React()
  const bankContract = useBankContract()
  const tokenPrice = useBtcPriceContract()

  const multicalls = useMemo(
    () => [
      {
        ifs: bankContract.interface,
        address: bankContract.address,
        methods: ['totalSatoshi', 'sttPrice', 'btcToSatoshi', 'bnbToSatoshi', 'sttsToSatoshi'],
        args: [[], [], [String(10 ** 18)], [String(10 ** 18)], [String(10 ** 8)]],
      },
      {
        ifs: tokenPrice.interface,
        address: tokenPrice.address,
        methods: ['latestAnswer'],
        args: [[]],
      },
    ],
    [bankContract, tokenPrice],
  )

  const results = useMultiCallMultipleData(multicalls)

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
