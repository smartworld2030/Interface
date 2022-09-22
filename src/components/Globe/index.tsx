import React, { useState, useEffect, useRef } from 'react'
import Globe from 'react-globe.gl'
import * as d3 from 'd3'
import earth from '../../assets/earth.jpg'
import background from '../../assets/background.png'
import clouds from '../../assets/clouds.png'
import SmartWorldAddress from '../Wallet/Main/ListTokens'

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
  const globeEl = useRef()
  const [popData, setPopData] = useState([])

  useEffect(() => {
    fetch('/assets/world_population.csv')
      .then((res) => res.text())
      .then((csv) =>
        d3.csvParse(csv, ({ lat, lng, pop }) => ({
          lat: +lat,
          lng: +lng,
          pop: +pop,
        }))
      )
      .then(setPopData)
  }, [])

  useEffect(() => {
    // Auto-rotate
    if (globeEl?.current) {
      //@ts-ignore
      globeEl.current.controls().autoRotate = true
      //@ts-ignore
      globeEl.current.controls().autoRotateSpeed = 0.3
      //@ts-ignore
      globeEl.current.camera().setViewOffset(100, 100, 0, -13, 100, 100)
    }
  }, [])

  const weightColor = d3
    .scaleSequentialSqrt(d3.interpolateYlOrRd)
    .domain([0, 1e7])

  return (
    <div style={{ position: 'relative', transition: 'height 1s', height }}>
      <Globe
        ref={globeEl}
        height={height}
        width={width}
        globeImageUrl={earth}
        bumpImageUrl={clouds}
        backgroundImageUrl={background}
        hexBinPointsData={popData}
        hexBinPointWeight="pop"
        hexAltitude={(d) => d.sumWeight * 6e-8}
        hexBinResolution={4}
        hexTopColor={(d) => weightColor(d.sumWeight)}
        hexSideColor={(d) => weightColor(d.sumWeight)}
        hexBinMerge={true}
        enablePointerInteraction={false}
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
