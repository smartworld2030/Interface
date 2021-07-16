import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-grid-system'
import { AppState } from '../../../_types'
import Button from 'antd/lib/button'
import {
  SendOutlined,
  GithubOutlined,
  MediumOutlined,
  GlobalOutlined,
  FileDoneOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
interface IProps {
  isMobile: boolean
}

type InfoProps = IProps & ReturnType<typeof mapStateToProps>

const Info: React.FC<InfoProps> = ({ isMobile }) => {
  return (
    <Row
      justify="around"
      align="center"
      style={{ minHeight: isMobile ? 300 : 300 }}
    >
      <Col xs={12} md={3}></Col>
      <Col xs={12} md={3}>
        <Row justify="around">
          <Button
            type="primary"
            shape="circle"
            icon={<FileDoneOutlined />}
            size="large"
            target="_blank"
            rel="noopener noreferrer"
            href="https://bscscan.com/address/0xbBe476b50D857BF41bBd1EB02F777cb9084C1564"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<GithubOutlined />}
            size="large"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/smartworldproject"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            size="large"
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/smart_world_project"
          />
        </Row>
      </Col>
      <Col xs={12} md={3}>
        <Row justify="around">
          <Button
            type="primary"
            shape="circle"
            icon={<MediumOutlined />}
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
            href="https://www.instagram.com/smart_world_project/"
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
      <Col xs={12} md={3}></Col>
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