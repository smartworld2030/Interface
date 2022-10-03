import { FlexDiv } from './divs/Divs'

interface LoadingProps extends React.CSSProperties {
  globeHeight: number
  appWidth: number
}

const Loading: React.FC<LoadingProps> = ({
  globeHeight,
  appWidth,
  ...rest
}) => {
  return (
    <FlexDiv
      style={{
        height: globeHeight,
        width: appWidth,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'green',
        ...rest,
      }}
    >
      loading...
    </FlexDiv>
  )
}

export default Loading
