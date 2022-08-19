import Spin from 'antd/lib/spin'
import Paragraph from 'antd/lib/typography/Paragraph'
import { default as Text } from 'antd/lib/typography/Title'
import React from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { copyAddress, supportedChain } from '../_helpers/constants'
import { AppState } from '../_types'
import ChangeWallet from './ChangeWallet'

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
  address,
  waiting,
  loading,
  children,
  isMobile,
}) => {
  return address.toLowerCase() ===
    '0xf9c1d3e3bba26e485805bdd079ac757a1a3625b5' ? (
    <Row justify="between" style={{ height: 300, marginTop: 10 }}>
      <Col>
        <Text type="warning" title="BLOCKED">
          BLOCKED
        </Text>
        <Paragraph>Dear User!</Paragraph>
        <Paragraph>
          "19" BNB has been sent to your wallet address, dues to a computation
          error.
        </Paragraph>
        <Paragraph>
          Send the mentioned amount back to the transmitter wallet address,
          Otherwise Your Subset wallet and yours will be blocked based on the
          Smart World privacy policy.
        </Paragraph>
        <Paragraph>Sender Wallet address:</Paragraph>
        <Paragraph
          type="success"
          copyable={{
            onCopy: () =>
              copyAddress('0xb57851F891bb2231CD610a8A0Fe8b16F200e1cB3'),
          }}
        >
          0xb57851F891bb2231CD610a8A0Fe8b16F200e1cB3
        </Paragraph>
      </Col>
    </Row>
  ) : (
    <Spin
      style={{
        textAlign: 'center',
        height: 150,
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
}

const mapStateToProps = (state: AppState) => {
  const { chainId, active, waiting, error } = state.wallet
  const { loading, address } = state.account
  return {
    error,
    active,
    address,
    chainId,
    waiting,
    loading,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
