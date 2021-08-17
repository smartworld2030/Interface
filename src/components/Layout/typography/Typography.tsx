import styled from 'styled-components'
import Colors from '../../../Theme/Colors'
import Typography from 'antd/lib/typography'

export const StyledH3 = styled.h3`
  padding: 5px 0;
`

interface StyledPProps {
  color?: string
  backColor?: string
}

export const StyledP = styled(
  ({ color, backColor, ...props }: StyledPProps) => <p {...props} />
)`
  display: flex;
  flex-wrap: nowrap;
  color: ${({ color }) => (color ? color : Colors.text)};
  background: ${({ backColor }) => (backColor ? backColor : 'transparent')};
`

export const { Title } = Typography

export const StyledTitle = styled(Title)`
  color: white !important;
`
export const ErrorTypography = styled(Typography)`
  color: red !important;
`
