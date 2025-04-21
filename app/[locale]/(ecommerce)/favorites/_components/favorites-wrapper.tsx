'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Favorites from './favorites'

const queryClient = new QueryClient()

export default function FavoritesWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Favorites />
    </QueryClientProvider>
  )
}
