import Countdown from 'react-countdown'
import { AbsoluteBody, RelativeBody } from 'components/Layout/divs/Divs'
import Typography from 'antd/lib/typography'
import Colors from 'Theme/Colors'

interface StartTimerProps {
  width: number
  isMobile: boolean
}
const startTime = new Date('July 18, 2022 5:00:00 PM')

const StartTimer: React.FC<StartTimerProps> = () => {
  return (
    <RelativeBody>
      <AbsoluteBody zIndex={60} top={20}>
        <Typography style={{ fontSize: '3rem' }}>
          <Countdown date={startTime} />
        </Typography>
        <Typography>EARN THROUGH GAME STOCKS</Typography>
        <Typography style={{ display: 'inline-flex' }}>
          WITH&nbsp;
          <Typography style={{ color: Colors.green }}>BUSD</Typography>
        </Typography>
      </AbsoluteBody>
    </RelativeBody>
  )
}

export default StartTimer
