import { Web3Provider } from '@ethersproject/providers'
import React from 'react'
import { DataPolygon } from '../../Layout/svgs/Polygon'
import { shorter } from '../../../_helpers/constants'
import { SWRConfig } from 'swr'
import fetcher from 'swr-eth'
import Typography from 'antd/lib/typography'

interface SecondProps {
  width: number
  isMobile: boolean
}
const refferalData = [
  { id: 0, enabled: true, point: 1265196 },
  { id: 1, enabled: false },
  { id: 2, enabled: false },
]

export const Second: React.FC<SecondProps> = ({ width, isMobile }) => {
  // const { active, library, account, chainId } = useWeb3React<Web3Provider>()

  return (
    <>
      <svg height="100%" width={width} style={{ paddingTop: isMobile ? 0 : 0 }}>
        <foreignObject
          x="0"
          y="0"
          fill="white"
          fontSize="18"
          width={width}
          height="100%"
        >
          <div>
            {/* {active && library && (
              <SWRConfig
                value={{ fetcher: fetcher(library, new Map(ABIs(chainId))) }}
              >
                <Typography>Account: {shorter(account)}</Typography>
                <BnbBalance />
                <TokenList chainId={chainId} />
              </SWRConfig>
            )} */}
          </div>
        </foreignObject>
        {refferalData.map(({ id, enabled, point }) => (
          <DataPolygon
            key={id}
            index={id}
            width={width}
            point={point}
            enabled={enabled}
          />
        ))}
      </svg>
    </>
  )
}
