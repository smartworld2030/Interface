import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './_store/store.config'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.less'

ReactDOM.render(
  <Provider store={store as any}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
