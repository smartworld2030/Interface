import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { walletReducer } from './wallet.reducer'
import { accountReducer } from './account.reducer'
import { bankReducer } from './bank.reducer'
import { swapReducer, swapBankReducer } from './swap.reducer'
import { investReducer, investBankReducer } from './invest.reducer'
import { freezeReducer, freezeBankReducer } from './freeze.reducer'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    account: combineReducers({
      balances: accountReducer,
      invest: investReducer,
      freeze: freezeReducer,
      swap: swapReducer,
    }),
    bank: bankReducer,
    invest: investBankReducer,
    freeze: freezeBankReducer,
    swap: swapBankReducer,
    wallet: walletReducer,
  })

export default rootReducer
