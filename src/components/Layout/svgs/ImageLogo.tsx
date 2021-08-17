import styled from 'styled-components'

import Logo from '../../../assets/Logo.png'

const StyledImage = styled.image`
  cursor: pointer;
`

interface ImageLogoProps {
  x: number
  y: number
  active?: boolean
}

export const ImageLogo: React.FC<ImageLogoProps> = ({
  active,
  ...position
}) => {
  return (
    <StyledImage
      {...position}
      width="60"
      height="60"
      xlinkHref={Logo}
      onClick={() => console.log('index')}
    />
  )
}
