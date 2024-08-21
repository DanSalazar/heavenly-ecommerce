import PaginationComponent from '@/components/pagination'
import { getProductsCount } from '@/server/actions'

type PaginationWrapperProps = {
  searchParams?: any
  productsPerPage: number
  department?: string
}

export default async function PaginationWrapper({
  searchParams = {},
  productsPerPage,
  department
}: PaginationWrapperProps) {
  const productsCount = await getProductsCount({ searchParams, department })

  return (
    <PaginationComponent
      productsLength={productsCount}
      productsPerPage={productsPerPage}
    />
  )
}
