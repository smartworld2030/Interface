import React from 'react'
import Input from 'antd/lib/input'
import { CircleInput } from './CircleInput'

interface DepositCircleProps {
  width: number
  value: number
  token: string
  setValue: (arg: number) => void
}

const DepositCircle: React.FC<DepositCircleProps> = ({
  width,
  value,
  token,
  setValue,
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
      setValue(100 - Math.round(((50 - dX) / 50) * 12.5))
    } else if (dX === 0 && 0 <= dY && dY <= 100) {
      setValue(100 - Math.round(12.5 + (dY / 100) * 25))
    } else if (0 <= dX && dX <= 100 && dY === 100) {
      setValue(100 - Math.round(37.5 + (dX / 100) * 25))
    } else if (dX === 100 && 0 <= dY && dY <= 100) {
      setValue(100 - Math.round(62.5 + ((100 - dY) / 100) * 25))
    } else if (50 <= dX && dX <= 100 && dY === 0) {
      setValue(100 - Math.round(87.5 + ((100 - dX) / 50) * 12.5))
    }
  }

  const circleSlider = (event) => {
    if (event.buttons === 1 || event.buttons === 3) {
      roundSlideTune(event)
    }
  }

  const maxButtonHandler = () => {
    setValue(100)
  }

  const inputHandler = (e) => {
    const value = e.currentTarget?.valueAsNumber
    setValue(value < 0 ? 100 : value)
  }

  return (
    <div style={{ position: 'relative', width, height: width }}>
      <Input
        style={{
          position: 'absolute',
          zIndex: 20,
          top: '42%',
          left: '20%',
          width: width * 0.6,
        }}
        placeholder="100%"
        type="number"
        size="large"
        value={value}
        onChange={inputHandler}
      />
      <CircleInput
        value={value}
        width={width}
        token={token}
        onClick={roundSlideTune}
        onTouchEnd={roundSlideTune}
        onTouchMove={roundSlideTune}
        onMouseMove={circleSlider}
        onMax={maxButtonHandler}
      />
    </div>
  )
}

export default DepositCircle
