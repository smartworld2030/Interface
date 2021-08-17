import styled from 'styled-components'
import Button, { ButtonProps } from 'antd/lib/button'
import Colors from '../../../Theme/Colors'

interface StyledButtonProps extends ButtonProps {
  hoverColor?: string
  color?: string
}

export const StyledButton = styled(
  ({ hoverColor, color, ...props }: StyledButtonProps) => <Button {...props} />
)`
  background: #2e2e2e;
  border: 1px solid grey;
  color: white;
  &:hover {
    border: 1px solid
      ${({ hoverColor }) => (hoverColor ? hoverColor : Colors.green)};
    background: #2e2e2e;
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : Colors.green)};
  }
`
interface TokenButtonProps extends ButtonProps {
  radius?: number
  color?: string
}

export const TokenButton = styled(
  ({ radius, color, ...props }: TokenButtonProps) => <Button {...props} />
)`
  background: #2e2e2e;
  border: 1px solid grey;
  width: ${({ radius }) => radius + 'px'};
  height: ${({ radius }) => radius + 'px'};
  color: ${({ color }) => (color ? color : Colors.green)};
`
