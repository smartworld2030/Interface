import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import Spin from 'antd/lib/spin'
import { TokenButton } from 'components/Layout/buttons/Buttons'
import React, { useCallback } from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { pushTile } from '_actions/land.actions'
import { AppActions, AppState } from '_types'
import DetailSection from './refSection'

interface InvestmentProps {
  isMobile: boolean
}

type IProps = InvestmentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Investment02: React.FC<IProps> = ({
  isMobile,
  error,
  clickedTile,
  invest02Loading,
  pushTile,
}) => {
  const clickHandler = useCallback(
    (tileId: number) => {
      pushTile(tileId)
    },
    [pushTile]
  )

  return (
    <Spin
      style={{
        textAlign: 'center',
        height: 100,
        width: '100%',
      }}
      spinning={invest02Loading}
      tip={error ? error : 'Waiting...'}
    >
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: isMobile ? '100%' : '60%',
          margin: 'auto',
          padding: '10px 0',
          fontSize: 20,
        }}
      >
        <Col xs={2}>
          {clickedTile ? (
            <TokenButton
              radius={50}
              type="primary"
              shape="circle"
              fontSize={25}
              disabled={clickedTile === 1}
              onClick={() => clickHandler(clickedTile - 1)}
            >
              <CaretLeftOutlined />
            </TokenButton>
          ) : null}
        </Col>
        <Col xs={8}>
          <DetailSection />
        </Col>
        <Col xs={2}>
          {clickedTile ? (
            <TokenButton
              radius={50}
              fontSize={25}
              type="primary"
              shape="circle"
              disabled={clickedTile === 10000}
              onClick={() => clickHandler(clickedTile + 1)}
            >
              <CaretRightOutlined />
            </TokenButton>
          ) : null}
        </Col>
      </Row>
    </Spin>
  )
}

const mapStateToProps = (state: AppState) => {
  const { error, invest02Loading } = state.invest02
  const clickedTile = Number(state.router.location.query.tile) || 0

  return {
    invest02Loading,
    error,
    clickedTile,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  pushTile: bindActionCreators(pushTile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Investment02)
