import * as React from 'react'
import { connect } from 'react-redux'
import ChainWallet from './ChangeWallet'
import { RouteProps } from 'react-router'
import { AppState } from '../_types'
import { supportedChain } from '../_helpers/constants'
import Spin from 'antd/lib/spin'
import { RelativeBody } from '../components/Layout/divs/Divs'

interface ParntProps extends RouteProps {
  component: React.ReactNode
  isMobile: boolean
}

type ProtectedRouteProps = ParntProps & ReturnType<typeof mapStateToProps>

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  chainId,
  active,
  loading,
  isMobile,
}) => {
  return (
    <Spin spinning={loading}>
      <RelativeBody height={loading ? 180 : undefined}>
        {active && supportedChain(chainId) ? (
          component
        ) : (
          <ChainWallet isMobile={isMobile} />
        )}
      </RelativeBody>
    </Spin>
  )
}

const mapStateToProps = (state: AppState) => {
  const { chainId, active, loading } = state.wallet
  return {
    chainId,
    active,
    loading,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
