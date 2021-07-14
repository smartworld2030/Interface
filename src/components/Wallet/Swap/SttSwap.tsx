import React, { useState } from 'react'
import { Button, Typography } from 'antd'
import Input from 'antd/lib/input'
import { ArrowDownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../_types'
import { swapContract } from '../../../_actions/wallet.actions'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { formatToString, truncate } from '../../../_helpers/api'
import { BigNumber } from '@ethersproject/bignumber'
import { requestSwap } from '../../../_actions/swap.actions'
import Colors from '../../../Theme/Colors'

interface IProps {
  isMobile: boolean
}

type SttSwapProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

let tokenTimer
let secondTimer

const params = ['allowed', 'max', 'min', 'slippage']

const SttSwap: React.FC<SttSwapProps> = ({ isMobile, tokens, requestSwap }) => {
  const [result, setResult] = useState({
    token: '',
    allowed: '0',
    max: '0',
    min: '0',
    price: '0',
    decimals: 0,
  })

  const [input1, setInput1] = useState({ value: '0', big: parseUnits('0') })
  const [input2, setInput2] = useState({ value: '0', big: parseUnits('0') })

  const fetchInput2 = (value) => {
    const big = parseUnits(value, 8)
    setInput2({ value, big })
    clearTimeout(secondTimer)
    if (Number(value) > 0)
      secondTimer = setTimeout(() => {
        swapContract
          .STTStoSTTPrice()
          .then((res) => {
            console.log(res)
            const price = formatUnits(res, 8)
            const stt = truncate(Number(price) * value + '', 4)
            fetchInput1(stt, parseUnits(stt, 8))
          })
          .catch((err) => {
            console.log(err)
          })
      }, 200)
  }

  const fetchInput1 = (value: string, bigNumber?: BigNumber) => {
    const big = parseUnits(value, 8)
    setInput1({ value, big })
    clearTimeout(tokenTimer)
    const values = {
      allowed: '0',
      max: '0',
      min: '0',
      price: '0',
      decimals: 0,
    }
    if (Number(value) > 0) {
      tokenTimer = setTimeout(async () => {
        values.price = formatUnits(await swapContract.STTStoSTTPrice(), 0)
        swapContract
          .STTtoSTTSInfo(bigNumber ? bigNumber : big, 0)
          .then((res) => {
            params.forEach((param) => {
              if (param !== 'slippage')
                values[param] = truncate(formatUnits(res[param], 8), 4)
            })
            values.decimals = 8
            setResult({ ...values, token: 'STTS' })
            const value = bigNumber
              ? truncate(formatUnits(bigNumber, 8), 4)
              : truncate(formatUnits(res.allowed, 8), 4)
            bigNumber
              ? setInput1({ value, big: res.allowed })
              : setInput2({ value, big: res.allowed })
          })
          .catch((err) => {
            console.log(err)
          })
      }, 200)
    }
  }

  const inputHandler = (value, index) => {
    if (value)
      if (index) {
        fetchInput2(value)
      } else {
        fetchInput1(value)
      }
    else {
      setInput1({ value: '', big: parseUnits('0') })
      setInput2({ value: '', big: parseUnits('0') })
    }
  }

  const maxHandler = (token, index) => {
    console.log(token, index)
    inputHandler(truncate(formatToString(tokens[token]), 4), index)
  }
  const swapButtonHandler = () => {
    console.log(input1, input2)
    requestSwap('safeSTTSwap', [
      input1.big,
      result.price,
      100,
      Math.floor(Date.now() / 1000) + 180,
    ])
  }

  return (
    <Row
      direction="column"
      justify="around"
      style={{ minHeight: isMobile ? 1200 : 300 }}
      gutterWidth={4}
    >
      <Col xs={12}>
        <Input
          type="number"
          onChange={({ target }) => inputHandler(target.value, 0)}
          placeholder="0"
          value={input1.value}
          suffix="STT"
          addonAfter={
            <span
              style={{ color: Colors.green }}
              onClick={() => maxHandler('STT', 0)}
              className="input-max-button"
            >
              MAX
            </span>
          }
        />
      </Col>
      <Col xs={12}>
        <Button disabled>
          <ArrowDownOutlined />
        </Button>
      </Col>
      <Col xs={12}>
        <Input
          type="number"
          step={0.01}
          onChange={({ target }) => inputHandler(target.value, 1)}
          placeholder="0"
          value={input2.value}
          suffix="STTS"
        />
      </Col>
      <Col xs={12}>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Estimated:</Typography>
          <Typography>
            {result.allowed} {result.token}
          </Typography>
        </Row>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Min:</Typography>
          <Typography>
            {result.min} {result.token}
          </Typography>
        </Row>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Max:</Typography>
          <Typography>
            {result.max} {result.token}
          </Typography>
        </Row>
      </Col>
      <Row justify="around">
        <Col xs={6}>
          <Button
            onClick={swapButtonHandler}
            disabled={
              input2.value === '0' || input1.value === '0' || !!!input1.value
            }
          >
            Swap STT for STTS
          </Button>
        </Col>
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
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  requestSwap: bindActionCreators(requestSwap, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SttSwap)
