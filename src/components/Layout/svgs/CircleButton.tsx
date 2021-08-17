import Colors from '../../../Theme/Colors'

interface CircleButtonProps {
  upWord?: JSX.Element
  downWord?: JSX.Element
  r: number
  x: number
  y: number
  enabled: boolean
}

const CircleButton: React.FC<CircleButtonProps> = ({
  x,
  y,
  r,
  enabled,
  upWord,
  downWord,
}) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        className="neonShadow"
        stroke={enabled ? Colors.green : Colors.grey}
        strokeWidth="1.5"
        fill={Colors.background}
        filter={enabled ? 'url(#ActiveDropShadow)' : 'url(#AnimatedDropShadow)'}
      />
      <foreignObject
        x={x - r}
        y={y * 0.55}
        fill="white"
        fontSize="9"
        width={r * 2}
        height="15"
      >
        {upWord && upWord}
      </foreignObject>
      <line
        x1={x - r}
        y1={y}
        x2={x + r}
        y2={y}
        stroke={enabled ? Colors.green : Colors.grey}
      />
      <foreignObject
        x={x - r + 2}
        y={y * 1.1}
        fill="white"
        fontSize="15"
        width={r * 2}
        height={r / 2}
      >
        {downWord && downWord}
      </foreignObject>
    </>
  )
}

export default CircleButton
