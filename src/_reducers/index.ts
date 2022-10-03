import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import { accountReducer } from './account.reducer'
import { bankReducer } from './bank.reducer'
import { investReducer } from './invest.reducer'
import { invest02Reducer } from './invest02.reducer'
import { landReducer } from './land.reducer'
import { poolReducer } from './pool.reducer'
import { stockReducer } from './stock.reducer'
import { swapReducer } from './swap.reducer'
import { walletReducer } from './wallet.reducer'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    land: landReducer,
    account: accountReducer,
    bank: bankReducer,
    invest: investReducer,
    invest02: invest02Reducer,
    pool: poolReducer,
    swap: swapReducer,
    stock: stockReducer,
    wallet: walletReducer,
  })

export default rootReducer
