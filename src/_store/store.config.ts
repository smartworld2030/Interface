import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import application from 'state/application/reducer'
import { updateVersion } from 'state/global/actions'
import user from 'state/user/reducer'
import transactions from 'state/transactions/reducer'
import swap from 'state/swap/reducer'
import lists from 'state/lists/reducer'
import burn from 'state/burn/reducer'
import multicall from 'state/multicall/reducer'
import { walletReducer } from '_reducers/wallet.reducer'
import { accountReducer } from '_reducers/account.reducer'
import { bankReducer } from '_reducers/bank.reducer'
// import { swapReducer } from '_reducers/swap.reducer'
import { investReducer } from '_reducers/invest.reducer'
import { poolReducer } from '_reducers/pool.reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

export const history = createBrowserHistory()

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    router: connectRouter(history) as any,
    account: accountReducer,
    bank: bankReducer,
    invest: investReducer,
    pool: poolReducer,
    wallet: walletReducer,
    application,
    user,
    transactions,
    swap,
    burn,
    multicall,
    lists,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: true }),
    routerMiddleware(history),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()
