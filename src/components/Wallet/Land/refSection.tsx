import ReferralButton from 'components/Layout/svgs/ReferralButton'
import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { Col, Row } from 'react-grid-system'
import QRCode from 'react-qr-code'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Colors from 'Theme/Colors'
import { successHandler } from '_helpers/alert'
import { AppState } from '_types'

interface ReferralSectionProps {}

type IProps = ReferralSectionProps & ReturnType<typeof mapStateToProps>

export const DetailSection: React.FC<IProps> = ({ address, ownedLands }) => {
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
        <Col xs={12} width="100%">
          <Row align="center" justify="around">
            <ReferralButton
              width={90}
              onClick={copyHandler}
              disable={ownedLands.length === 0}
            />
          </Row>
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    address: state.account.address,
    ownedLands: state.land.ownedLands,
  }
}

export default connect(mapStateToProps)(DetailSection as any)
