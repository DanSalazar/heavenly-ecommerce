import ProductsTable from './products-table'
import { PRODUCTS_PER_ROW } from '@/lib/constants'
import { getProducts } from '@/data/products'

export default async function ProductsTableContainer({
  query
}: {
  query: Record<string, string>
}) {
  const page = query?.page ? Number(query.page) : 0
  const offset = page > 0 ? (page - 1) * PRODUCTS_PER_ROW : 0
  const products = await getProducts({
    limit: PRODUCTS_PER_ROW,
    query,
    offset
  })

  return <ProductsTable products={products} />
}
