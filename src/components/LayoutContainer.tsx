"use client"

import { ThemeProvider } from 'next-themes'
import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

type Props = {
    children: React.ReactNode
}

export default function LayoutContainer({children}: Props) {
  return (
    <ThemeProvider attribute='class'>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
      
    </ThemeProvider>
  )
}