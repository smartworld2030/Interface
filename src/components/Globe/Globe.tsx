import { useCallback, useMemo } from 'react'
import Globe from 'react-globe.gl-fork'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import background from 'assets/background.png'
import { ThunkDispatch } from 'redux-thunk'
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from 'three/src/Three'
import { pushTile, resetTile } from '_actions/land.actions'
import { AppActions, AppState } from '_types'

const GlobeWithTile = ({
  tilesData,
  globeEl,
  onHover,
  pushTile,
  resetTile,
  resetLand,
  selectLand,
  clickedTile,
  tilesLoading,
  ...rest
}) => {
  const pointData = useMemo(() => {
    if (!tilesData.length) return undefined
    const radius = 100.1,
      ratio = radius / 450,
      geometry = new PlaneGeometry(12 * ratio, 12 * ratio),
      dotGeo = new BufferGeometry(),
      positionsArray = [],
      colorsArray = [],
      tilesIdsArray = [],
      vector = new Vector3()

    console.log('readed')

    for (let i = 1; i < tilesData.length; i++) {
      const { phi, theta, color, id } = tilesData[i]
      vector.setFromSphericalCoords(radius, phi, theta)
      dotGeo.copy(geometry)
      dotGeo.lookAt(vector)
      dotGeo.translate(vector.x, vector.y, vector.z)

      const rgb = new Color(color).toArray()

      for (let j = 0; j <= 3; j += 3) {
        for (let k = 0; k <= 6; k += 3) {
          colorsArray.push(...rgb)
          for (let l = 0; l < 3; l++) {
            positionsArray.push(dotGeo.attributes.position.array[j + k + l])
            tilesIdsArray.push(id)
          }
        }
      }
    }

    const positions = new Float32BufferAttribute(positionsArray, 3)
    const tilesIds = new Float32BufferAttribute(tilesIdsArray, 3)
    const colors = new Float32BufferAttribute(colorsArray, 3)

    return { positions, tilesIds, colors }
  }, [tilesData])

  const material = useMemo(() => {
    return new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: { value: 1.0 },
        u_hovered: { value: 0 },
        u_clicked: { value: 0 },
      },
      vertexShader: `
            uniform float u_hovered;
            uniform float u_clicked;
            uniform float time;
            attribute vec3 color;
            attribute float tileId;
            varying vec3 vRndId;
            void main() {
              vRndId = color;
              if(time > 0.0) {
                if(tileId == u_hovered) {
                  vRndId = vec3(1.0, 0.0, 2.0);
                }
                if(tileId == u_clicked) {
                  vRndId = vec3(0.0, 1.0, 2.0);
                }
              }
    
              if(u_hovered == tileId) {
                vRndId = vec3(1.0, 0.0, 0.0);
              }
              if(u_clicked == tileId) {
                vRndId = vec3(0.0, 0.0, 0.0);
              }
              vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * modelViewPosition;
          }`,
      fragmentShader: `
            varying vec3 vRndId;
            void main() {         
              gl_FragColor = vec4(vRndId, 1);
          }`,
    })
  }, [])

  const points = useMemo(() => {
    if (!pointData) return undefined
    const points = new BufferGeometry()

    points.setAttribute('position', pointData.positions)
    points.setAttribute('tileId', pointData.tilesIds)
    points.setAttribute('color', pointData.colors)

    return points
  }, [pointData])

  const clickHandler = useCallback(
    (tileId: number) => {
      pushTile(tileId)
    },
    [pushTile]
  )

  const hoverHandler = useCallback(
    (tileId: number) => {
      onHover(tileId)
      material.uniforms.u_hovered.value = tileId
    },
    [material.uniforms.u_hovered, onHover]
  )

  return (
    <Globe
      ref={globeEl}
      rendererConfig={{ antialias: false }}
      customLayerData={[{}]}
      customThreeObject={useCallback(
        () => (points ? new Mesh(points, material) : null),
        [points, material]
      )}
      customLayerLabel={useCallback(() => {
        const tileId = material.userData.tileId
        return tileId
          ? `
            <div style="border:1px solid; width: 70px; height: 25px; background: rgba(0, 0, 0, 0.5); color: white; display: flex; justify-content: center; align-items: center;">
              <b>${tileId}</b>
            </div>
          `
          : null
      }, [material.userData.tileId])}
      onCustomLayerHover={useCallback(
        (_, { faceIndex }) =>
          clickedTile ? undefined : hoverHandler(Math.floor(faceIndex / 2) + 1),
        [clickedTile, hoverHandler]
      )}
      onCustomLayerClick={
        clickedTile
          ? undefined
          : (_, { faceIndex }) => {
              const tileId = Math.floor(faceIndex / 2) + 1
              clickHandler(tileId)
            }
      }
      onCustomLayerRightClick={resetTile}
      onGlobeRightClick={resetTile}
      backgroundImageUrl={background}
      {...rest}
    />
  )
}

const mapStateToProps = (state: AppState) => {
  const {
    location: { query },
  } = state.router
  const clickedTile = Number(query.tile) || 0

  return {
    tilesLoading: state.land.tilesLoading,
    tilesData: state.land.tilesData,
    clickedTile,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  resetTile: bindActionCreators(resetTile, dispatch),
  pushTile: bindActionCreators(pushTile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobeWithTile)
