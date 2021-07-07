import React from 'react'
import notification from 'antd/lib/notification'
import { store } from '../_store/store.config'
import { SHOW_SNACKBAR } from '../_types/snackbar.types'
import chainList from './chainList'
import { shorter } from './constants'
import Button from 'antd/lib/button'

export const errorHandler = (err: any, type?: any, link?: string): void => {
  let error = errorCompiler(err)
  console.log(error, err, type, link)
  if (error) {
    if (type) store.dispatch({ type, payload: { error } })
    store.dispatch({
      type: SHOW_SNACKBAR,
      snackbar: snackBarMaker(error, 'error', link),
    })
  }
}
export const successHandler = (err: any, type?: any, link?: string): void => {
  let error = errorCompiler(err)
  if (type) store.dispatch({ type, payload: { error } })
  store.dispatch({
    type: SHOW_SNACKBAR,
    snackbar: snackBarMaker(error, 'success', link),
  })
}
export const warningHandler = (err: any, type?: any, link?: string): void => {
  let error = errorCompiler(err)
  if (type) store.dispatch({ type, payload: { error } })
  store.dispatch({
    type: SHOW_SNACKBAR,
    snackbar: snackBarMaker(error, 'warning', link),
  })
}

const errorCompiler = (err: string | any) =>
  typeof err === 'string'
    ? err.replace(/<[^>]+>/g, '')
    : typeof err === 'object'
    ? err?.data?.message.split('::')[1]
    : 'Message Not Found!'

export const snackBarMaker = (
  message: string,
  variant: 'error' | 'success' | 'warning',
  link?: React.ReactNode
) => {
  let txLink = ''
  let btn
  if (link) {
    const chainId = store.getState().wallet.chainId
    const url = chainList[chainId].explorers[0].url
    txLink = `${url}/tx/${link}`
    btn = (
      <Button
        type="text"
        size="large"
        onClick={() => window.open(txLink, '_blank')}
      >
        {shorter(link)}
      </Button>
    )
  }

  notification[variant]({
    message,
    placement: 'bottomRight',
    duration: variant === 'success' ? 5 : 10,
    btn,
  })
}
