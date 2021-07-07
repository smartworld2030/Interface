import React from 'react'
import styled from '@emotion/styled'
import Colors from '../../../Theme/Colors'
import Statistic, { StatisticProps } from 'antd/lib/statistic'

const MineSTT = styled.div`
  display: inline-flex;
  color: white;
  height: 10px;
`

const TokenP = styled.span`
  color: ${({ color }) => (color ? color : 'white')};
`

const AfterP = styled.p`
  color: ${({ color }) => (color ? color : 'white')};
  margin-right: 5px;
`

const FlexDiv = styled.div`
  display: flex;
`

interface StringObject {
  word: string
  color: string
}

interface STTProps {
  after?: StringObject
  before?: StringObject
  word: StringObject
}

interface TokenValueProps extends StatisticProps {
  color?: string
  value: number | string
  token?: string
  tokenColor?: string
  double?: number
}

export const TokenValue: React.FC<TokenValueProps> = (props) => {
  const { color, token, tokenColor, value, double, title, ...rest } = props
  return (
    <Statistic
      title={title}
      suffix={
        double ? (
          <Statistic
            valueStyle={{ color: Colors.green }}
            precision={2}
            suffix={
              <TokenP color={tokenColor ? tokenColor : Colors.green}>
                {token ? token : 'STT'}
              </TokenP>
            }
            prefix="+"
            value={double}
          />
        ) : (
          <TokenP color={tokenColor ? tokenColor : Colors.green}>
            {token ? token : 'STT'}
          </TokenP>
        )
      }
      value={value}
      {...rest}
    />
  )
}

export const ColoredWord: React.FC<STTProps> = (props) => {
  const { before, after, word } = props
  return (
    <FlexDiv>
      {before ? <TokenP color={before.color}>{before.word}</TokenP> : null}
      <TokenP color={word.color}>{word?.word}</TokenP>
      {after ? <AfterP color={after.color}>{after.word}</AfterP> : null}
    </FlexDiv>
  )
}

export const STT = () => (
  <ColoredWord word={{ color: Colors.green, word: 'STT' }} />
)

export const STTS = () => (
  <ColoredWord
    word={{ color: Colors.green, word: 'STT' }}
    after={{ color: Colors.red, word: 'S' }}
  />
)

export const BNB = () => (
  <ColoredWord word={{ color: Colors.red, word: 'BNB' }} />
)

export const BTC = () => (
  <ColoredWord word={{ color: Colors.red, word: 'BTC' }} />
)

interface TokensProps {
  component?: JSX.Element
  after?: boolean
  before?: boolean
  word?: string
}

export const Tokens: React.FC<TokensProps> = (props) => {
  const { component, before = true, after, word } = props
  return (
    <MineSTT>
      {before && word && word}
      {component && component}
      {after && word && word}
    </MineSTT>
  )
}
