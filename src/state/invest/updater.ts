import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateInvestStates } from './actions'
import { useInvestContract } from 'hooks/useContract'
import { useMultiCallFetcher } from 'state/multicall/hooks'
import useDebounce from 'hooks/useDebounce'

export default function Updater(): null {
  const dispatch = useDispatch()
  const { chainId, account } = useActiveWeb3React()
  const investContract = useInvestContract()

  const calls = useMemo(
    () => [
      account
        ? {
            contract: investContract,
            methods: ['calculateInterest', 'userBalances', 'calculatePercent', 'users', 'maxPercent'],
            args: [[account], [account], [account, 0], [account], []],
          }
        : {
            contract: investContract,
            methods: ['maxPercent'],
            args: [[]],
          },
    ],
    [investContract, account, chainId],
  )

  const results = useMultiCallFetcher(calls)

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
    if (!chainId) return
    dispatch(
      updateInvestStates({
        chainId,
        states,
      }),
    )
  }, [states, chainId, dispatch])

  return null
}
