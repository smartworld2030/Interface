import { Link } from 'react-router-dom'
import Colors from '../../Theme/Colors'

interface HeadCircleProps {
  positionX: number
  positionY: number
  textPos: number
  size: number
  text: string
  link: string
  onClick: () => void
  active: boolean
  icon: JSX.Element
}

export const HeadCircle: React.FC<HeadCircleProps> = ({
  positionX,
  positionY,
  size,
  onClick,
  active,
  text,
  link,
  icon,
  textPos,
}) => {
  return (
    <g onClick={onClick} filter={active ? undefined : 'url(#greyscale)'}>
      <Link to={link}>
        <circle
          cx={positionX}
          cy={positionY - size}
          r={size}
          stroke={active ? Colors.text : Colors.secondText}
          strokeWidth="1"
          filter={active ? 'url(#dropshadow)' : undefined}
        />
        {icon}
        <text
          x={positionX}
          y={textPos}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={size * 0.55}
          fontWeight="700"
          fill={active ? Colors.text : 'white'}
        >
          {text}
        </text>
      </Link>
    </g>
  )
}
