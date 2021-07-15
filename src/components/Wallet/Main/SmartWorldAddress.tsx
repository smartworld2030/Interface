import React from 'react'
import { connect } from 'react-redux'
import Colors from '../../../Theme/Colors'
import Typography from 'antd/lib/typography'
import { AppState } from '../../../_types'
import bank from '../../../_contracts/bank'

interface SmartWorldAddressProps {}

type IProps = SmartWorldAddressProps & ReturnType<typeof mapStateToProps>

const AccountAddress: React.FC<IProps> = ({ chainId }) => {
  return (
    <a
      href={'https://bscscan.com/address/' + bank.address[56]}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: 8, cursor: 'pointer' }}
    >
      <Typography>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="8px">
          <path
            d="M 0.25 0.5 L 1.5 1.25 L 0.25 2 L 0.25 0.5"
            fill={Colors.green}
          />
        </svg>
        Smart World
      </Typography>
    </a>
  )
}
const mapStateToProps = (state: AppState) => {
  const { chainId } = state.wallet
  return {
    chainId,
  }
}
export default connect(mapStateToProps)(AccountAddress)
