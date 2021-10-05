import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Investment from '../components/Wallet/Invest'
import Investment02 from '../components/Wallet/Invest02'
import Swap from '../components/Wallet/Swap'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { AbsoluteBody } from '../components/Layout/divs/Divs'
import { AppActions, AppState } from '../_types'
import { accountTokenBalances } from '../_actions/account.actions'
import Info from '../components/Wallet/Info'
import ProtectedRoute from './ProtectedRoute'
import { Container, Row, Col } from 'react-grid-system'
import Typography from 'antd/lib/typography'
import { tokenPrices, bankTotalSatoshi } from '../_actions/bank.actions'
import { investInformation } from '../_actions/invest.actions'
import { invest02Information } from '../_actions/invest02.actions'
import { poolInformation } from '../_actions/pool.actions'
import {
  initialization,
  investContract,
  invest02Contract,
  poolContract,
} from '../_actions/wallet.actions'
import Pool from '../components/Wallet/Pool'
import Logo from '../assets/Logo.png'
import { ExclamationTriangle } from '../components/Layout/svgs/ExclamationTriangle'

interface IProps {
  isMobile: boolean
  height: number
  width: number
  detailHandler: () => void
}

type AppRouterProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Titles = {
  '/invest': 'INVESTMENT',
  '/invest02': 'INVESTMENT02',
  '/info': 'INFORMATION',
  '/pool': 'POOL',
  '/swap': 'SWAP',
  '/stb': 'STB',
}

const priceDelay = 30
const detailsDelay = 60
let timer
let routeTimer

export const AppRouter: React.FC<AppRouterProps> = ({
  detailHandler,
  isMobile,
  address,
  height,
  width,
  active,
  init,
  tokenPrices,
  poolInformation,
  bankTotalSatoshi,
  investInformation,
  invest02Information,
}) => {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    setTimeout(() => {
      console.log('initialization')
      init()
    }, 1000)
  }, [init])

  useEffect(() => {
    clearInterval(timer)
    if (active) {
      tokenPrices()
      bankTotalSatoshi()
      timer = setInterval(() => {
        tokenPrices()
        bankTotalSatoshi()
      }, priceDelay * 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [active, bankTotalSatoshi, tokenPrices])

  useEffect(() => {
    const switcher = () => {
      switch (pathname) {
        case '/pool':
          if (poolContract) poolInformation()
          break
        case '/invest':
          if (investContract) investInformation()
          break
        case '/invest02':
          if (invest02Contract) invest02Information()
          break
        case '/swap':
          break
        default:
          break
      }
    }
    clearInterval(routeTimer)
    if (address) {
      switcher()
      routeTimer = setInterval(() => {
        switcher()
      }, detailsDelay * 1000)
    }
    return () => {
      clearInterval(routeTimer)
    }
  }, [
    pathname,
    address,
    poolInformation,
    invest02Information,
    investInformation,
  ])

  const transitions = useTransition(location, {
    key: pathname,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
    <Container
      fluid
      style={{
        width,
        height,
      }}
    >
      <Row justify="center" align="center">
        <Col>
          <Typography.Title
            style={{ textAlign: 'center', margin: 0, position: 'relative' }}
            level={5}
          >
            {Titles[pathname]}
            {Titles[pathname] === 'INVESTMENT' && (
              <ExclamationTriangle color="yellow" />
            )}
            {Titles[pathname] === 'INVESTMENT02' && (
              <ExclamationTriangle onClick={detailHandler} />
            )}
          </Typography.Title>
        </Col>
        <Col
          xs={12}
          style={{
            position: 'relative',
            height: height - 20,
            padding: 0,
          }}
        >
          {transitions((style, item, _, key) => (
            <AbsoluteBody
              height={isMobile ? undefined : 300}
              width={width - 32}
            >
              <animated.div key={key} style={style}>
                <Switch location={item}>
                  <Route exact path="/invest">
                    <ProtectedRoute
                      isMobile={isMobile}
                      height={height}
                      needLogin
                    >
                      <Investment isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/invest02">
                    <ProtectedRoute
                      isMobile={isMobile}
                      height={height}
                      needLogin
                    >
                      <Investment02 isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path={['/pool', '/freeze']}>
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Pool isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/stb">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <STB isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/info">
                    <Info isMobile={isMobile} />
                  </Route>
                  <Route exact path="/swap">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Swap isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route path="/">
                    <Redirect to="/invest" />
                  </Route>
                </Switch>
              </animated.div>
            </AbsoluteBody>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

interface tester {
  isMobile: boolean
}

export const STB: React.FC<tester> = ({ isMobile }) => {
  return (
    <Row
      justify="around"
      align="center"
      style={{
        fontSize: '15px',
        minHeight: isMobile ? 300 : 300,
        textShadow: '1px 1px 2px black',
      }}
    >
      <div
        style={{
          position: 'absolute',
          filter: 'blur(4px) grayscale(0.2)',
          height: '40vh',
          width: '100vw',
          backgroundSize: '200px 200px',
          backgroundImage: `url(${Logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <Col xs={12} md={2}></Col>
      <Col xs={12} md={4}>
        Coming Soon!
        <hr /> STB is the future stable coin. STB is issued only by the STT
        payment. The STB token is generated from 99 percent of the STT payment
        which is always worth as 100 SATOSHI or one BITS. <br />
        1 dollar = 100 cents
        <br />1 STB = 100 SATOSHI
      </Col>
      <Col xs={12} md={2}></Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { active } = state.wallet
  const { address } = state.account
  return {
    active,
    address,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  init: bindActionCreators(initialization, dispatch),
  tokenPrices: bindActionCreators(tokenPrices, dispatch),
  bankTotalSatoshi: bindActionCreators(bankTotalSatoshi, dispatch),
  poolInformation: bindActionCreators(poolInformation, dispatch),
  investInformation: bindActionCreators(investInformation, dispatch),
  invest02Information: bindActionCreators(invest02Information, dispatch),
  accountTokenBalances: bindActionCreators(accountTokenBalances, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
