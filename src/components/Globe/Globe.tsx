import React, { useCallback, useRef } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import background from '../../assets/background.png'
import clouds from '../../assets/clouds.png'
import SmartWorldAddress from '../Wallet/Main/ListTokens'
import tiles from './tiles.json'
interface GlobeProps {
  height: number
  width: number
  showDetail: boolean
}

const ReactGlobe: React.FC<GlobeProps> = ({
  height,
  width,
  children,
  showDetail,
}) => {
  const globeEl = useRef<GlobeMethods>()

  const drawTiles = useCallback(({ color, phi, theta }: any) => {
    const geometry = new PlaneGeometry(2.5, 2.5)
    const material = new MeshBasicMaterial({
      color,
      side: DoubleSide,
    })

    const tile = new Mesh(geometry, material)
    // draw tile around the globe
    tile.position.setFromSphericalCoords(100, phi, theta)

    tile.position.multiplyScalar(1.01)

    tile.lookAt(0, 0, 0)

    return tile
  }, [])

  const onGlobeReady = useCallback(() => {
    //@ts-ignore
    globeEl.current.controls().autoRotate = true
    //@ts-ignore
    globeEl.current.controls().autoRotateSpeed = 1
    //@ts-ignore
    globeEl.current.camera().setViewOffset(100, 100, 0, -13, 100, 100)
  }, [])

  return (
    <div style={{ position: 'relative', transition: 'height 1s', height }}>
      <Globe
        ref={globeEl}
        height={height}
        width={width}
        bumpImageUrl={clouds}
        backgroundImageUrl={background}
        customLayerData={tiles}
        onGlobeReady={onGlobeReady}
        customThreeObject={drawTiles}
      />
      <div
        style={{
          position: 'absolute',
          overflowX: 'hidden',
          width: 'calc(100% - 10px)',
          zIndex: 100,
          bottom: 2,
          left: 5,
        }}
      >
        {showDetail && children ? children : <SmartWorldAddress />}
      </div>
    </div>
  )
}

export default ReactGlobe
