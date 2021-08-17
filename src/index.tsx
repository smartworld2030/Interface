import ReactDOM from 'react-dom'
import { ReactNode, StrictMode, useMemo } from 'react'
import { Provider } from 'react-redux'
import { store } from 'state'
import App from './App'
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { BLOCKED_ADDRESSES } from './config/constants'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import BankUpdater from './state/bank/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import { getLibrary } from 'utils/web3React'
import { useThemeManager } from 'state/user/hooks'
import { Web3ReactProvider } from '@web3-react/core'
import { ModalProvider, light, dark } from '@pancakeswap/uikit'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'styled-components'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'

import './index.less'

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <BankUpdater />
    </>
  )
}

function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

const ThemeProviderWrapper = (props) => {
  const [isDark] = useThemeManager()
  return <ThemeProvider theme={isDark ? light : dark} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

ReactDOM.render(
  <StrictMode>
    <Blocklist>
      <Providers>
        <Updaters />
        <App />
      </Providers>
    </Blocklist>
  </StrictMode>,
  document.getElementById('root'),
)
