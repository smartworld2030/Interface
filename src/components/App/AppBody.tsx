import styled from 'styled-components'

export const BodyWrapper = styled.div`
  max-width: 436px;
  width: 100%;
  height: 100%;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
