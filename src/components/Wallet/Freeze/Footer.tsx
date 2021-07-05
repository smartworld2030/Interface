import React from 'react'
import { RefButton } from '../../Layout/buttons/RefButton'
import { StyledRow } from '../../Layout/divs/Divs'

interface FooterProps {
  active: boolean
  project: string
  address: string | null | undefined
}

export const Footer: React.FC<FooterProps> = ({ address, project, active }) => {
  return (
    <StyledRow>
      <p>Smart World ©️2030</p>
      {active && (
        <RefButton
          link={`${window.location.origin}/${project}?ref=${address}`}
          project={project}
        />
      )}
    </StyledRow>
  )
}
