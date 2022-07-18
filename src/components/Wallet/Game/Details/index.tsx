import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../../_types'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import { investInformation } from '../../../../_actions/invest.actions'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'
import { requestAddToken } from 'components/Wallet/Main/ListTokens'
import Button from 'antd/lib/button'
import info from '_contracts/info'

interface IProps {}

type ReferralSectionProps = IProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<ReferralSectionProps> = ({
  address,
  chainId,
  tokens,
}) => {
  const [done, setDone] = useState(false)
  const { pathname } = useLocation()
  const link = `${window.location.origin}${pathname}?ref=${address}`

  const copyHandler = () => {
    if (!done) {
      copy(link)
      successHandler('Reffral Link Copied!')
      setDone(true)
    }
  }
  const addTokenToWallet = useCallback(
    (token) => {
      let address = info[chainId][token]
      let symbol = token
      let decimals = 0
      let image =
        token === 'STR'
          ? 'https://i.postimg.cc/SjWY1CTv/robot.png'
          : 'https://i.postimg.cc/sG9BBCGr/car.png'
      requestAddToken({ address, symbol, decimals, image })
    },
    [chainId]
  )

  return (
    <Row
      align="center"
      justify="around"
      direction="column"
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      {done ? (
        <QRCode
          size={150}
          value={link}
          bgColor={Colors.mainBackground}
          fgColor="white"
          onClick={() => setDone(false)}
          style={{ position: 'relative' }}
        />
      ) : (
        <>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <TokenValue
                value={tokens.STC}
                token="STC"
                title="Your Car Stock"
              />
              <TokenValue
                value={tokens.STR}
                token="STR"
                title="Your Robot Stock"
              />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <ReferralButton width={90} onClick={copyHandler} />
            </Row>
          </Col>
          <Col xs={12} width="100%">
            <Row align="center" justify="around">
              <Col xs={6} width="100%">
                <Button
                  type="text"
                  title="add token"
                  onClick={() => addTokenToWallet('STC')}
                  style={{ display: 'inline-flex' }}
                >
                  Add&nbsp;
                  <p style={{ color: Colors.green }}>STC</p>
                </Button>
              </Col>
              <Col xs={6} width="100%">
                <Button
                  type="text"
                  title="add token"
                  onClick={() => addTokenToWallet('STR')}
                  style={{ display: 'inline-flex' }}
                >
                  Add&nbsp;
                  <p style={{ color: Colors.green }}>STR</p>
                </Button>
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address, error } = state.account
  const {
    data: { STC, STR },
  } = state.stock
  const chainId = state.wallet.chainId
  return {
    address,
    tokens: { STC, STR },
    chainId,
    error,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  investInformation: bindActionCreators(investInformation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection)
