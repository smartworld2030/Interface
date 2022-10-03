// make context and provider to pass clickedTile and to button
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { TokenButton } from 'components/Layout/buttons/Buttons'
import { formatEther } from 'ethers/lib/utils'
import { useCallback, useEffect, useRef } from 'react'
import { GlobeMethods } from 'react-globe.gl-fork'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Colors from 'Theme/Colors'
import {
  fetchLandData,
  fetchTiles,
  mint,
  resetTile,
} from '_actions/land.actions'
import { tooShorter } from '_helpers/constants'
import { AppActions, AppState } from '_types'
import BottomDetails from './BottomDetails'
import GlobeWithTile from './Globe'
import LandSection from './LandSection'
import SideBar from './SideBar'

interface GlobeProps {
  height: number
  width: number
  showDetail: boolean
}

type IProps = GlobeProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const Globe: React.FC<IProps> = ({
  height,
  clickedTile,
  resetTile,
  fetchTiles,
  hashData,
  landPrice,
  showDetail,
  landsOwners,
  width,
  ownedLands,
  mint,
}) => {
  const globeEl = useRef<GlobeMethods>()

  useEffect(() => {
    fetchTiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHover = useCallback((tile) => {
    if (tile) {
      globeEl.current.controls().autoRotate = false
    } else {
      globeEl.current.controls().autoRotate = true
    }
  }, [])

  return (
    <div style={{ position: 'relative', transition: 'height 1s', height }}>
      {globeEl.current && <LandSection globeEl={globeEl.current} />}
      <GlobeWithTile
        globeEl={globeEl}
        height={height}
        width={width}
        onHover={handleHover}
        onGlobeReady={useCallback(() => {
          globeEl.current.controls().autoRotateSpeed = 0.2
          globeEl.current.controls().dampingFactor = 0.1
          globeEl.current.controls().enableDamping = true
          globeEl.current.controls().maxDistance = 400
          globeEl.current.camera().setViewOffset(100, 150, 0, -12, 100, 150)
        }, [])}
      />
      {clickedTile ? (
        <div
          style={{
            position: 'absolute',
            overflowX: 'hidden',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 100,
            bottom: 0,
            left: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 'auto',
              padding: '5px',
              borderRadius: 2,
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <TokenButton
              radius={30}
              type="primary"
              shape="circle"
              color={Colors.red}
              borderColor={Colors.red}
              icon={<ArrowLeftOutlined />}
              onClick={() => resetTile()}
            />
            {landsOwners[clickedTile] ? (
              <Typography.Text
                style={{
                  color: 'white',
                  marginRight: 5,
                  fontSize: 15,
                }}
              >
                {tooShorter(landsOwners[clickedTile])}
              </Typography.Text>
            ) : (
              <Typography.Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                Price: <strong>{formatEther(landPrice).toString()}</strong> BNB
              </Typography.Text>
            )}
            <Button
              type="primary"
              disabled={
                ownedLands.includes(clickedTile) || !!landsOwners[clickedTile]
              }
              onClick={() => {
                mint(clickedTile, hashData)
              }}
            >
              {ownedLands.includes(clickedTile) ? 'Sell Now' : 'Buy Now'}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <SideBar />
          <BottomDetails showDetail={showDetail} />
        </>
      )}
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  const clickedTile = Number(state.router.location.query.tile) || 0

  return {
    clickedTile,
    pathname: state.router.location.pathname,
    hashData: state.land.landData.hashData,
    landsOwners: state.land.landsOwners,
    error: state.land.error,
    landPrice: state.land.landPrice,
    ownedLands: state.land.ownedLands,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  resetTile: bindActionCreators(resetTile, dispatch),
  fetchTiles: bindActionCreators(fetchTiles, dispatch),
  fetchLandData: bindActionCreators(fetchLandData, dispatch),
  mint: bindActionCreators(mint, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Globe)
