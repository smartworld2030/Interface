import { Alert, Button, Progress, Space } from 'antd'
import Typography from 'antd/lib/typography'
import { FlexDiv } from 'components/Layout/divs/Divs'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { GlobeMethods } from 'react-globe.gl-fork'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Colors from 'Theme/Colors'
import { Object3D } from 'three'
import { fetchLandData } from '_actions/land.actions'
import { AppActions, AppState } from '_types'
import LoadMap from './LoadMap'

type GeoPov = {
  lat: number
  lng: number
  altitude?: number
  id?: number
}

interface LandSectionProps {
  globeEl: GlobeMethods
  mapData: {
    id: number
    lat: number
    lng: number
    phi: number
    theta: number
    color: number
  }
}

const allMeta = {
  Grass: 6412,
  Snow: 1637,
  Water: 1476,
  Sand: 475,
  Effect: 9094,
  Buildable: 16,
  UnBuildable: 18151,
  Tree: 5201,
  Charcoal: 4846,
  Iron: 3405,
  Gold: 2379,
  Crystal: 1228,
  Diamond: 511,
}

type IProps = LandSectionProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const LandSection: React.FC<IProps> = ({
  clickedTile,
  mapData,
  globeEl,
  error,
  loading,
  attributes,
  fetchLandData,
}) => {
  const meshRef = useRef<Object3D>()
  const cameraPov = useRef<GeoPov>({ lat: 0, lng: 0, altitude: 3 })

  useEffect(() => {
    const light = globeEl
      .scene()
      .children.find((obj3d) => obj3d.type === 'DirectionalLight')
    light?.position.set(0, 0, 0)
  }, [globeEl])

  useEffect(() => {
    if (clickedTile) {
      fetchLandData(clickedTile)
    }
  }, [clickedTile, fetchLandData])

  const resources: { [key: string]: number } = useMemo(
    () =>
      attributes.reduce(
        (acc, curr) =>
          curr.trait_type !== 'UnBuildable'
            ? curr.trait_type === 'Buildable'
              ? { ...acc, Buildable: curr.value }
              : {
                  ...acc,
                  [curr.value]: Math.round((allMeta[curr.value] / 10000) * 100),
                  length: acc.length + 1,
                }
            : acc,
        { length: 0 }
      ),
    [attributes]
  )

  const lookAtCamera = useCallback(
    () => meshRef.current.lookAt(globeEl.camera().position),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const disableRotation = useCallback(() => {
    globeEl.controls().minDistance = 99
    globeEl.controls().autoRotate = false
    globeEl.controls().enableZoom = false
    globeEl.controls().enableRotate = false
    globeEl.controls().addEventListener('change', lookAtCamera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enableRotation = useCallback(() => {
    globeEl.controls().minDistance = 103
    globeEl.controls().autoRotate = true
    globeEl.controls().enableZoom = true
    globeEl.controls().enableRotate = true
    globeEl.controls().removeEventListener('change', lookAtCamera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mapData) {
      cameraPov.current = globeEl.pointOfView()
      globeEl.pointOfView(
        {
          lat: mapData.lat,
          lng: mapData.lng,
          altitude: -0.1,
        },
        1000
      )
      disableRotation()
    } else {
      if (cameraPov.current.altitude < 0.5) cameraPov.current.altitude = 1
      globeEl.pointOfView(cameraPov.current, 1000)
      enableRotation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData])

  const loadCallback = useCallback((mesh: Object3D) => {
    globeEl.scene().remove(meshRef.current)
    meshRef.current = mesh
    globeEl.scene().add(meshRef.current)
    lookAtCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: clickedTile ? 0 : -500,
        left: 0,
        width: '100%',
        minHeight: '100px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        transition: 'top 1s',
        zIndex: 1,
      }}
    >
      <LoadMap loadCallback={loadCallback} />
      <FlexDiv
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
          margin: 'auto',
          padding: '1vw 3vw',
        }}
      >
        <Typography.Title
          level={4}
          style={{ position: 'sticky', zIndex: 3, top: 0 }}
        >
          SmartLand #{mapData?.id}
          <Typography.Text
            style={{
              fontSize: '0.5em',
            }}
          >
            ({mapData?.lat}/{mapData?.lng})
          </Typography.Text>
        </Typography.Title>
        {loading ? (
          <Typography.Text>Loading...</Typography.Text>
        ) : error ? (
          <Alert
            message={error}
            type="error"
            showIcon
            action={
              <Space>
                <Button size="small" onClick={() => fetchLandData(clickedTile)}>
                  Retry
                </Button>
              </Space>
            }
          />
        ) : attributes.length ? (
          <Row justify="around">
            {Object.entries(resources).map(
              ([key, percent]) =>
                key !== 'Buildable' && (
                  <Col xs={3} md={3} key={key}>
                    <Progress
                      type="circle"
                      strokeColor={Colors.green}
                      percent={percent}
                      width={60}
                      format={() => (
                        <Typography.Text style={{ fontSize: 10 }}>
                          {key}
                          <br />
                          {percent}%
                        </Typography.Text>
                      )}
                    />
                  </Col>
                )
            )}
            <Col
              xs={12}
              style={{
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginTop: '1em',
                fontSize: '0.8em',
                fontWeight: 'bold',
              }}
            >
              <Typography.Text>Buildable</Typography.Text>
              <Progress
                style={{ width: '75%' }}
                strokeWidth={5}
                showInfo={false}
                trailColor={Colors.red}
                percent={Math.round((resources.Buildable / 16) * 100)}
                strokeColor={Colors.green}
              />
              <Typography.Text>{resources.Buildable}/16</Typography.Text>
            </Col>
          </Row>
        ) : (
          <Alert message="No attributes found" type="warning" />
        )}
      </FlexDiv>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  const {
    location: { query },
  } = state.router
  const clickedTile = Number(query.tile) || 0

  return {
    clickedTile,
    error: state.land.landData.error,
    loading: state.land.landData.loading,
    attributes: state.land.landData.attributes,
    mapData: state.land.mapData,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  fetchLandData: bindActionCreators(fetchLandData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandSection)
