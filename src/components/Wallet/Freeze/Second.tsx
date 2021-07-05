import React, { useEffect, useState } from 'react'
import { shorter } from '../../../_helpers/constants'
import Typography from 'antd/lib/typography'
import {
  StyledTitle,
  ErrorTypography,
} from '../../Layout/typography/Typography'
import { useSpring } from 'react-spring'
import Colors from '../../../Theme/Colors'
import { DownloadOutlined } from '@ant-design/icons'
import WithdrawSection from '../Investment/Withdraw'
import { StyledButton } from '../../Layout/buttons/Buttons'
import { StyledDiv, ButtonDiv } from '../../Layout/divs/Sections'
import { AnimatedSvg, AnimatedDiv } from '../../Layout/divs/Sections'

interface SecondProps {
  width: number
  isMobile: boolean
}
const refferalData = [
  { id: 0, enabled: true, point: 1265196 },
  { id: 1, enabled: false },
  { id: 2, enabled: false },
]

export const Second: React.FC<SecondProps> = ({ width, isMobile }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deposited, setDeposited] = useState(false)
  // const {
  //   library,
  //   chainId,
  //   account,
  //   error: errr,
  // } = useWeb3React<Web3Provider>()

  // const [error, setError] = useState(errr)
  // const { Deposit } = useDepositBalance()
  // const { hourly, referral } = useInvestment()
  const withdraw = async () => {
    setLoading(true)
    // investContract(library?.getSigner(), chainId)
    //   .functions.withdrawInterest()
    //   .then(() => {
    //     setOpen(false)
    //     setLoading(false)
    //   })
    //   .catch((err) => {
    //     const message = err.message.split('"message":')[1]
    //     setError(message)
    //     setLoading(false)
    //   })
  }
  const { transform, opacity } = useSpring({
    opacity: open ? 1 : 0,
    transform: `perspective(600px) rotateX(${open ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  // useEffect(() => {
  //   console.log(Deposit)
  //   setDeposited(Deposit === '0.000' ? false : true)
  // }, [Deposit])

  return (
    <>
      {deposited ? (
        <>
          <AnimatedSvg
            height="100%"
            width={width}
            style={{
              zIndex: open ? 0 : 11,
              opacity: opacity.to((o: any) => 1 - o),
              transform,
            }}
          >
            {/* <BigCircle
              mode="WITHDRAW"
              width={width}
              hourly={hourly}
              referral={referral}
              setOpen={() => setOpen(true)}
            />
            <animate
              xlinkHref="#node_shadow"
              attributeName="stdDeviation"
              values="1;7;1"
              dur="2.5s"
              fill="freeze"
              repeatCount="indefinite"
            /> */}
          </AnimatedSvg>
          <AnimatedDiv
            style={{
              zIndex: open ? 11 : 0,
              opacity,
              transform: transform.to((t) => `${t} rotateX(180deg)`),
            }}
          >
            <StyledDiv>
              {/* <Typography>{shorter(account)}</Typography>
              <StyledTitle level={2}>Withdraw</StyledTitle>
              <ErrorTypography>{error}</ErrorTypography>
              <Typography>{Deposit}</Typography>
              <ButtonDiv>
                <StyledButton
                  icon={<DownloadOutlined />}
                  loading={loading}
                  onClick={withdraw}
                  color={error ? 'red' : 'primary'}
                >
                  Withdraw
                </StyledButton>
                <StyledButton
                  hoverColor={Colors.red}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </StyledButton>
              </ButtonDiv> */}
            </StyledDiv>
          </AnimatedDiv>
        </>
      ) : (
        <p>Not Deposited!</p>
      )}
    </>
  )
}
