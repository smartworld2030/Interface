import React from 'react'
import { AppRouter } from '../../router/AppRouter'
import ProtectedRoute from '../../router/ProtectedRoute'

interface ContentProps {
  isMobile: boolean
  height: number
}

export const Wallet: React.FC<ContentProps> = (props) => {
  return <ProtectedRoute {...props} component={<AppRouter {...props} />} />
}
