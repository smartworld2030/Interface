import { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Globe from './components/Globe/Globe'
import { Header } from './components/Header'
import { FlexDiv } from './components/Layout/divs/Divs'
import { AppActions, AppState } from './_types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { initialization } from './_actions/wallet.actions'
import AppRouter from './router/AppRouter'

let setTime: NodeJS.Timeout

type AppProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

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
    console.log('initialisation')
    this.props.init()
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
        <FlexDiv>
          <Header width={appWidth} />
          <Globe height={globeHeight} width={appWidth} />
          <AppRouter isMobile={isMobile} height={spacerHeight - globeHeight} />
        </FlexDiv>
      </Router>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  // const {} = state.wallet
  return {}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  init: bindActionCreators(initialization, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
