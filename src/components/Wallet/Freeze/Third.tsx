import Row from 'antd/lib/row'
import React from 'react'
import { Tables } from '../../Layout/charts/Tables'
import { STT, Tokens } from '../../Layout/typography/Tokens'

const firstTable = [
  {
    title: <Tokens component={<STT />} word="Daily" />,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <Tokens component={<STT />} word="TEAM" after />,
    dataIndex: 'age',
    key: 'age',
  },
]
const secondTable = [
  {
    title: <div className="mineSTT">MINE</div>,
    dataIndex: 'address',
    key: 'address',
  },
]

const firstData: any[] = []
for (let i = 1; i < 38; i++) {
  firstData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `Park Lane no. ${i}`,
  })
}

const secondData: any[] = []
for (let i = 1; i < 16; i++) {
  secondData.push({
    key: i,
    address: i,
  })
}

interface ThirdProps {
  width: number
  isMobile: boolean
}

export const Third: React.FC<ThirdProps> = ({ width }) => {
  return (
    <Row wrap={false}>
      <Tables columns={firstTable} data={firstData} maxWidth={width - 100} />
      <Tables columns={secondTable} data={secondData} maxWidth={100} />
    </Row>
  )
}
