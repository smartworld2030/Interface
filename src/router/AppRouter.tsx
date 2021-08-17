import React, { lazy } from 'react'
import { usePollBlockNumber } from 'state/block/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { AbsoluteBody } from 'components/Layout/divs/Divs'
import { Container, Row, Col } from 'react-grid-system'
import Typography from 'antd/lib/typography'
import Logo from 'assets/Logo.png'
import GlobalStyle from 'style/Global'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from 'components/Wallet/Swap/AddLiquidity/redirects'
import SuspenseWithChunkError from 'components/SuspenseWithChunkError'
import PageLoader from 'components/Loader/PageLoader'
import RedirectOldRemoveLiquidityPathStructure from 'components/Wallet/Swap/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from 'components/Wallet/Swap/Swap/redirects'

const AddLiquidity = lazy(() => import('components/Wallet/Swap/AddLiquidity'))
const Liquidity = lazy(() => import('components/Wallet/Swap/Pool'))
const PoolFinder = lazy(() => import('components/Wallet/Swap/PoolFinder'))
const RemoveLiquidity = lazy(() => import('components/Wallet/Swap/RemoveLiquidity'))
const Investment = lazy(() => import('components/Wallet/Invest'))
const Swap = lazy(() => import('components/Wallet/Swap/Swap'))
const Info = lazy(() => import('components/Wallet/Info'))
const Pool = lazy(() => import('components/Wallet/Pool'))

interface IProps {
  isMobile: boolean
  height: number
  width: number
}

type AppRouterProps = IProps

const Titles = {
  '/invest': 'INVESTMENT',
  '/info': 'INFORMATION',
  '/pool': 'POOL',
  '/swap': 'SWAP',
  '/stb': 'STB',
}

export const AppRouter: React.FC<AppRouterProps> = ({ isMobile, height, width }) => {
  const location = useLocation()
  const { pathname } = location
  usePollBlockNumber()
  useEagerConnect()

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
      <GlobalStyle />
      <Row justify="between" align="center">
        <Col xs={12}>
          <Typography.Title style={{ textAlign: 'center', margin: 0 }} level={5}>
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
            //@ts-ignore
            <AbsoluteBody height={isMobile ? undefined : 300} width={width - 32}>
              <animated.div key={key} style={style}>
                <SuspenseWithChunkError fallback={<PageLoader />}>
                  <Switch location={item}>
                    <Route exact strict path="/ingo" component={Info} />
                    <Route exact strict path="/invest" component={Investment} />
                    <Route exact strict path={['/pool', '/freeze']} component={Pool} />
                    <Route exact strict path="/stb" component={STB} />
                    <Route exact strict path="/swap" component={Swap} />
                    <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                    <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                    <Route exact strict path="/find" component={PoolFinder} />
                    <Route exact strict path="/liquidity" component={Liquidity} />
                    <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                    <Route exact path="/add" component={AddLiquidity} />
                    <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route exact path="/create" component={AddLiquidity} />
                    <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                    <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                    <Route path="/">
                      <Redirect to="/invest" />
                    </Route>
                  </Switch>
                </SuspenseWithChunkError>
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
        <hr /> STB is the future stable coin. STB is issued only by the STT payment. The STB token is generated from 99
        percent of the STT payment which is always worth as 100 SATOSHI or one BITS. <br />1 STB = 100 Satoshi
      </Col>
      <Col xs={12} md={2}></Col>
    </Row>
  )
}

export default AppRouter
