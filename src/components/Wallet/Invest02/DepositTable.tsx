import Table from 'antd/lib/table'
import React, { useState } from 'react'
import { CloseSquareOutlined } from '@ant-design/icons'
import { Row, Col } from 'react-grid-system'
import Colors from '../../../Theme/Colors'
import Switch from 'antd/lib/switch'

export function referralPercent(value) {
  return value < 1000
    ? value / 1000
    : value < 21000
    ? 1 + (value - 1000) / 20000
    : value < 61000
    ? 2 + (value - 21000) / 40000
    : value < 141000
    ? 3 + (value - 61000) / 80000
    : 4
}

function calcPercent(value) {
  return value / 100
}

function totalReward(value: number) {
  return value * 2
}

function monthlyReward(value) {
  return (value * rewardPercent(value)) / 100
}

export function rewardPeriod(value) {
  return totalReward(value) / monthlyReward(value)
}

export function rewardPercent(value) {
  if (value < 100) {
    return (value * 5) / 100
  }
  const percent = 5 + calcPercent(value - 100)
  return percent > 14 ? 14 : percent
}

const columns = [
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Reward',
    dataIndex: 'reward',
  },
  {
    title: 'Percent',
    dataIndex: 'rewPercent',
  },
  {
    title: 'Referral',
    dataIndex: 'referral',
  },
  {
    title: 'Period',
    dataIndex: 'period',
  },
]

const amounts = [
  100,
  500,
  1000,
  10000,
  21000,
  30000,
  61000,
  101000,
  141000,
  188000,
]

const data = (withStts: boolean) =>
  amounts.map((amount, key) => {
    const refPercent = referralPercent(
      withStts ? amount : amount * 0.75
    ).toFixed(2)
    const referral =
      referralPercent(withStts ? amount : amount * 0.75).toFixed(2) + ' %'
    const rewPercent =
      rewardPercent(withStts ? amount : amount * 0.75).toFixed(2) + ' %'
    const reward = totalReward(withStts ? amount : amount * 0.75) + ' $'
    const period =
      rewardPeriod(withStts ? amount : amount * 0.75).toFixed(2) + ' Month'
    console.log(period)
    return {
      key,
      amount: amount + ' $',
      refPercent,
      referral,
      reward,
      rewPercent,
      period,
    }
  })

interface DepositTableProps {
  clickHandler: (show: boolean) => void
}

const DepositTable: React.FC<DepositTableProps> = ({ clickHandler }) => {
  const [withStts, setWithStts] = useState(true)
  return (
    <Row
      direction="column"
      align="center"
      style={{ background: Colors.transparentBackground }}
    >
      <Row
        justify="between"
        align="center"
        style={{ width: '100%', height: '30px' }}
      >
        <Col xs={4} style={{ textAlign: 'left' }}>
          <CloseSquareOutlined
            onClick={() => clickHandler(false)}
            style={{
              fontSize: '20px',
              color: Colors.red,
            }}
          />
        </Col>
        <Col xs={4} style={{ textAlign: 'center' }}>
          INFORMATION
        </Col>
        <Col xs={4} style={{ textAlign: 'right' }}>
          <Switch
            checkedChildren="STTS"
            unCheckedChildren="BNB/BTC"
            onChange={setWithStts}
            defaultChecked={withStts}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data(withStts)}
        pagination={false}
        scroll={{ y: 240 }}
      />
    </Row>
  )
}

export default DepositTable
