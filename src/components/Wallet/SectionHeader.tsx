import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Text, Button, useWalletModal } from '@smartworld-libs/uikit'
import useAuth from 'hooks/useAuth'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Menu from 'components/Menu'

interface SectionHeaderProps {
  title: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const { account } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Row justify="between" align="center">
      <Col>{/* <Menu /> */}</Col>
      <Col>
        <Text size="10" style={{ textAlign: 'center', margin: 0 }}>
          {title}
        </Text>
      </Col>
      <Col>
        <Button
          variant="secondary"
          scale="xs"
          style={{ float: 'right', margin: 0 }}
          onClick={() => (account ? logout() : onPresentConnectModal())}
        >
          {account ? 'Disconnect' : 'Connect'}
        </Button>
      </Col>
    </Row>
  )
}
