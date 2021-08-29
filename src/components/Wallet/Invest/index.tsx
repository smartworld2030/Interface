import { Row, Col } from 'react-grid-system'
import InvestUpdater from 'state/invest/updater'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'

interface InvestmentProps {
  isMobile: boolean
}

const Investment: React.FC<InvestmentProps> = ({ isMobile }) => {
  return (
    <Row justify="between" style={{ height: isMobile ? 1200 : 300 }}>
      <InvestUpdater />
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
  )
}

export default Investment
