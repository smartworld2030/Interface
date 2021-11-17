import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useWindowSize } from './_helpers/useWindowSize'
import Globe from './components/Globe/Globe'
import { Header } from './components/Header'
import AppRouter from './router/AppRouter'
import DepositTable from './router/DepositTable'

type AppProps = {}

const App: React.FC<AppProps> = () => {
  const [globeHeight, setGlobeH] = useState(0)
  const [detail, setShowD] = useState(false)
  const { isMobile, width } = useWindowSize()

  const setShowDetail = () => setShowD((prev) => !prev)

  const setGlobeHeight = (globeHeight) => setGlobeH(globeHeight)

  return (
    <Router>
      <Header width={width} />
      {globeHeight && (
        <Globe height={globeHeight} width={width} showDetail={detail}>
          <DepositTable clickHandler={setShowDetail} />
        </Globe>
      )}
      <AppRouter
        globeHeight={setGlobeHeight}
        isMobile={isMobile}
        width={width}
        detailHandler={setShowDetail}
      />
    </Router>
  )
}

export default App
