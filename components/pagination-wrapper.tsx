import PaginationComponent from '@/components/pagination'
import { getProductsLength } from '@/data/products'

type PaginationWrapperProps = {
  query?: any
  productsPerPage: number
  department?: string
}

export default async function PaginationWrapper({
  query = {},
  productsPerPage,
  department
}: PaginationWrapperProps) {
  const productsCount = await getProductsLength({
    query,
    department
  })

  return (
    <PaginationComponent
      productsLength={productsCount}
      productsPerPage={productsPerPage}
    />
  )
}
