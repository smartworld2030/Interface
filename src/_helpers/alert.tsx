import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'
import React from 'react'
import { store } from '../_store/store.config'
import { SHOW_SNACKBAR } from '../_types/snackbar.types'
import chainList from './chainList'
import { shorter } from './constants'

export const errorHandler = (err: any, type?: any, link?: string): void => {
  let error = errorCompiler(err)
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

const errorCompiler = (err: string | any) => {
  if (typeof err === 'string') return err.replace(/<[^>]+>/g, '')
  if (typeof err === 'object') {
    if (err.data) {
      if (err.data.message) return err.data.message.split('::')[1]
      return err.data.replace(/<[^>]+>/g, '')
    }
    if (err.message) return err.message.replace(/<[^>]+>/g, '')
    if (err.error) return err.error.replace(/<[^>]+>/g, '')
    if (err.response) return err.response.replace(/<[^>]+>/g, '')
    if (err.error) return err.error.replace(/<[^>]+>/g, '')
    if (err.message) return err.message.replace(/<[^>]+>/g, '')

    if (err) return err.replace(/<[^>]+>/g, '')
  }
  return 'Unknown Error'
}

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
        type="primary"
        size="large"
        style={{ width: '100%' }}
        onClick={() => window.open(txLink, '_blank')}
      >
        {shorter(link)}
      </Button>
    )
  }

  notification[variant]({
    message,
    placement: 'topRight',
    duration: variant === 'success' ? 7 : 10,
    btn,
  })
}
