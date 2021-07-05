import { Slider } from 'antd'

const marks = {
  500000: '500k',
  2500000: '2.5m',
  5000000: {
    style: {
      color: '#f50',
    },
    label: <strong>5m</strong>,
  },
}

interface AmountSliderProps {}

export const AmountSlider: React.FC<AmountSliderProps> = () => {
  return (
    <Slider
      marks={marks}
      onAfterChange={(tip) => console.log(tip)}
      defaultValue={500000}
      min={500000}
      max={8000000}
    />
  )
}
