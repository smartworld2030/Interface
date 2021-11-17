import Colors from '../../../Theme/Colors'
import styled from '@emotion/styled'
import Row from 'antd/lib/row'

interface StyledFlexDivProps {
  hoverColor?: string
  borderColor?: string
  width?: string
}

export const StyledFlexDiv = styled(
  ({ width, hoverColor, borderColor, ...props }: StyledFlexDivProps) => (
    <div {...props} />
  )
)`
  display: flex;
  flex-wrap: nowrap;
  width: ${({ width }) => (width ? width : '100%')};
  margin: auto;
  border: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : '#2e2e2e')};
  &:hover {
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : Colors.green)};
  }
`
interface AbsoluteDivProps {
  height?: number
  width: number
}

export const AbsoluteBody = styled(
  ({ height, width, ...props }: AbsoluteDivProps) => <div {...props} />
)`
  height: ${({ height }) => (height ? height + 'px' : '')};
  min-height: 300px;
  text-align: center;
  position: absolute;
  width: ${({ width }) => width + 'px'};
  z-index: 10;
  top: 0;
  left: 15px;
`

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const RowBody = styled(Row)`
  justify-content: space-evenly;
  position: relative;
`

export const StyledRow = styled(Row)`
  justify-content: space-between;
  align-items: baseline;
  padding: 0 20px;
`
interface DivHeightProps {
  height?: number
}

export const RelativeBody = styled(({ height, ...props }: DivHeightProps) => (
  <div {...props} />
))`
  min-height: ${({ height }) => height + 'px'};
  text-align: center;
  position: relative;
`

export const SpacerDiv = styled(({ height, ...props }: DivHeightProps) => (
  <div {...props} />
))`
  height: ${({ height }) => height + 'px'};
  z-index: 0;
`
