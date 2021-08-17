import Input from 'antd/lib/input'
import { Row } from 'react-grid-system'
import { PoolCircleInput } from './PoolCircleInput'

interface PoolDepositCircleProps {
  width: number
  value: number
  token: string
  error?: string
  percent: number
  disable?: boolean
  placeholder: string
  percentHandler: (arg: number) => void
  inputHandler: (arg: any) => void
}

const PoolDepositCircle: React.FC<PoolDepositCircleProps> = ({
  width,
  value,
  percent,
  token,
  disable,
  placeholder,
  inputHandler,
  percentHandler,
}) => {
  const roundSlideTune = (event) => {
    const x = event.pageX || event.touches[0]?.clientX
    const y = event.pageY || event.touches[0]?.clientY
    let elPos = event.target.getBoundingClientRect()
    let dX = 0,
      dY = 0,
      cX = elPos.width / 2,
      cY = elPos.height / 2,
      eX = x - elPos.left,
      eY = y - elPos.top

    if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
      dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2
      dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2
    } else {
      dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2
      dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2
    }
    if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
      dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2
      dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2
    } else {
      dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2
      dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2
    }

    dX = Math.round((dX / 150) * 100)
    dY = Math.round((dY / 150) * 100)

    if (0 <= dX && dX < 50 && dY === 0) {
      percentHandler(100 - Math.round(((50 - dX) / 50) * 12.5))
    } else if (dX === 0 && 0 <= dY && dY <= 100) {
      percentHandler(100 - Math.round(12.5 + (dY / 100) * 25))
    } else if (0 <= dX && dX <= 100 && dY === 100) {
      percentHandler(100 - Math.round(37.5 + (dX / 100) * 25))
    } else if (dX === 100 && 0 <= dY && dY <= 100) {
      percentHandler(100 - Math.round(62.5 + ((100 - dY) / 100) * 25))
    } else if (50 <= dX && dX <= 100 && dY === 0) {
      percentHandler(100 - Math.round(87.5 + ((100 - dX) / 50) * 12.5))
    }
  }

  const circleSlider = (event) => {
    if (event.buttons === 1 || event.buttons === 3) {
      roundSlideTune(event)
    }
  }

  const maxButtonHandler = () => {
    percentHandler(100)
  }

  return (
    <Row
      justify="center"
      direction="column"
      style={{
        position: 'relative',
        touchAction: 'none',
        width,
        height: width,
      }}
    >
      <Row
        justify="around"
        direction="column"
        onTouchMove={roundSlideTune}
        onMouseMove={circleSlider}
        style={{
          width: width * 0.65,
          height: width / 2,
          fontSize: 10,
          fontWeight: 'bold',
          margin: 'auto',
          zIndex: 20,
        }}
      >
        <Input
          value={value === 0 ? '' : value}
          placeholder={placeholder}
          className="deposit-input"
          onChange={({ target }) => inputHandler(target.value)}
        />
      </Row>
      <PoolCircleInput
        disable={disable}
        percent={percent}
        width={width}
        token={token}
        onClick={roundSlideTune}
        onMax={maxButtonHandler}
        onTouchEnd={roundSlideTune}
        onTouchMove={roundSlideTune}
        onMouseMove={circleSlider}
        disableMax
      />
    </Row>
  )
}

export default PoolDepositCircle
