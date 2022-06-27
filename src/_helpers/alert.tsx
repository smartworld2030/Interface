import React from 'react'
import notification from 'antd/lib/notification'
import { store } from '../_store/store.config'
import { SHOW_SNACKBAR } from '../_types/snackbar.types'
import chainList from './chainList'
import { shorter } from './constants'
import Button from 'antd/lib/button'
import invest05Error from './invest05Error.json'

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
  switch (typeof err) {
    case 'string':
      return err.replace(/<[^>]+>/g, '')
    case 'object':
      let message: string | undefined = err?.data?.message || err?.message
      if (message) {
        const msg = message.replace('execution reverted: ', '')
        if (msg.length === 3) return invest05Error[msg]
        else if (msg.includes('MetaMask Tx Signature:'))
          return msg.replace('MetaMask Tx Signature: ', '')
        else return msg.split('::')[1]
      } else {
        return 'Message Not Found!'
      }
    default:
      return 'Message Not Found!'
  }
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
