import { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Globe from './components/Globe/Globe'
import { Header } from './components/Header'
import AppRouter from './router/AppRouter'

let setTime: NodeJS.Timeout

type AppProps = {}

interface AppStates {
  spacerHeight: number
  appWidth: number
}

class App extends Component<AppProps, AppStates> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      spacerHeight: 45,
      appWidth: window.innerWidth,
    }
  }

  updateDimensions = () => {
    clearTimeout(setTime)
    setTime = setTimeout(() => {
      this.setState({
        appWidth: window.innerWidth,
        spacerHeight: window.innerHeight - 10,
      })
    }, 200)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.setState({
      spacerHeight: window.innerHeight - 10,
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { appWidth, spacerHeight } = this.state
    const isMobile = appWidth > 768 ? false : true
    const globeHeight = spacerHeight * 0.6
    return (
      <Router>
        {/* <Header width={appWidth} />
        <Globe height={globeHeight} width={appWidth} /> */}
        <AppRouter
          isMobile={isMobile}
          width={appWidth}
          height={spacerHeight - globeHeight}
        />
      </Router>
    )
  }
}

export default App
