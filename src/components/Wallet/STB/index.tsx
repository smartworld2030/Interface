import React from 'react'
import { Row, Col } from 'react-grid-system'
import Logo from 'assets/Logo.png'

interface STBProps {
  isMobile: boolean
}

const STB: React.FC<STBProps> = ({ isMobile }) => {
  return (
    <Row
      justify="around"
      align="center"
      style={{
        fontSize: '15px',
        minHeight: isMobile ? 300 : 300,
        textShadow: '1px 1px 2px black',
      }}
    >
      <div
        style={{
          position: 'absolute',
          filter: 'blur(4px) grayscale(0.2)',
          height: '40vh',
          width: '100vw',
          backgroundSize: '200px 200px',
          backgroundImage: `url(${Logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <Col xs={12} md={2}></Col>
      <Col xs={12} md={4}>
        Coming Soon!
        <hr /> STB is the future stable coin. STB is issued only by the STT payment. The STB token is generated from 99
        percent of the STT payment which is always worth as 100 SATOSHI or one BITS. <br />1 STB = 100 Satoshi
      </Col>
      <Col xs={12} md={2}></Col>
    </Row>
  )
}

export default STB
