import React from 'react'
import { connect } from 'react-redux'
import Colors from '../../../Theme/Colors'
import Typography from 'antd/lib/typography'
import { AppState } from '../../../_types'
import { ethereum } from '../../../_helpers/api'
import info from '../../../_contracts/info'

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
  const addTokenToWallet = () => {
    let address = info[chainId].STT
    let symbol = 'STT'
    let decimals = info.decimals.STT
    let image = 'https://i.postimg.cc/Ssqj1NwX/Smart-World-Token.png'
    requestAddToken({ address, symbol, decimals, image }).then(() => {
      let address = info[chainId].STTS
      let symbol = 'STTS'
      let decimals = info.decimals.STTS
      let image = 'https://i.postimg.cc/4yxyZ24s/Smart-World-Stock.png'
      requestAddToken({ address, symbol, decimals, image })
    })
  }

  return (
    <div
      onClick={() => addTokenToWallet()}
      style={{ fontSize: 9, cursor: 'pointer' }}
    >
      <Typography>
        Add Tokens
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="9px">
          <path d="M1.75.5 .5 1.25 1.75 2 1.75.5" fill={Colors.green} />
        </svg>
      </Typography>
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  const { chainId } = state.wallet
  return {
    chainId,
  }
}
export default connect(mapStateToProps)(ListTokens)
