import React from 'react'
import { AppRouter } from '../../router/AppRouter'
import ProtectedRoute from '../../router/ProtectedRoute'

interface ContentProps {
  isMobile: boolean
}

export const Wallet: React.FC<ContentProps> = ({ isMobile }) => {
  return (
    <ProtectedRoute
      isMobile={isMobile}
      component={<AppRouter isMobile={isMobile} />}
    />
  )
}
