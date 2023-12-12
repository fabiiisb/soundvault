'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

export function Providers ({ children }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextUIProvider>
  )
}
