import Button from 'antd/lib/button'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWalletModal } from '@smartworld-libs/uikit'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
