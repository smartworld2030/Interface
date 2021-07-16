import React from 'react'
import { connect } from 'react-redux'
import ChangeWallet from './ChangeWallet'
import { AppState } from '../_types'
import { supportedChain } from '../_helpers/constants'
import Spin from 'antd/lib/spin'

interface ParentProps {
  children: React.ReactNode
  isMobile: boolean
  height: number
  needLogin?: boolean
}

type ProtectedRouteProps = ParentProps & ReturnType<typeof mapStateToProps>

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  chainId,
  active,
  error,
  needLogin,
  waiting,
  loading,
  children,
  isMobile,
}) => (
  <Spin
    style={{
      textAlign: 'center',
      height: 150,
      width: '100%',
    }}
    spinning={waiting || loading}
    tip={error.code === 0 ? 'Loading...' : error.msg}
  >
    {active && needLogin && supportedChain(chainId) ? (
      children
    ) : supportedChain(chainId) ? (
      children
    ) : (
      <ChangeWallet isMobile={isMobile} />
    )}
  </Spin>
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
