import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './_store/store.config'
import App from './App'
import './index.less'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
