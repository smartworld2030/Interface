import styled from '@emotion/styled'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AppState } from '_types'
import Colors from '../../Theme/Colors'
import ChainPriceFeed from './ChainPriceFeed'
import { HeadCircle } from './HeadCircle'
import { sizeCalculator } from './Links'

const StyledSvg = styled.svg<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 0;
  z-index: 10;
  transition: top 0.5s ease-out;
`

interface HeaderProps {
  width: number
}
type IProps = HeaderProps & ReturnType<typeof mapStateToProps>

const Header: React.FC<IProps> = ({ width, pathname, clickedTile }) => {
  const { half, quarter, height, linkArray } = sizeCalculator(width)
  const [, setActive] = useState('/invest')

  return (
    <StyledSvg
      top={pathname === '/land' && clickedTile ? -height : 0}
      height={height + 10}
      width={width}
    >
      <defs>
        <filter id="greyscale">
          <feColorMatrix
            type="matrix"
            values=".33 .33 .33 0 0
           .33 .33 .33 0 0
           .33 .33 .33 0 0
           0 0 0 1 0"
          ></feColorMatrix>
        </filter>
        <filter id="dropshadow" height="130%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor={Colors.green}
          />
        </filter>
      </defs>
      <path
        stroke="rgb(150, 150, 150)"
        strokeDasharray="1 6"
        fill="rgb(0, 0, 0,0.0)"
        d={`M0,0 C${half - quarter},${height} ${
          half + quarter
        },${height} ${width},0`}
      />
      {linkArray.map((item, index) => (
        <HeadCircle
          {...item}
          key={index}
          active={item.link === pathname}
          onClick={() => setActive(item.link)}
        />
      ))}
      <foreignObject width="100%" height="10%" y={height * 0.05}>
        <ChainPriceFeed />
      </foreignObject>
    </StyledSvg>
  )
}

const mapStateToProps = (state: AppState) => {
  const {
    location: { pathname, query },
  } = state.router
  const clickedTile = Number(query.tile) || 0

  return {
    pathname,
    clickedTile,
  }
}

export default connect(mapStateToProps)(Header)
