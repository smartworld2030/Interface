import React, { useEffect, useState } from 'react'
import { Button, Input, Typography } from 'antd'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import swap from '../../../_contracts/swap'
import AccountAddress from '../Global/AccountAddress'
import { AppActions, AppState } from '../../../_types'
import { requestSwapBnb } from '../../../_actions/swap.actions'
import { swapContract } from '../../../_actions/wallet.actions'
import { formaterNumber, formatToString } from '../../../_helpers/api'

interface IProps {
  isMobile: boolean
}

const delay = 30

type SwapProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Swap: React.FC<SwapProps> = ({ isMobile, chainId }) => {
  const [bnbValue, setBnbValue] = useState(0)
  const [sttsValue, setSttsValue] = useState(0)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let timer
    clearInterval(timer)

    timer = setInterval(() => {
      swapContract
        .getAmountsIn(
          formatToString(1, swap.decimals.bnb),
          swap.pair[chainId].stts
        )
        .then((result) => {
          console.log(formaterNumber(result[0], 8))
          setPrice(formaterNumber(result[0], 8))
        })
        .catch((err) => {
          console.log(err)
        })
    }, delay * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [chainId])

  const bnbInputHandler = ({ target }) => {
    setBnbValue(target.value)
    // swapContract
    //   .getAmountsIn(target.value, swap.pair[chainId].bnb)
    //   .then((result) => {
    //     console.log(formaterNumber(result[0], 8))
    //     setSttsValue(formaterNumber(result[0], 8))
    //   })
    //   .catch((err) => {
    //     console.log(err)
    // })
  }
  const sttsInputHandler = ({ target }) => {
    setSttsValue(target.value)
    // swapContract
    //   .getAmountsOut(target.value, swap.pair[chainId].stts)
    //   .then((result) => {
    //     console.log(formaterNumber(result[0]))
    //     setBnbValue(formaterNumber(result[0]))
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
  const swapBNBHandler = () => {
    requestSwapBnb()
    // swapContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
    //   0,
    //   swap.pair[chainId].bnb,
    //   to,
    //   Date.now(),
    //   {
    //     value: formatToString(bnbValue, 18),
    //   }
    // )
  }
  const swapSttsHandler = () => {
    // swapContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
    //   formatToString(sttsValue, 8),
    //   0,
    //   swap.pair[chainId].stts,
    //   to,
    //   Date.now()
    // )
  }

  return (
    <Container fluid>
      <Row gutterWidth={10} justify="between" align="center">
        <Col md={12}>
          <AccountAddress />
        </Col>
      </Row>
      <Row justify="between" style={{ minHeight: isMobile ? 1200 : 300 }}>
        <Col xs={4}></Col>
        <Col xs={4}>
          <Row
            direction="column"
            justify="around"
            style={{ minHeight: isMobile ? 1200 : 300 }}
            gutterWidth={4}
          >
            <Col xs={12}>
              <Input
                type="number"
                onInput={bnbInputHandler}
                placeholder="0"
                value={bnbValue}
              ></Input>
            </Col>
            <Col xs={12}>
              <Input
                type="number"
                onInput={sttsInputHandler}
                placeholder="0"
                value={sttsValue}
              ></Input>
            </Col>
            <Col xs={12}>
              <Typography>{price}</Typography>
            </Col>
            <Row justify="around">
              <Col xs={6}>
                <Button onClick={() => swapBNBHandler()}>Swap BNB</Button>
              </Col>
              <Col xs={6}>
                <Button onClick={() => swapSttsHandler()}>Swap STTS</Button>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
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
  requestSwapBnb: bindActionCreators(requestSwapBnb, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
