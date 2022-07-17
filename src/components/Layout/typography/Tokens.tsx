import React, { ReactText } from 'react'
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
  value?: ReactText
  token?: string
  tokenColor?: string
  double?: number
  doublePrefix?: string
  doubled?: boolean
}

export const TokenValue: React.FC<TokenValueProps> = ({
  color,
  token,
  tokenColor,
  value,
  double,
  doubled,
  title,
  doublePrefix = '+',
  ...rest
}) => {
  return (
    <Statistic
      title={title}
      suffix={
        doubled && double ? (
          <Statistic
            valueStyle={{
              color: doublePrefix === '-' ? Colors.grey : Colors.green,
            }}
            precision={3}
            suffix={
              <TokenP color={tokenColor ? tokenColor : Colors.green}>
                {token ? token : 'STT'}
              </TokenP>
            }
            prefix={doublePrefix}
            value={double}
          />
        ) : (
          <TokenP color={tokenColor ? tokenColor : Colors.green}>
            {token ? token : 'STT'}
          </TokenP>
        )
      }
      value={doubled ? (double && double > 0 ? value : 0) : value}
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

export const BUSD = () => (
  <ColoredWord word={{ color: Colors.green, word: 'BUSD' }} />
)

export const STT = () => (
  <ColoredWord word={{ color: Colors.green, word: 'STT' }} />
)

export const STR = () => (
  <ColoredWord word={{ color: Colors.green, word: 'STR' }} />
)

export const STC = () => (
  <ColoredWord word={{ color: Colors.green, word: 'STC' }} />
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
