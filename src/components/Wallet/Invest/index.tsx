import React from 'react'
import Spin from 'antd/lib/spin'
import { connect } from 'react-redux'
import { AppState } from '../../../_types'
import { Row, Col } from 'react-grid-system'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'

interface InvestmentProps {
  isMobile: boolean
}

type IProps = InvestmentProps & ReturnType<typeof mapStateToProps>

const Investment: React.FC<IProps> = ({ isMobile, error, investLoading }) => (
  <Spin
    style={{
      textAlign: 'center',
      height: 150,
    }}
    spinning={investLoading}
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
        <DetailSection />
      </Col>
    </Row>
  </Spin>
)

const mapStateToProps = (state: AppState) => {
  const { error, investLoading } = state.invest
  return {
    investLoading,
    error,
  }
}

export default connect(mapStateToProps)(Investment)
