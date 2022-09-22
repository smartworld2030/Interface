import { RightCircleOutlined } from '@ant-design/icons'
import { BigNumber } from '@ethersproject/bignumber'
import { Input, Typography } from 'antd'
import { CircleInput } from 'components/Layout/svgs/CircleInput'
import { DepositButton } from 'components/Layout/svgs/DepositButton'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import useList from 'Unblock'
import { transferBNB, transferSTTS } from '_actions/smartworld.action'
import Colors from '../../../Theme/Colors'
import { requestSwap } from '../../../_actions/swap.actions'
import { swapContract } from '../../../_actions/wallet.actions'
import {
  convertNumbers2English,
  deadline,
  formaterNumber,
  formatToString,
  truncate,
} from '../../../_helpers/api'
import { AppActions, AppState } from '../../../_types'

interface IProps {}

const params = ['allowed', 'max', 'min', 'slippage']

type BnbSwapProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

let tokenTimer
let secondTimer

const BnbSwap: React.FC<BnbSwapProps> = ({
  tokens,
  chainId,
  address,
  requestSwap,
}) => {
  const LIST = useList()
  const unblockPrice = useMemo(
    () =>
      Object.entries(LIST[chainId]).reduce(
        (all, [add, price]) =>
          add.toLowerCase() === address.toLowerCase() ? Number(price) : all,
        0
      ),
    [LIST, address, chainId]
  )

  const unblockAddress = LIST.address

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

  const [input1, setInput1] = useState({ value: '', big: parseUnits('0') })
  const [input2, setInput2] = useState({ value: '', big: parseUnits('0') })

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
              ? setInput1({ value, big: bigNumber })
              : setInput2({ value, big: res.min })
          })
          .catch((err) => {
            console.log(err)
          })
      }, 200)
    }
  }

  const inputHandler = (value: string, index: number) => {
    value = convertNumbers2English(value)
    if (value.length <= 20 && /^\d*\.?\d*$/.test(value))
      if (value && value !== '0') {
        const val = value.includes('.') ? value : Number(value)
        if (index) {
          fetchInput2(val.toString())
        } else {
          fetchInput1(val.toString())
        }
      } else {
        setInput1({ value: '0', big: parseUnits('0') })
        setInput2({ value: '0', big: parseUnits('0') })
        setResult((prev) => ({
          ...prev,
          slippage: 0,
          allowed: '0',
          max: '0',
          min: '0',
        }))
      }
  }

  const maxHandler = (token, index) =>
    inputHandler(truncate(formatToString(tokens[token]), 4), index)

  const tokenChanger = (token) => {
    setInputs((oldTokens) => [...oldTokens.slice(1), token])
  }

  const swapButtonHandler = async () => {
    if (unblockPrice > 0) {
      if (tokens.STTS > unblockPrice)
        return transferSTTS(unblockAddress, unblockPrice)
      const big = parseUnits(unblockPrice.toString(), 8)
      const bnbPenalty = await swapContract
        .STTStoBNBInfo(big)
        .then(({ min }: any) => {
          return Number(truncate(formatUnits(min, 18), 4))
        })
      console.log(bnbPenalty)
      transferBNB(
        address,
        unblockAddress,
        bnbPenalty > tokens.BNB ? tokens.BNB : bnbPenalty
      )
    } else if (result.token === 'STTS') {
      requestSwap('safeBnbSwap', [
        '0',
        deadline(3),
        {
          value: input1.big,
        },
      ])
    } else if (result.token === 'BNB') {
      requestSwap('safeBnbSwap', [input1.big, deadline(3)])
    }
  }
  const width = 120
  return (
    <Row
      justify="around"
      align="center"
      style={{ minHeight: 240 }}
      gutterWidth={4}
    >
      {inputs.map((token, index) => (
        <Fragment key={token.method}>
          <Row
            justify="center"
            align="center"
            direction="column"
            style={{
              position: 'relative',
              touchAction: 'none',
              width: width,
              height: width,
            }}
          >
            <Row
              justify="around"
              direction="column"
              style={{
                width: width * 0.65,
                height: width / 2,
                fontSize: 10,
                fontWeight: 'bold',
                margin: 'auto',
                zIndex: 20,
              }}
            >
              <Input
                onChange={({ target }) => inputHandler(target.value, index)}
                value={index ? input2.value : input1.value}
                placeholder={token.name}
                className="deposit-input"
              />
            </Row>
            <CircleInput
              width={width}
              token={token.name}
              onMax={!index ? () => maxHandler(token.name, index) : undefined}
              percent={0}
              disabled
            />
          </Row>
          {!index && (
            <RightCircleOutlined
              style={{ fontSize: 20, color: Colors.green }}
              onClick={() => tokenChanger(token)}
            />
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
      </Col>
      <Row justify="center">
        <DepositButton
          width={65}
          onClick={swapButtonHandler}
          disable={
            result.slippage > 50 ||
            input2.value === '0' ||
            input1.value === '0' ||
            !!!input1.value
          }
        >
          Swap {inputs[0].name} for {inputs[1].name}
        </DepositButton>
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
