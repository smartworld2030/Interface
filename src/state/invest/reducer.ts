import { createReducer } from '@reduxjs/toolkit'
import { updateInvestStates } from './actions'

export interface InvestData {
  maxPercent: string
}
const defaultInvestData = {
  maxPercent: '0',
}

export interface InvestState {
  readonly [chainId: number]: InvestData
}

const initialState: InvestState = { 56: defaultInvestData, 97: defaultInvestData }

export default createReducer(initialState, (builder) =>
  builder.addCase(updateInvestStates, (state, action) => {
    const { chainId, states } = action.payload
    state[chainId] = { ...states[chainId], ...states }
  }),
)
