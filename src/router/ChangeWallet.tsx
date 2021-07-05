import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RouteProps } from 'react-router'
import { AppActions, AppState } from '../_types'
import { Col } from 'antd/lib/grid'
import { RowBody } from '../components/Layout/divs/Divs'
import { StyledDiv } from '../components/Layout/divs/Sections'
import { changeToMain, startOnBoarding } from '../_actions/wallet.actions'
import Typography from 'antd/lib/typography'
import Button from 'antd/lib/button'
import { messages } from '../_helpers/constants'

type IChangeWallet = { isMobile } & RouteProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

const ChangeWallet: React.FC<IChangeWallet> = ({
  isMobile,
  error,
  changeToMain,
  startOnBoarding,
  loading,
}) => {
  console.log(error, isMobile)
  return (
    <RowBody>
      <Col
        xs={{ span: 22 }}
        lg={{ span: 7 }}
        style={{ textAlign: 'center', paddingTop: 50 }}
      >
        <Typography>
          {loading
            ? messages['loading']
            : error
            ? isMobile
              ? messages['itsMobile']
              : messages[error]
            : messages[error]}
        </Typography>
        {error === 'notAvailable' && (
          <Button type="primary" onClick={() => startOnBoarding()}>
            Install MetaMask
          </Button>
        )}
        {error === 'available' && (
          <StyledDiv>
            <Button type="primary" onClick={() => changeToMain()}>
              Connect
            </Button>
          </StyledDiv>
        )}
      </Col>
    </RowBody>
  )
}

const mapStateToProps = (state: AppState) => {
  const { address, error, loading } = state.wallet
  return {
    address,
    error,
    loading,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  changeToMain: bindActionCreators(changeToMain, dispatch),
  startOnBoarding: bindActionCreators(startOnBoarding, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWallet)
