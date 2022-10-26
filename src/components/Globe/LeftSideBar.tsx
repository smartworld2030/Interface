import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import allMeta from 'assets/meta.json'
import { useState } from 'react'
import Colors from 'Theme/Colors'

interface LeftSideBarProps {}

const LeftSideBar: React.FC<LeftSideBarProps> = () => {
  const [open, setOpen] = useState(false)

  const calcPercent = (value: number) => {
    return Math.round((value / 10000) * 100)
  }

  return (
    <div
      style={{
        position: 'absolute',
        transition: 'left 0.5s',
        marginRight: 30,
        zIndex: 100,
        top: 180,
        width: 150,
        left: open ? 0 : -130,
      }}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: 'absolute',
          top: 0,
          right: 5,
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderRadius: '0 10px 10px 0',
          color: Colors.green,
          border: '1px solid',
          borderLeft: 'none',
          transition: open ? 'none' : 'all 1s ease-in-out 0.5s',
          borderColor: open ? 'transparent' : Colors.green,
          padding: '2px 0',
          paddingLeft: 5,
          width: 20,
        }}
      >
        {open ? <CaretLeftOutlined /> : <CaretRightOutlined />}
      </div>
      <div
        style={{
          width: 125,
          height: 275,
          display: 'flex',
          padding: '10px',
          fontWeight: 'bold',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderBottomRightRadius: 5,
        }}
        onClick={() => setOpen(false)}
      >
        {Object.entries(allMeta).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <div>{key}</div>
            {Object.entries(value).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'normal',
                  alignItems: 'center',
                  marginLeft: '10px',
                }}
              >
                <div>{key}:</div>
                <div
                  style={{
                    color: Colors.green,
                  }}
                >
                  {calcPercent(value)}%
                </div>
              </div>
            ))}
          </div>
        ))}
        <Typography.Link
          href="https://testnets.opensea.io/collection/smartland"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textAlign: 'center' }}
        >
          OpenSea
        </Typography.Link>
      </div>
    </div>
  )
}

export default LeftSideBar
