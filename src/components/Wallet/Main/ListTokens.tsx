import React from 'react'
import { connect } from 'react-redux'
import Colors from '../../../Theme/Colors'
import Typography from 'antd/lib/typography'
import { AppState } from '../../../_types'
import { ethereum } from '../../../_helpers/api'
import info from '../../../_contracts/info'
import Button from 'antd/lib/button'
import { Row } from 'react-grid-system'

interface SmartWorldAddressProps {}

type IProps = SmartWorldAddressProps & ReturnType<typeof mapStateToProps>

const ListTokens: React.FC<IProps> = ({ chainId }) => {
  const requestAddToken = ({ address, symbol, decimals, image }) =>
    new Promise((resolve, reject) => {
      ethereum
        ?.request({
          method: 'wallet_watchAsset',
          params: {
            // @ts-ignore
            type: 'ERC20',
            options: {
              address,
              symbol,
              decimals,
              image,
            },
          },
        })
        .then((result) => resolve(result))
        .catch((err) => {
          reject(err)
        })
    })
  const addSttsToWallet = () => {
    let address = info[chainId].STTS
    let symbol = 'STTS'
    let decimals = info.decimals.STTS
    let image = 'https://i.postimg.cc/4yxyZ24s/Smart-World-Stock.png'
    requestAddToken({ address, symbol, decimals, image })
  }
  const addSttToWallet = () => {
    let address = info[chainId].STT
    let symbol = 'STT'
    let decimals = info.decimals.STT
    let image = 'https://i.postimg.cc/Ssqj1NwX/Smart-World-Token.png'
    requestAddToken({ address, symbol, decimals, image })
  }

  return (
    <Row direction="column" align="end">
      <Button
        type="link"
        onClick={() => addSttToWallet()}
        style={{ fontSize: 9, cursor: 'pointer' }}
      >
        <Typography>
          Add STT
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
            <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" fill={Colors.green} />
          </svg>
        </Typography>
      </Button>
      <Button
        type="link"
        onClick={() => addSttsToWallet()}
        style={{ fontSize: 9, cursor: 'pointer' }}
      >
        <Typography>
          Add STTS
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
            <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" fill={Colors.green} />
          </svg>
        </Typography>
      </Button>
    </Row>
  )
}
const mapStateToProps = (state: AppState) => {
  const { chainId } = state.wallet
  return {
    chainId,
  }
}
export default connect(mapStateToProps)(ListTokens)
