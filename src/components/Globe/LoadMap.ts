import errorImg from 'assets/error.png'
import loadingImg from 'assets/loading.png'
import textureImg from 'assets/texture.png'
import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import {
  CanvasTexture,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
} from 'three'
import { AppState } from '_types'

const image = new Image()
image.src = textureImg

interface LoadMapProps {
  loadCallback: (mesh: Object3D) => void
  tileHeight?: number
  tileWidth?: number
  tileNumber?: number
  texWidth?: number
  texHeight?: number
  rows?: number
}

type IProps = LoadMapProps & ReturnType<typeof mapStateToProps>

const LoadMap: React.FC<IProps> = ({
  loadCallback,
  tileMap,
  loading,
  error,
  tileHeight = 64,
  tileWidth = 130,
  tileNumber = 4,
  texWidth = 130,
  texHeight = 230,
  rows = 9,
}) => {
  const { canvas, ctx } = useMemo(() => {
    const width = tileWidth * tileNumber
    const height = tileWidth * tileNumber
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.canvas.width = width
    ctx.canvas.height = height

    ctx.translate(width / 2, tileHeight * 2.5)

    return { canvas, ctx }
  }, [tileHeight, tileNumber, tileWidth])

  const clearCtx = useCallback(() => {
    ctx.clearRect(
      -canvas.width,
      -canvas.height,
      canvas.width * 2,
      canvas.height * 2
    )
  }, [ctx, canvas])

  const drawTile = useCallback(
    (x: number, y: number, row: number, col: number) => {
      ctx.save()
      ctx.translate(((y - x) * tileWidth) / 2, ((x + y) * tileHeight) / 2)
      ctx.drawImage(
        image,
        row * texWidth,
        col * texHeight,
        texWidth,
        texHeight,
        -tileHeight,
        -tileWidth,
        texWidth,
        texHeight
      )
      ctx.restore()
    },
    [ctx, texHeight, texWidth, tileHeight, tileWidth]
  )

  const geometry = useMemo(() => {
    let ratio = window.innerWidth / 7
    const width = ratio > 80 ? 80 : ratio
    const geometry = new PlaneGeometry(width, width)

    return geometry
  }, [])

  const loadingMesh = useMemo(() => {
    const loadingBar = new Image()
    loadingBar.src = loadingImg

    const texture = new CanvasTexture(loadingBar)

    const material = new MeshPhongMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      side: DoubleSide,
    })
    material.needsUpdate = true

    return new Mesh(geometry, material)
  }, [geometry])

  const errorMesh = useMemo(() => {
    const errorBar = new Image()
    errorBar.src = errorImg

    const texture = new CanvasTexture(errorBar)

    const material = new MeshPhongMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      side: DoubleSide,
    })
    material.needsUpdate = true

    return new Mesh(geometry, material)
  }, [geometry])

  useEffect(() => {
    if (tileMap && !loading) {
      clearCtx()
      tileMap.forEach((t: number, i: number) => {
        const x = Math.trunc(i / tileNumber)
        const y = Math.trunc(i % tileNumber)
        const row = Math.trunc(t / rows)
        const col = Math.trunc(t % rows)

        drawTile(x, y, row, col)
      })

      const texture = new CanvasTexture(canvas)

      const material = new MeshPhongMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        side: DoubleSide,
      })
      material.needsUpdate = true

      const mesh = new Mesh(geometry, material)

      loadCallback(mesh)
    } else if (loading) {
      loadCallback(loadingMesh)
    }
    if (error) {
      loadCallback(errorMesh)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileMap, error, loading])

  return null
}

const mapStateToProps = (state: AppState) => {
  return {
    tileMap: state.land.landData.tileMap,
    loading: state.land.landData.loading,
    error: state.land.landData.error,
  }
}

export default connect(mapStateToProps)(LoadMap)
