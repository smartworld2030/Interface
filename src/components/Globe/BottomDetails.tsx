import { connect } from 'react-redux'
import { AppState } from '_types'
import SmartWorldAddress from '../Wallet/Main/ListTokens'

interface BottomDetailsProps {
  showDetail: boolean
  pathname: string
}

const BottomDetails: React.FC<BottomDetailsProps> = ({
  showDetail,
  pathname,
  children,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        overflowX: 'hidden',
        width: 'calc(100% - 10px)',
        zIndex: 100,
        bottom: 2,
        left: 5,
      }}
    >
      {showDetail && children ? (
        children
      ) : (
        <SmartWorldAddress smartLand={pathname === '/land'} />
      )}
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  return {
    pathname: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(BottomDetails)
