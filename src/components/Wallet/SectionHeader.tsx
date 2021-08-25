import React from 'react'
import Title from 'antd/lib/typography/Title'
import { Row, Col } from 'react-grid-system'
import Button from 'antd/lib/button'
import useAuth from 'hooks/useAuth'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWalletModal } from '@smartworld-libs/uikit'

interface SectionHeaderProps {
  title: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const { account } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Row justify="between" align="center">
      <Col></Col>
      <Col>
        <Title style={{ textAlign: 'center', margin: 0 }} level={5}>
          {title}
        </Title>
      </Col>
      <Col>
        <Button
          type="link"
          style={{ float: 'right', margin: 0 }}
          onClick={() => (account ? logout() : onPresentConnectModal())}
        >
          {account ? 'Disconnect' : 'Connect'}
        </Button>
      </Col>
    </Row>
  )
}
