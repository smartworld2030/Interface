import React from 'react'
import { connect } from 'react-redux'
import ChainWallet from './ChangeWallet'
import { AppState } from '../_types'
import { supportedChain } from '../_helpers/constants'
import { RelativeBody } from '../components/Layout/divs/Divs'
import Spin from 'antd/lib/spin'

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
  <Spin
    spinning={waiting || loading}
    tip={error.code === 0 ? 'Loading...' : error.msg}
  >
    <RelativeBody height={height}>
      {active && supportedChain(chainId) ? (
        component
      ) : (
        <ChainWallet isMobile={isMobile} />
      )}
    </RelativeBody>
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
