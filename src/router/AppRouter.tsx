import React from 'react'
import Investment from '../components/Wallet/Investment'
import Swap from '../components/Wallet/Swap'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { AbsoluteBody } from '../components/Layout/divs/Divs'

interface AppRouterProps {
  isMobile: boolean
}

export const AppRouter: React.FC<AppRouterProps> = ({ isMobile }) => {
  const location = useLocation()
  const transitions = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return transitions((style, item, _, key) => (
    <AbsoluteBody>
      <animated.div key={key} style={style}>
        <Switch location={item}>
          <Route exact path="/invest">
            <Investment isMobile={isMobile} />
          </Route>
          <Route exact path="/freeze">
            <Test />
          </Route>
          <Route exact path="/stts">
            <Test />
          </Route>
          <Route exact path="/info">
            <Test />
          </Route>
          <Route exact path="/swap">
            <Swap isMobile={isMobile} />
          </Route>
          <Route path="/">
            <Redirect to="/invest" />
          </Route>
        </Switch>
      </animated.div>
    </AbsoluteBody>
  ))
}

interface tester {}

export const Test: React.FC<tester> = () => {
  return <div>Not Available Yet!</div>
}
