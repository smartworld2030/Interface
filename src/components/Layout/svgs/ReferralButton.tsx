import Colors from '../../../Theme/Colors'
import { Button } from '@smartworld-libs/uikit'

interface ReferralPolygonProps {
  width: number
  disable?: boolean
  onClick: () => void
}

const ReferralButton: React.FC<ReferralPolygonProps> = ({ disable, onClick }) => {
  return (
    <Button shape="circle" scale="ml" variant="secondary" onClick={disable ? undefined : onClick}>
      <svg
        viewBox="0 0 100 100"
        focusable="false"
        data-icon="check"
        opacity="0.6"
        fill={disable ? Colors.grey : Colors.green}
      >
        <path className="ref-btn-scale-1" d="M 50 20 L 70 50 L 30 50 L 50 20" />
        <path className="ref-btn-scale-2" d="M 30 55 L 20 70 L 40 70 L 30 55" />
        <path className="ref-btn-scale-3" d="M 70 55 L 80 70 L 60 70 L 70 55" />
      </svg>
    </Button>
  )
}

export default ReferralButton
