import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Investment from '../components/Wallet/Investment'
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

interface IProps {
  isMobile: boolean
  height: number
  width: number
}

type AppRouterProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Titles = {
  '/invest': 'INVESTMENT',
  '/info': 'INFORMATION',
  '/freeze': 'FREEZE',
  '/swap': 'SWAP',
  '/stts': 'STTS',
}

export const AppRouter: React.FC<AppRouterProps> = ({
  isMobile,
  height,
  width,
}) => {
  const location = useLocation()
  const { pathname } = location
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
      <Row justify="between" align="center">
        <Col xs={12}>
          <Typography.Title
            style={{ textAlign: 'center', margin: 0 }}
            level={5}
          >
            {Titles[pathname]}
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
                  <Route exact path="/freeze">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Test isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/stts">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Test isMobile={isMobile} />
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

export const Test: React.FC<tester> = ({ isMobile }) => {
  return (
    <Row
      justify="around"
      align="center"
      style={{ minHeight: isMobile ? 300 : 300 }}
    >
      <Col xs={12} md={3}></Col>
      <Col xs={12} md={3}>
        Coming Soon!
      </Col>
      <Col xs={12} md={3}></Col>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address } = state.account
  return {
    address,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  accountTokenBalances: bindActionCreators(accountTokenBalances, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
