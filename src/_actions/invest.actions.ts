import { Dispatch } from 'redux'
import { REQUEST, SUCCESS, FAILURE, AppState } from '../_types'
import { AppActions } from '../_types'
import { errorHandler } from '../_helpers/alert'
import { getTheTime } from '../_helpers/constants'

export const requestAllPost = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: REQUEST.INVEST_BANK })

  // API.get(`/invest/v2`)
  //   .then((res) =>
  //     dispatch({
  //       type: SUCCESS.INVEST_BANK,
  //       payload: {
  //         data: res.data,
  //         nextLoad: getTheTime(10),
  //       },
  //     })
  //   )
  //   .catch((err) => errorHandler(err, FAILURE.INVEST_BANK))
}

export const requestPost = (id: number) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: REQUEST.INVEST })
  // API.get(`/invest/v2?id=${id}`)
  //   .then((res) => dispatch({ type: SUCCESS.INVEST, data: res.data[0] }))
  //   .catch((err) => errorHandler(err, FAILURE.INVEST))
}
