import { BagPageSkeleton } from '@/components/skeletons'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'

export default function Loading() {
  return (
    <>
      <BreadcrumbWrapper />
      <BagPageSkeleton />
    </>
  )
}
