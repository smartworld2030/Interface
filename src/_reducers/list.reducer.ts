import { DefaultListState } from '_types'

const initialState: DefaultListState = {
  address: '0xd25DF91AceF41F73aa441693779B1F48eF7913c1',
  '97': {},
  '56': {},
}

export const listReducer = (state = initialState): DefaultListState => {
  return state
}
