import Typography from 'antd/lib/typography'
import info from './Modal'

import { Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { AppState } from '_types'
import { ExclamationTriangle } from '../components/Layout/svgs/ExclamationTriangle'

const Titles = {
  '/invest': 'INVESTMENT',
  '/invest02': 'INVESTMENT02',
  '/info': 'INFORMATION',
  '/land': 'SMART LAND',
  '/swap': 'SWAP',
  '/nft': 'NFT MARKET',
  '/game': 'GAME',
}

interface RouteHeaderProps {
  width: number
  detailHandler: () => void
}

type IProps = RouteHeaderProps & ReturnType<typeof mapStateToProps>

const RouteHeader: React.FC<IProps> = ({
  pathname,
  width,
  detailHandler,
  totalSupply,
}) => {
  return (
    <Row justify="between" style={{ width: '100%', margin: 0 }}>
      <Row style={{ width: width / 3 }} justify="start">
        {Titles[pathname] === 'INVESTMENT02' && (
          <Typography.Link onClick={info}>Good news!</Typography.Link>
        )}
      </Row>
      <Row justify="center" style={{ width: width / 3 }}>
        <Typography.Title style={{ margin: 0, position: 'relative' }} level={5}>
          {Titles[pathname]}
          {Titles[pathname] === 'INVESTMENT' || Titles[pathname] === 'POOL' ? (
            <ExclamationTriangle onClick={detailHandler} />
          ) : null}
        </Typography.Title>
      </Row>
      {Titles[pathname] === 'POOL' && (
        <Row style={{ width: width / 3 }} justify="end">
          <Typography.Link
            href="https://pancakeswap.finance/add/BNB/0x88469567A9e6b2daE2d8ea7D8C77872d9A0d43EC"
            target="_blank"
          >
            Liquidity Pool
          </Typography.Link>
        </Row>
      )}
      <Row style={{ width: width / 3 }} justify="end">
        {Titles[pathname] === 'SWAP' && (
          <Typography.Link
            href="https://pancakeswap.finance/swap?exactField=input&exactAmount=1&outputCurrency=0x88469567A9e6b2daE2d8ea7D8C77872d9A0d43EC"
            target="_blank"
          >
            PanckakeSwap
          </Typography.Link>
        )}
        {pathname === '/land' && (
          <Typography.Link>{10000 - totalSupply}/10000</Typography.Link>
        )}
      </Row>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    pathname: state.router.location.pathname,
    totalSupply: state.bank.totalSupply,
  }
}

export default connect(mapStateToProps)(RouteHeader)
