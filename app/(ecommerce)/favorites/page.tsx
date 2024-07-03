'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Favorites from './_components/favorites'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <BreadcrumbWrapper />
      <Favorites />
    </QueryClientProvider>
  )
}
