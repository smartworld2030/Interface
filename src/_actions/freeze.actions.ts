import { ThunkDispatch } from 'redux-thunk'
import { AppState, SAVE, FAILURE, REQUEST, SUCCESS } from '../_types'
import { AppActions } from '../_types'
import { errorHandler } from '../_helpers/alert'

export const requestFreeze = (path) => (
  dispatch: ThunkDispatch<AppState, undefined, AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: REQUEST.FREEZE })
  // API.get(`/lesson/v2/guide?id=${path.guide}`)
  //   .then((res) => {
  //     dispatch({ type: SUCCESS.FREEZE, data: res.data[0] })
  //     dispatch({ type: SAVE.FREEZE_BANK, data: res.data })
  //   })
  //   .catch((err) => errorHandler(err, FAILURE.FREEZE))
}
