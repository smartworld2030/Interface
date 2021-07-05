import React from 'react'
import notification from 'antd/lib/notification'
import { store } from '../_store/store.config'
import { SHOW_SNACKBAR } from '../_types/snackbar.types'
import CloseSquareOutlined from 'antd/lib/icon'

export const errorHandler = (err: any, target?: any): void => {
  let error = err
  let link
  if (typeof err !== 'string') error = err.response?.data.message.toString()
  if (error) {
    if (target) store.dispatch({ type: target, error })
    if (err.response?.data.button) link = err.response?.data.button
    store.dispatch({
      type: SHOW_SNACKBAR,
      snackbar: snackBarMaker(error, 'error', link),
    })
  }
}
export const seccessHandler = (err: any, target?: any): void => {
  let error = err
  if (typeof err !== 'string') error = err.response?.data.message.toString()
  if (target) store.dispatch({ type: target, error })
  store.dispatch({
    type: SHOW_SNACKBAR,
    snackbar: snackBarMaker(error, 'success'),
  })
}
export const warningHandler = (err: any, target?: any): void => {
  let error = err
  if (typeof err !== 'string') error = err.response?.data.message.toString()
  if (target) store.dispatch({ type: target, error })
  store.dispatch({
    type: SHOW_SNACKBAR,
    snackbar: snackBarMaker(error, 'warning'),
  })
}

export const snackBarMaker = (
  message: string,
  variant: 'error' | 'success' | 'warning',
  link?: React.ReactNode
) => {
  notification[variant]({
    message: message.replace(/<[^>]+>/g, ''),
    placement: 'bottomRight',
    duration: 5,
    btn: link,
    closeIcon: null,
  })
}
