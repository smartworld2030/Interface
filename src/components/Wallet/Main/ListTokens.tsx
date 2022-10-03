import { CopyOutlined } from '@ant-design/icons'
import Typography from 'antd/lib/typography'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import Colors from 'Theme/Colors'
import info from '_contracts/info'
import invest03 from '_contracts/invest03'
import land from '_contracts/land'
import { ethereum, truncate } from '_helpers/api'
import { copyAddress, tooShorter } from '_helpers/constants'
import { AppState } from '_types'

const { Paragraph, Link } = Typography

interface SmartWorldAddressProps {
  smartLand?: boolean
}

type IProps = SmartWorldAddressProps & ReturnType<typeof mapStateToProps>

export const requestAddToken = ({ address, symbol, decimals, image }) =>
  new Promise((resolve, reject) => {
    ethereum
      ?.request({
        method: 'wallet_watchAsset',
        params: {
          // @ts-ignore
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      })
      .then((result) => resolve(result))
      .catch((err) => {
        reject(err)
      })
  })

const SmartWorldAddress: React.FC<IProps> = ({
  smartLand,
  chainId,
  address,
  tokens,
}) => {
  const [account, setAccount] = useState('0x...')

  useEffect(() => {
    setAccount(tooShorter(address))
  }, [address])

  const addSttsToWallet = () => {
    let address = info[chainId].STTS
    let symbol = 'STTS'
    let decimals = info.decimals.STTS
    let image = 'https://i.postimg.cc/4yxyZ24s/Smart-World-Stock.png'
    requestAddToken({ address, symbol, decimals, image })
  }

  return (
    <Row
      direction="column"
      gutterWidth={0}
      style={{ fontSize: 10, width: '100%' }}
    >
      <Col xs={11} style={{ margin: 'auto' }}>
        <Row justify="between">
          <Link
            onClick={() =>
              account?.length > 10
                ? setAccount(tooShorter(address))
                : setAccount(address!)
            }
          >
            <Paragraph>
              <LeftEmptyRetangle color={account ? Colors.green : 'white'} />
              {account}
            </Paragraph>
          </Link>
          {smartLand ? (
            <Link
              onClick={() =>
                copyAddress(land.address[chainId], 'STL address Copied!')
              }
            >
              <Paragraph>
                {tooShorter(land.address[chainId])}{' '}
                <CopyOutlined color={Colors.green} />
                <RightEmptyRetangle />
              </Paragraph>
            </Link>
          ) : (
            <Link
              onClick={() =>
                copyAddress(info[chainId].STTS, 'STTS address Copied!')
              }
            >
              <Paragraph>
                {tooShorter(info[chainId]?.STTS)}{' '}
                <CopyOutlined color={Colors.green} />
                <RightEmptyRetangle />
              </Paragraph>
            </Link>
          )}
        </Row>
      </Col>
      <Col xs={11} style={{ margin: 'auto' }}>
        <Row justify="between">
          {smartLand ? (
            <Link
              href={'https://bscscan.com/address/' + land.address[56]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Paragraph>
                <LeftRetangle />
                Smart Land
              </Paragraph>
            </Link>
          ) : (
            <Link
              href={'https://bscscan.com/address/' + invest03.address[56]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Paragraph>
                <LeftRetangle />
                Smart World
              </Paragraph>
            </Link>
          )}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://smartworldapp.medium.com/smart-world-42eb6851ea5c"
          >
            <Paragraph>
              <LeftRetangle />
              WHITEPAPER
              <RightRetangle />
            </Paragraph>
          </Link>
          <Link onClick={() => addSttsToWallet()}>
            <Paragraph>
              {tokens.STTS ? truncate(tokens.STTS.toString(), 2) : 0} STTS
              <RightEmptyRetangle />
            </Paragraph>
          </Link>
        </Row>
      </Col>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { address, tokens } = state.account
  const { chainId } = state.wallet
  return {
    chainId,
    address,
    tokens,
  }
}
export default connect(mapStateToProps)(SmartWorldAddress)

const LeftRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5" fill={Colors.green} />
  </svg>
)
const RightRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" fill={Colors.green} />
  </svg>
)
const LeftEmptyRetangle = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path
      d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5"
      stroke={color}
      strokeWidth="0.1"
    />
  </svg>
)
const RightEmptyRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" stroke="white" strokeWidth="0.1" />
  </svg>
)
