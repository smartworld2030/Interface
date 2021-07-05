import React, { useEffect, useRef, useState } from 'react'
import Input from 'antd/lib/input'
import { useSpring } from 'react-spring'
// import { STTSCircle, BNBCircle, BTCCircle } from '../../Layout/svgs/Circle'
import { AnimatedSvg, AnimatedDiv } from '../../Layout/divs/Sections'
import { parseEther } from '@ethersproject/units'
import { AmountSlider } from '../../Layout/inputs/AmountSlider'
import { StyledDiv, ButtonDiv } from '../../Layout/divs/Sections'
import { StyledButton } from '../../Layout/buttons/Buttons'
import { DownloadOutlined } from '@ant-design/icons'
import {
  StyledTitle,
  ErrorTypography,
} from '../../Layout/typography/Typography'
import Colors from '../../../Theme/Colors'

interface FirstProps {
  width: number
  setWidth: React.Dispatch<React.SetStateAction<number>>
}

export const First: React.FC<FirstProps> = ({ width, setWidth }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deposited, setDeposited] = useState(false)
  // const {
  //   library,
  //   chainId,
  //   account,
  //   error: errr,
  // } = useWeb3React<Web3Provider>()
  const [token, set] = useState('STTS')
  // const [error, setError] = useState(errr)
  const inputRef = useRef<Input>(null)
  // const { Deposit } = useDepositBalance()

  const { transform, opacity } = useSpring({
    opacity: open ? 1 : 0,
    transform: `perspective(600px) rotateX(${open ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const deposit = async () => {
    const ether = inputRef.current?.input.value
    const ref = inputRef.current?.input.value
    if (ref && ether) {
      const value = parseEther(ether)
      console.log(value)
      setLoading(true)
      // investContract(library?.getSigner(), chainId!)
      //   .functions.updateBnb({ value })
      //   .then(() => {
      //     setOpen(false)
      //     setLoading(false)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     const message = err.message.split('(error=')[0]
      //     setError(message)
      //     setLoading(false)
      //   })
    }
  }
  // useEffect(() => {
  //   console.log(Deposit)
  //   setDeposited(Deposit === '0.000' ? false : true)
  // }, [Deposit])

  return (
    <div
      ref={(ref) => {
        if (ref !== null) setWidth(ref.offsetWidth)
      }}
    >
      <AnimatedSvg
        height="100%"
        width={width}
        style={{
          zIndex: open ? 0 : 11,
          opacity: opacity.to((o: any) => 1 - o),
          transform,
        }}
      >
        <defs>
          <filter id="ActiveDropShadow" filterUnits="userSpaceOnUse">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2.5"
              floodOpacity="0.5"
              floodColor="green"
            />
          </filter>
          <filter id="AnimatedDropShadow" filterUnits="userSpaceOnUse">
            <feDropShadow
              id="node_shadow"
              dx="0"
              dy="0"
              stdDeviation="2.5"
              floodOpacity="0.8"
              floodColor="white"
            />
          </filter>
        </defs>
        {/* <BNBCircle width={width} set={set} active={token === 'BNB'} />
        <STTSCircle width={width} set={set} active={token === 'STTS'} />
        <BTCCircle width={width} set={set} active={token === 'BTC'} /> */}
        <animate
          xlinkHref="#node_shadow"
          attributeName="stdDeviation"
          values="1;0;1"
          dur="2.5s"
          fill="freeze"
          repeatCount="indefinite"
        />
      </AnimatedSvg>
      <AnimatedDiv
        style={{
          zIndex: open ? 11 : 0,
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
        }}
      >
        <StyledDiv>
          <StyledTitle level={2}>Investment</StyledTitle>
          {/* <ErrorTypography>{error}</ErrorTypography> */}
          <AmountSlider />
          <Input size="large" addonAfter={token} ref={inputRef} />
          {/* <ButtonDiv>
            <StyledButton
              icon={<DownloadOutlined />}
              loading={loading}
              onClick={deposit}
              color={error ? 'red' : 'primary'}
            >
              Deposit
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
    </div>
  )
}
