import { ConnectedRouter } from 'connected-react-router'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.less'
import { history, store } from './_store/store.config'

ReactDOM.render(
  <Provider store={store as any}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
