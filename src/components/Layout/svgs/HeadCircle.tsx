import { Link } from 'react-router-dom'
import Colors from '../../../Theme/Colors'

interface HeadCircleProps {
  positionX: number
  positionY: number
  size: number
  text: string
  link: string
  onClick: () => void
  active: boolean
}

export const HeadCircle: React.FC<HeadCircleProps> = ({
  positionX,
  positionY,
  size,
  onClick,
  active,
  text,
  link,
}) => {
  return (
    <g onClick={onClick}>
      <Link to={link}>
        <circle
          cx={positionX}
          cy={positionY - size}
          r={size}
          stroke={active ? Colors.text : Colors.secondText}
          strokeWidth="1"
          fill={Colors.background}
        />
        <text
          x={positionX}
          y={positionY - size}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={size / 2}
          fontWeight="700"
          fill={active ? Colors.text : Colors.secondText}
        >
          {text}
        </text>
      </Link>
    </g>
  )
}
