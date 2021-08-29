// @ts-nocheck
import { connect } from 'react-redux'
import { Col, Row } from 'react-grid-system'
import { AppState } from '../../../_types'
import { IconButton } from '@smartworld-libs/uikit'
import {
  GithubOutlined,
  MediumSquareFilled,
  GlobalOutlined,
  FileDoneOutlined,
  InstagramOutlined,
  TwitterOutlined,
  SwapOutlined,
  FileSearchOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { TelegramIcon } from './TelegramIcon'
import { CmcIcon } from './CmcIcon'

interface InfoProps {
  isMobile: boolean
}

const Info: React.FC<InfoProps> = () => {
  return (
    <Row justify="around" align="center" direction="column">
      <Row justify="around" align="center" style={{ minHeight: 100 }}>
        <IconButton
          as="a"
          variant="primary"
          shape="circle"
          className="whitepaper"
          target="_blank"
          rel="noopener noreferrer"
          href="https://smartworld.app/assets/whitepaper.pdf"
        >
          <FileSearchOutlined />
        </IconButton>
      </Row>
      <Row justify="around" align="center" style={{ minHeight: 150, width: '100%' }}>
        <Col xs={12} md={2}></Col>
        <Col xs={12} md={4}>
          <Col xs={12}>
            <Row justify="around">
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://bscscan.com/address/0xbBe476b50D857BF41bBd1EB02F777cb9084C1564"
              >
                <FileDoneOutlined />
              </IconButton>
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://coinmarketcap.com/"
              >
                <CmcIcon />
              </IconButton>
              <IconButton
                as="a"
                variant="text"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://pancakeswap.finance/swap?exactField=input&exactAmount=1&outputCurrency=0x88469567A9e6b2daE2d8ea7D8C77872d9A0d43EC"
              >
                <SwapOutlined />
              </IconButton>
              <IconButton as="a" variant="primary" shape="circle" scale="lg" href="mailto:info@smartworld.app" />
              <IconButton
                as="a"
                variant="pria<MailOutlined /></IconButton>ry"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/smartworld2030"
              >
                <GithubOutlined />
              </IconButton>
            </Row>
          </Col>
        </Col>
        <Col xs={12} md={4}>
          <Col xs={12}>
            <Row justify="around">
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/smart_world_project"
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/smart_world_app"
              >
                <TwitterOutlined />
              </IconButton>
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://smartworldapp.medium.com/"
              >
                <MediumSquareFilled />
              </IconButton>
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/smartworld.app/"
              >
                <InstagramOutlined />
              </IconButton>
              <IconButton
                as="a"
                variant="primary"
                shape="circle"
                scale="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/user/Smart_world_project"
              >
                <GlobalOutlined />
              </IconButton>
            </Row>
          </Col>
        </Col>
        <Col xs={12} md={2}></Col>
      </Row>
    </Row>
  )
}

export default Info
