import styled from '@emotion/styled'
import React, { useState } from 'react'
import { sizeCalculator } from '../../_helpers/constants'
import { HeadCircle } from '../Layout/svgs/HeadCircle'
import { ImageLogo } from '../Layout/svgs/ImageLogo'
import { useLocation } from 'react-router-dom'

const StyledSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`

interface HeaderProps {
  width: number
}

export const Header: React.FC<HeaderProps> = ({ width }) => {
  const { half, quarter, height, linkArray } = sizeCalculator(width)
  const [, setActive] = useState('/invest')
  const { pathname } = useLocation()

  return (
    <StyledSvg height={height + 10} width={width}>
      <defs>
        <clipPath id="circleView">
          <circle cx={half} cy={10} r="80" />
        </clipPath>
      </defs>
      <path
        stroke="rgb(150, 150, 150)"
        strokeDasharray="1 6"
        fill="rgb(0, 0, 0,0.0)"
        d={`M0,0 C${half - quarter},${height} ${
          half + quarter
        },${height} ${width},0`}
      />
      <ImageLogo x={half - 28} y={20} active />
      {linkArray.map((item, index) => (
        <HeadCircle
          {...item}
          key={index}
          active={item.link === pathname}
          onClick={() => setActive(item.link)}
        />
      ))}
    </StyledSvg>
  )
}
