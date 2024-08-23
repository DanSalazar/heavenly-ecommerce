import { getProductBySearchParams } from '@/server/actions'
import ProductsTable from './products-table'
import { PRODUCTS_PER_ROW } from '@/lib/constants'

export default async function ProductsTableContainer({
  searchParams
}: {
  searchParams?: any
}) {
  const offset = searchParams?.page
    ? Number(searchParams?.page - 1) * PRODUCTS_PER_ROW
    : 0
  const products = await getProductBySearchParams({
    searchParams,
    offset,
    limit: PRODUCTS_PER_ROW
  })

  return <ProductsTable products={products} />
}
