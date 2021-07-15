import React from 'react'
import { connect } from 'react-redux'
import ChangeWallet from './ChangeWallet'
import { AppState } from '../_types'
import { supportedChain } from '../_helpers/constants'
import Spin from 'antd/lib/spin'
import AccountAddress from '../components/Wallet/Main/AccountAddress'
import { Container, Row, Col } from 'react-grid-system'

interface ParentProps {
  component: React.ReactNode
  isMobile: boolean
  height: number
}

type ProtectedRouteProps = ParentProps & ReturnType<typeof mapStateToProps>

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  height,
  chainId,
  active,
  error,
  waiting,
  loading,
  isMobile,
}) => (
  <Container
    fluid
    style={{
      height: height,
      width: '100%',
    }}
  >
    <Row justify="between" align="start">
      <Col xs={12}>
        <AccountAddress />
      </Col>
    </Row>
    <Spin
      style={{
        textAlign: 'center',
        position: 'relative',
        height: 150,
        width: '100%',
      }}
      spinning={waiting || loading}
      tip={error.code === 0 ? 'Loading...' : error.msg}
    >
      {active && supportedChain(chainId) ? (
        component
      ) : (
        <ChangeWallet isMobile={isMobile} />
      )}
    </Spin>
  </Container>
)

const mapStateToProps = (state: AppState) => {
  const { chainId, active, waiting, error } = state.wallet
  const { loading } = state.account
  return {
    error,
    active,
    chainId,
    waiting,
    loading,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
