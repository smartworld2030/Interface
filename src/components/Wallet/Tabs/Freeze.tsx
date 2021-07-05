import React, { useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { First } from '../Freeze/First'
import { Second } from '../Freeze/Second'
import { Third } from '../Freeze/Third'
import { Footer } from '../Freeze/Footer'
import { StyledH3 } from '../../Layout/typography/Typography'
import { STT, Tokens } from '../../Layout/typography/Tokens'
import { ContentRow, ContentCol } from '../../Layout/divs/Content'

interface FreezeProps {
  isMobile: boolean
}

export const Freeze: React.FC<FreezeProps> = ({ isMobile }) => {
  const [width, setWidth] = useState(300)
  return (
    <>
      <StyledH3>
        <Tokens component={<STT />} word="MINE" />
      </StyledH3>
      <ContentRow>
        <ContentCol xs={{ span: 22 }} lg={{ span: 7 }}>
          <First width={width} setWidth={setWidth} />
        </ContentCol>
        <ContentCol xs={{ span: 22 }} lg={{ span: 7 }}>
          <Second width={width} isMobile={isMobile} />
        </ContentCol>
        <ContentCol xs={{ span: 22 }} lg={{ span: 7 }}>
          <Third width={width} isMobile={isMobile} />
        </ContentCol>
      </ContentRow>
      {/* <Footer address={account} active={true} project={'freeze'} /> */}
    </>
  )
}
