import { Header } from 'components/Header'
import { FlexDiv } from 'components/Layout/divs/Divs'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import AppRouter from 'router/AppRouter'

const Globe = lazy(() => import('components/Globe/Globe'))

let setTime: NodeJS.Timeout

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const [{ globeHeight }, setGlobeHeight] = useState({
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
        <Globe height={globeHeight} width={appWidth} showDetail={showDetail} />
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
