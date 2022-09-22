import React from 'react'
import { Col, Row } from 'react-grid-system'

interface NFTProps {
  isMobile: boolean
}

const NFT: React.FC<NFTProps> = () => {
  return (
    <Row justify="around" align="center" direction="column">
      <Row
        justify="around"
        align="center"
        style={{ minHeight: 100, margin: '0 10px' }}
      >
        <Col>You have no NFTs yet. Go to the Marketplace to buy some.</Col>
      </Row>
    </Row>
  )
}

export default NFT
