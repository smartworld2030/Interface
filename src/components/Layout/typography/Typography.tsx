import styled from 'styled-components'
import Colors from '../../../Theme/Colors'

export const StyledH3 = styled.h3`
  padding: 5px 0;
`

interface StyledPProps {
  color?: string
  backColor?: string
}

export const StyledP = styled(({ color, backColor, ...props }: StyledPProps) => <p {...props} />)`
  display: flex;
  flex-wrap: nowrap;
  color: ${({ color }) => (color ? color : Colors.text)};
  background: ${({ backColor }) => (backColor ? backColor : 'transparent')};
`
