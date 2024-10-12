import PaginationComponent from '@/components/pagination'
import { getProductsLength } from '@/data/products'

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
  const productsCount = await getProductsLength({
    query: searchParams,
    department
  })

  return (
    <PaginationComponent
      productsLength={productsCount}
      productsPerPage={productsPerPage}
    />
  )
}
