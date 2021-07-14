import React, { useEffect, useState, Fragment } from 'react'
import { Button, Typography } from 'antd'
import Input from 'antd/lib/input'
import { ArrowDownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../../../_types'
import { swapContract } from '../../../_actions/wallet.actions'
import { truncate, formaterNumber, formatToString } from '../../../_helpers/api'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { BigNumber } from '@ethersproject/bignumber'
import { requestSwap } from '../../../_actions/swap.actions'
import Colors from '../../../Theme/Colors'

interface IProps {
  isMobile: boolean
}

const params = ['allowed', 'max', 'min', 'slippage']

type BnbSwapProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

let tokenTimer
let secondTimer

const BnbSwap: React.FC<BnbSwapProps> = ({ isMobile, tokens, requestSwap }) => {
  const [inputs, setInputs] = useState([
    {
      name: 'BNB',
      method: 'BNBtoSTTSInfo',
      decimals: 18,
    },
    {
      name: 'STTS',
      method: 'STTStoBNBInfo',
      decimals: 8,
    },
  ])

  const [result, setResult] = useState({
    token: '',
    allowed: '0',
    max: '0',
    min: '0',
    slippage: 0,
    decimals: 0,
  })

  const [input1, setInput1] = useState({ value: '0', big: parseUnits('0') })
  const [input2, setInput2] = useState({ value: '0', big: parseUnits('0') })

  useEffect(() => {
    inputHandler(input2.value, 0)
    /* eslint-disable */
  }, [inputs])

  const fetchInput2 = (value) => {
    const big = parseUnits(value, inputs[1].decimals)
    setInput2({ value, big })
    clearTimeout(secondTimer)
    if (Number(value) > 0)
      secondTimer = setTimeout(() => {
        swapContract[inputs[1].method](big)
          .then((res) => {
            fetchInput1(
              truncate(formatUnits(res.min, inputs[0].decimals), 4),
              res.min
            )
          })
          .catch((err) => {
            console.log(err)
          })
      }, 200)
  }

  const fetchInput1 = (value: string, bigNumber?: BigNumber) => {
    const big = parseUnits(value, inputs[0].decimals)
    setInput1({ value, big })
    clearTimeout(tokenTimer)
    const values = {
      allowed: '0',
      max: '0',
      min: '0',
      slippage: 0,
      decimals: 0,
    }
    if (Number(value) > 0) {
      tokenTimer = setTimeout(() => {
        swapContract[inputs[0].method](bigNumber ? bigNumber : big)
          .then((res) => {
            params.map((param) => {
              if (param === 'slippage') {
                values.slippage = formaterNumber(res[param])
              } else
                values[param] = truncate(
                  formatUnits(res[param], inputs[1].decimals),
                  4
                )
            })
            values.decimals = inputs[0].decimals
            setResult({ ...values, token: inputs[1].name })
            const value = bigNumber
              ? truncate(formatUnits(bigNumber, inputs[0].decimals), 4)
              : truncate(formatUnits(res.min, inputs[1].decimals), 4)
            bigNumber
              ? setInput1({ value, big: res.min })
              : setInput2({ value, big: res.min })
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

  const tokenChanger = (token) => {
    setInputs((oldTokens) => [...oldTokens.slice(1), token])
  }

  const swapButtonHandler = () => {
    console.log(result.token)
    console.log(result.token, input1.big)
    if (result.token === 'STTS') {
      requestSwap('safeBnbSwap', [
        '0',
        Math.floor(Date.now() / 1000) + 180,
        {
          value: input1.big,
        },
      ])
    } else if (result.token === 'BNB') {
      requestSwap('safeBnbSwap', [
        input1.big,
        Math.floor(Date.now() / 1000) + 180,
      ])
    }
  }
  return (
    <Row
      direction="column"
      justify="around"
      style={{ minHeight: isMobile ? 1200 : 300 }}
      gutterWidth={4}
    >
      {inputs.map((token, index) => (
        <Fragment key={token.method}>
          <Col xs={12}>
            <Input
              type="number"
              step={0.001}
              onChange={({ target }) => inputHandler(target.value, index)}
              placeholder="0"
              value={index ? input2.value : input1.value}
              suffix={token.name}
              addonAfter={
                <span
                  style={{ color: Colors.green }}
                  onClick={() => maxHandler(token.name, index)}
                  className="input-max-button"
                >
                  MAX
                </span>
              }
            />
          </Col>
          {!index && (
            <Col xs={12}>
              <Button onClick={() => tokenChanger(token)}>
                <ArrowDownOutlined />
              </Button>
            </Col>
          )}
        </Fragment>
      ))}
      <Col xs={12}>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Price Impact:</Typography>
          <Typography>{result.slippage / 10}%</Typography>
        </Row>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Estimated:</Typography>
          <Typography>
            {result.min} {result.token}
          </Typography>
        </Row>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Min:</Typography>
          <Typography>
            {result.allowed} {result.token}
          </Typography>
        </Row>
        <Row justify="between" gutterWidth={-80}>
          <Typography>Max:</Typography>
          <Typography>
            {result.max} {result.token}
          </Typography>
        </Row>
      </Col>
      <Row justify="center">
        <Col xs={6}>
          <Button
            onClick={swapButtonHandler}
            disabled={
              result.slippage > 50 ||
              input2.value === '0' ||
              input1.value === '0' ||
              !!!input1.value
            }
          >
            Swap {inputs[0].name} for {inputs[1].name}
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

export default connect(mapStateToProps, mapDispatchToProps)(BnbSwap)
