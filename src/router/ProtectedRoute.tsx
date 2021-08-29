import { connect } from 'react-redux'
import ChangeWallet from './ChangeWallet'
import { AppState } from '../_types'
import { supportedChain } from '../_helpers/constants'

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
  <>
    {active && needLogin && supportedChain(chainId) ? (
      children
    ) : supportedChain(chainId) ? (
      children
    ) : (
      <ChangeWallet isMobile={isMobile} />
    )}
  </>
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
