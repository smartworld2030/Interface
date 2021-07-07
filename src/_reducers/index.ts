import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { walletReducer } from './wallet.reducer'
import { accountReducer } from './account.reducer'
import { bankReducer } from './bank.reducer'
import { swapReducer } from './swap.reducer'
import { investReducer } from './invest.reducer'
import { freezeReducer } from './freeze.reducer'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    bank: bankReducer,
    invest: investReducer,
    freeze: freezeReducer,
    swap: swapReducer,
    wallet: walletReducer,
  })

export default rootReducer
