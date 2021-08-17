import styled from 'styled-components'
import { animated } from 'react-spring'

export const AnimatedSvg = styled(animated.svg)`
  position: absolute;
  will-change: transform, opacity;
  top: 0;
  left: 0;
  z-index: 11;
`

export const AnimatedDiv = styled(animated.div)`
  position: absolute;
  will-change: transform, opacity;
  z-index: 11;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`
export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  margin: auto;
  height: 100%;
  width: 100%;
`
export const ButtonDiv = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`
