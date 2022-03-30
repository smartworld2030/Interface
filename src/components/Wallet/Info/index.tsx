import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-grid-system'
import { AppState } from '../../../_types'
import Button from 'antd/lib/button'
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
interface IProps {
  isMobile: boolean
}

type InfoProps = IProps & ReturnType<typeof mapStateToProps>

const Info: React.FC<InfoProps> = () => {
  return (
    <Row justify="around" align="center" direction="column">
      <Row justify="around" align="center" style={{ minHeight: 100 }}>
        <Button
          type="primary"
          shape="circle"
          className="whitepaper"
          target="_blank"
          rel="noopener noreferrer"
          href="https://smartworld.app/assets/whitepaper.pdf"
        >
          <FileSearchOutlined />
        </Button>
      </Row>
      <Row
        justify="around"
        align="center"
        style={{ minHeight: 200, width: '100%' }}
      >
        <Col xs={12} md={2}></Col>
        <Col xs={12} md={4}>
          <Col xs={12}>
            <Row justify="around">
              <Button
                type="primary"
                shape="circle"
                icon={<FileDoneOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://bscscan.com/address/0xeB2F87B4fF2C35bf1a56B97bAd9bd8Bbf06768bA"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CmcIcon />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://coinmarketcap.com/"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SwapOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://pancakeswap.finance/swap?exactField=input&exactAmount=1&outputCurrency=0x88469567A9e6b2daE2d8ea7D8C77872d9A0d43EC"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<MailOutlined />}
                size="large"
                href="mailto:info@smartworld.app"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<GithubOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/smartworld2030"
              />
            </Row>
          </Col>
        </Col>
        <Col xs={12} md={4}>
          <Col xs={12}>
            <Row justify="around">
              <Button
                type="primary"
                shape="circle"
                icon={<TelegramIcon />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/smart_world_project"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<TwitterOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/smart_world_app"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<MediumSquareFilled />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://smartworldapp.medium.com/"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<InstagramOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/smartworld.app/"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<GlobalOutlined />}
                size="large"
                target="_blank"
                rel="noopener noreferrer"
                href="https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/user/Smart_world_project"
              />
            </Row>
          </Col>
        </Col>
        <Col xs={12} md={2}></Col>
      </Row>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, error, address } = state.account
  const { chainId } = state.wallet
  return {
    chainId,
    address,
    tokens,
    error,
  }
}

export default connect(mapStateToProps)(Info)
