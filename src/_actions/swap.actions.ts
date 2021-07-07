import { ThunkDispatch } from 'redux-thunk'
import { AppState, FAILURE, REQUEST, SUCCESS } from '../_types'
import { requestFreeze } from './freeze.actions'
import { AppActions } from '../_types'
// import { errorHandler } from '../components/Layout/SnackBar/alert'

export const requestSwap = (path) => (
  dispatch: ThunkDispatch<AppState, undefined, AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: REQUEST.SWAP })
  // API.get(`/lesson/v2/course?id=${path.course}`)
  //   .then((res) => {
  //     const { lessons, exercises } = Compiler(res.data[0].course_select)
  //     dispatch({ type: SUCCESS.SWAP, data: res.data[0] })
  //     dispatch({ type: SAVE.SWAP_BANK, data: res.data })
  //     dispatch({ type: SAVE.LESSONS, data: lessons })
  //     dispatch({ type: SAVE.EXERCISES, data: exercises })
  //     if (path.lesson) dispatch(requestLesson(newPath))
  //     if (path.exercise) dispatch(requestExercise(newPath))
  //   })
  //   .catch((err) => errorHandler(err, FAILURE.SWAP))
}

// const Compiler = (course_select: SwapSelect[]) => {
//   const lessons: ICardDetail[] = []
//   const exercises: ICardDetail[] = []
//   course_select.map((select) =>
//     select.info.genre?.name === 'Exercise'
//       ? exercises.push(select)
//       : lessons.push(select)
//   )
//   return { lessons, exercises }
// }
