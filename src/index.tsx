import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.less'
import { store } from './_store/store.config'

ReactDOM.render(
  <Provider store={store as any}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
