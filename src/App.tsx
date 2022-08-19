import { FlexDiv } from 'components/Layout/divs/Divs'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import AppRouter from './router/AppRouter'
import DepositTable from './router/DepositTable'

const Globe = lazy(() => import('./components/Globe/Globe'))

let setTime: NodeJS.Timeout

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const [{ globeHeight, multi }, setGlobeHeight] = useState({
    globeHeight: 200,
    multi: 0.6,
  })
  const [{ appWidth, appHeight, showDetail }, setState] = useState({
    appHeight: 45,
    appWidth: window.innerWidth,
    showDetail: false,
  })

  useEffect(() => {
    const updateDimensions = () => {
      clearTimeout(setTime)
      setTime = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          appWidth: window.innerWidth,
          appHeight: window.innerHeight - 10,
        }))
        setGlobeHeight({
          globeHeight: (window.innerHeight - 10) * 0.6,
          multi: 0.6,
        })
      }, 200)
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()
    return () => window.removeEventListener('resize', updateDimensions)
  }, [appHeight])

  const setShowDetail = () =>
    setState((prev) => ({ ...prev, showDetail: !prev.showDetail }))

  const isMobile = useMemo(() => (appWidth > 768 ? false : true), [appWidth])

  const { pathname } = useLocation()

  useEffect(() => {
    setTimeout(() => {
      if (multi === 0.6 && pathname === '/nft')
        setGlobeHeight({ globeHeight: appHeight, multi: 1 })
      if (multi === 1 && pathname !== '/nft')
        setGlobeHeight({ globeHeight: appHeight * 0.6, multi: 0.6 })
    }, 1000)
  }, [pathname, multi, appHeight])

  return (
    <>
      <Header width={appWidth} />
      <Suspense
        fallback={
          <FlexDiv
            style={{
              height: globeHeight,
              width: appWidth,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'green',
            }}
          >
            loading...
          </FlexDiv>
        }
      >
        <Globe height={globeHeight} width={appWidth} showDetail={showDetail}>
          <DepositTable clickHandler={setShowDetail} />
        </Globe>
      </Suspense>
      <AppRouter
        isMobile={isMobile}
        width={appWidth}
        height={appHeight - globeHeight}
        detailHandler={setShowDetail}
      />
    </>
  )
}

export default App
