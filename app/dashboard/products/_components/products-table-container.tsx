import { getProductBySearchParams } from '@/server/actions'
import ProductsTable from './products-table'

export default async function ProductsTableContainer({
  searchParams
}: {
  searchParams?: unknown
}) {
  const products = await getProductBySearchParams({ searchParams })

  return <ProductsTable products={products} />
}
