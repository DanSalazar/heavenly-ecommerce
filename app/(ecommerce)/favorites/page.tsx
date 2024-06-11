'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Favorites from './_components/favorites'

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Favorites />
    </QueryClientProvider>
  )
}
