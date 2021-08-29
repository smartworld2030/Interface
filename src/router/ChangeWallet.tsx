import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions, AppState } from '../_types'
import { RowBody } from '../components/Layout/divs/Divs'
import { StyledDiv } from '../components/Layout/divs/Sections'
import { changeToMain, startOnBoarding } from '../_actions/wallet.actions'
import { Button, Text } from '@smartworld-libs/uikit'
import { tokenPrices } from '../_actions/bank.actions'
import { Col } from 'react-grid-system'

type IChangeWallet = { isMobile: boolean } & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

let timer

const ChangeWallet: React.FC<IChangeWallet> = ({ error, changeToMain, startOnBoarding }) => {
  useEffect(() => {
    clearInterval(timer)
    tokenPrices()
    timer = setInterval(() => {
      tokenPrices()
    }, 30 * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <RowBody>
      <Col xs={22} lg={7} style={{ textAlign: 'center', paddingTop: 50 }}>
        <Text style={{ padding: 50 }}>{error.msg}</Text>
        {error.code === 401 && (
          <Button variant="primary" onClick={() => startOnBoarding()}>
            Install MetaMask
          </Button>
        )}
        {error.code === 301 && (
          <StyledDiv>
            <Button variant="primary" onClick={() => changeToMain()}>
              Connect
            </Button>
          </StyledDiv>
        )}
      </Col>
    </RowBody>
  )
}

const mapStateToProps = (state: AppState) => {
  const { error, waiting } = state.wallet
  return {
    error,
    waiting,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  tokenPrices: bindActionCreators(tokenPrices, dispatch),
  changeToMain: bindActionCreators(changeToMain, dispatch),
  startOnBoarding: bindActionCreators(startOnBoarding, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWallet)
