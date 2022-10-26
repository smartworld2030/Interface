import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useState } from 'react'
import { connect } from 'react-redux'
import Colors from 'Theme/Colors'
import { AppState } from '_types'

interface RightSideBarProps {}

type IProps = RightSideBarProps & ReturnType<typeof mapStateToProps>

const RightSideBar: React.FC<IProps> = ({ totalSupply }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        transition: 'right 0.5s',
        marginLeft: 30,
        zIndex: 100,
        top: 180,
        width: 215,
        right: open ? 0 : -215,
      }}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: 'absolute',
          top: 0,
          left: -15,
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderRadius: '10px 0 0 10px',
          color: Colors.green,
          border: '1px solid',
          borderRight: 'none',
          transition: open ? 'none' : 'all 1s ease-in-out 0.5s',
          borderColor: open ? 'transparent' : Colors.green,
          padding: '2px 0px 2px 2px',
          paddingLeft: 2,
          width: 15,
        }}
      >
        {open ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div>
      <div
        style={{
          width: 215,
          height: 275,
          display: 'flex',
          padding: '10px',
          fontWeight: 'bold',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderBottomLeftRadius: 5,
        }}
        onClick={() => setOpen(false)}
      >
        <Typography.Title style={{ textAlign: 'center', fontSize: 12 }}>
          Decentralized Minecraft
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', fontSize: 10 }}>
          Have you ever imagined the Decentralized Minecraft? Be a landholder in
          the most treasured future metaverse, only a few land plots remain (
          {10000 - totalSupply}). Snowy and desert lands with amounts of rare
          diamonds. What is your favorite land to be owned? The initial
          metaverse version will be presented, after the sales of ten percent of
          the lands, and their price will be changed from 0.5 BNB to 1 BNB. You
          will receive twenty-five percent of the referral profit, in order to
          introduce a friend.
        </Typography.Paragraph>
      </div>
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  return {
    totalSupply: state.bank.totalSupply,
  }
}

export default connect(mapStateToProps)(RightSideBar)
