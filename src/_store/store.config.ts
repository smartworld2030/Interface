import { createBrowserHistory } from 'history'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../_reducers'
import { AppActions, AppState } from '../_types'

export const history = createBrowserHistory()

export const store = configureStore()

export default function configureStore(preloadingState?: any) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    createRootReducer(history),
    preloadingState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk as ThunkMiddleware<AppState, AppActions>
      )
    )
  )

  return store
}
