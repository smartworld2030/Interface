import { useCallback, useEffect, useState } from 'react'

const useList = (refresher = 60000) => {
  const [list, setList] = useState({ address: '', '97': {}, '56': {} })

  const fetcher = useCallback(
    () =>
      fetch(process.env.PUBLIC_URL + '/assets/unblock.json')
        .then(async (res) => res.json().then((l) => setList(l)))
        .catch(() => setList({ address: '', '97': {}, '56': {} })),
    []
  )

  useEffect(() => {
    const intervalId = setInterval(() => fetcher(), refresher)
    fetcher()
    return () => clearInterval(intervalId) //This is important
  }, [refresher, fetcher])

  return list
}
export default useList
