import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Colors from '../../../Theme/Colors'
import Typography from 'antd/lib/typography'
import { tooShorter } from '../../../_helpers/constants'
import { AppState } from '../../../_types'

interface AccountAddressProps {}

type IProps = AccountAddressProps & ReturnType<typeof mapStateToProps>

const AccountAddress: React.FC<IProps> = ({ address, chainId }) => {
  const [account, setAccount] = useState('0x...')

  useEffect(() => {
    setAccount(tooShorter(address))
  }, [address])

  return (
    <div
      style={{ textAlign: 'center', fontSize: 13, cursor: 'pointer' }}
      onClick={() =>
        account.length > 10
          ? setAccount(tooShorter(address))
          : setAccount(address!)
      }
    >
      <Typography>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="15px">
          <path
            d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5"
            fill={Colors.green}
          />
        </svg>
        {account}
        {chainId !== 56 && '(TestNet)'}
      </Typography>
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  const { address } = state.account
  const { chainId } = state.wallet
  return {
    address,
    chainId,
  }
}
export default connect(mapStateToProps)(AccountAddress)
