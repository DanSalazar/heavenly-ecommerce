import { getProducts } from '@/server/actions'
import ProductsTable from './products-table'

export default async function ProductsTableContainer({
  searchParams
}: {
  searchParams?: unknown
}) {
  const products = await getProducts('', searchParams)

  return <ProductsTable products={products} />
}
