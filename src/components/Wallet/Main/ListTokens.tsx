import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Colors from '../../../Theme/Colors'
import { Link, Text } from '@smartworld-libs/uikit'
import { AppState } from '../../../_types'
import { ethereum, truncate } from '../../../_helpers/api'
import info from '../../../_contracts/info'
import { Col, Row } from 'react-grid-system'
import bank from '../../../_contracts/bank'
import { tooShorter } from '../../../_helpers/constants'

interface SmartWorldAddressProps {}

type IProps = SmartWorldAddressProps & ReturnType<typeof mapStateToProps>

const SmartWorldAddress: React.FC<IProps> = ({ chainId, address, tokens }) => {
  const [account, setAccount] = useState('0x...')

  useEffect(() => {
    setAccount(tooShorter(address))
  }, [address])

  const requestAddToken = ({ address, symbol, decimals, image }) =>
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
  const addSttsToWallet = () => {
    let address = info[chainId].STTS
    let symbol = 'STTS'
    let decimals = info.decimals.STTS
    let image = 'https://i.postimg.cc/4yxyZ24s/Smart-World-Stock.png'
    requestAddToken({ address, symbol, decimals, image })
  }
  const addSttToWallet = () => {
    let address = info[chainId].STT
    let symbol = 'STT'
    let decimals = info.decimals.STT
    let image = 'https://i.postimg.cc/Ssqj1NwX/Smart-World-Token.png'
    requestAddToken({ address, symbol, decimals, image })
  }

  return (
    <Row direction="column" gutterWidth={0} style={{ fontSize: 10, width: '100%' }}>
      <Col xs={11} style={{ margin: 'auto' }}>
        <Row justify="between">
          <Link onClick={() => (account?.length > 10 ? setAccount(tooShorter(address)) : setAccount(address!))}>
            <Text as="p">
              <LeftEmptyRetangle color={account ? Colors.green : 'white'} />
              {account}
            </Text>
          </Link>
          <Link onClick={() => addSttToWallet()}>
            <Text as="p">
              {tokens.STT ? truncate(tokens.STT.toString(), 2) : 0} STT
              <RightEmptyRetangle />
            </Text>
          </Link>
        </Row>
      </Col>
      <Col xs={11} style={{ margin: 'auto' }}>
        <Row justify="between">
          <Link href={'https://bscscan.com/address/' + bank.address[56]} target="_blank" rel="noopener noreferrer">
            <Text as="p">
              <LeftRetangle />
              Smart World
            </Text>
          </Link>
          <Link target="_blank" rel="noopener noreferrer" href="https://smartworld.app/assets/whitepaper.pdf">
            <Text as="p">
              <LeftRetangle />
              WHITEPAPER
              <RightRetangle />
            </Text>
          </Link>
          <Link onClick={() => addSttsToWallet()}>
            <Text as="p">
              {tokens.STTS ? truncate(tokens.STTS.toString(), 2) : 0} STTS
              <RightEmptyRetangle />
            </Text>
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
    <path d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5" stroke={color} strokeWidth="0.1" />
  </svg>
)
const RightEmptyRetangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
    <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" stroke="white" strokeWidth="0.1" />
  </svg>
)
