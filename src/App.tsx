import Header from 'components/Header'
import Loading from 'components/Layout/Loading'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import AppRouter from 'router/AppRouter'
import { AppState } from '_types'

const NewGlobe = lazy(() => import('components/Globe'))

let setTime: NodeJS.Timeout

type AppProps = ReturnType<typeof mapStateToProps>

const App: React.FC<AppProps> = ({ pathname }) => {
  const [{ globeHeight, multi }, setGlobeHeight] = useState({
    globeHeight: 200,
    multi: 0.7,
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

  useEffect(() => {
    const appHeight = window.innerHeight - 10
    if (pathname === '/land')
      setGlobeHeight({ globeHeight: appHeight * 0.8, multi: 0.8 })
    else setGlobeHeight({ globeHeight: appHeight * 0.6, multi: 0.6 })
  }, [pathname, multi])

  return (
    <>
      <Header width={appWidth} />
      <Suspense
        fallback={<Loading globeHeight={globeHeight} appWidth={appWidth} />}
      >
        <NewGlobe
          height={globeHeight}
          width={appWidth}
          showDetail={showDetail}
        />
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

const mapStateToProps = (state: AppState) => {
  const { pathname } = state.router.location
  return {
    pathname: pathname,
  }
}

export default connect(mapStateToProps)(App)
