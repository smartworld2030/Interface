import Spin from 'antd/lib/spin'
import { connect } from 'react-redux'
import { AppState } from '../../../_types'
import { Row, Col } from 'react-grid-system'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'
import { usePool } from 'hooks/usePool'

interface PoolProps {
  isMobile: boolean
}

type IProps = PoolProps & ReturnType<typeof mapStateToProps>

const Pool: React.FC<IProps> = ({ isMobile, error, poolLoading }) => {
  console.log(usePool())
  return (
    <Spin
      style={{
        textAlign: 'center',
        height: 150,
      }}
      spinning={poolLoading}
      tip={error ? error : 'Waiting...'}
    >
      <Row justify="between" style={{ height: isMobile ? 1200 : 300 }}>
        <Col md={12} lg={6}>
          <DepositSection isMobile={isMobile} />
        </Col>
        <Col md={6} lg={3}>
          <WithdrawSection width={230} />
        </Col>
        <Col md={6} lg={3}>
          <DetailSection isMobile={isMobile} />
        </Col>
      </Row>
    </Spin>
  )
}
const mapStateToProps = (state: AppState) => {
  const { error, poolLoading } = state.pool
  return {
    poolLoading,
    error,
  }
}

export default connect(mapStateToProps)(Pool)
