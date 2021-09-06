import React, { useState } from 'react'
import { Row, Col } from 'react-grid-system'
import { useLocation } from 'react-router-dom'
import ReferralButton from '../../../Layout/svgs/ReferralButton'
import { TokenValue } from '../../../Layout/typography/Tokens'
import copy from 'copy-to-clipboard'
import QRCode from 'react-qr-code'
import Colors from '../../../../Theme/Colors'
import { successHandler } from '../../../../_helpers/alert'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useBankDollars, useSttPrice } from 'state/bank/hooks'
import { useUserInvestDetails } from 'state/invest/hooks'

interface ReferralSectionProps {}

export const DetailSection: React.FC<ReferralSectionProps> = ({}) => {
  const { account } = useActiveWeb3React()
  const {
    users: { refPercent },
    calculateInterest: { referral, hourly },
    userBalances: { satoshi },
  } = useUserInvestDetails()
  const { stt } = useBankDollars()
  const sttPrice = useSttPrice()

  const [done, setDone] = useState(false)
  const { pathname } = useLocation()
  const link = `${window.location.origin}${pathname}?ref=${account}`

  const value = (((+referral + +hourly) / 10 ** 8) * Number(stt)).toFixed()

  const copyHandler = () => {
    if (!done) {
      copy(link)
      successHandler('Reffral Link Copied!')
      setDone(true)
    }
  }
  const calcSatoshi = () => ((+referral + +hourly) / 10 ** 8) * +sttPrice

  // const calcHourly = () => depositDetails.reduce((items, item) => items + Number(item.reward), 0) / 10 ** 8

  return (
    <Row
      align="center"
      justify="around"
      direction="column"
      style={{
        width: '100%',

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
        <ReferralButton width={90} onClick={copyHandler} disable={satoshi === '0'} />
      )}
    </Row>
  )
}

export default DetailSection
