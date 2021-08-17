import styled from 'styled-components'
import { Row, Col, ColProps } from 'antd/lib/grid'

export const ContentRow = styled(Row)`
  justify-content: space-evenly;
  position: relative;
  padding: 0;
  margin: 0;
`
interface ContentColProps extends ColProps {
  height?: string | number
}

export const ContentCol = styled(({ height, ...props }: ContentColProps) => (
  <Col {...props} />
))`
  height: ${({ height }) => (height ? height + 'px' : '285px')};
  background-color: #0f121a;
  margin-bottom: 10px;
`
