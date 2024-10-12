import ProductsTable from './products-table'
import { PRODUCTS_PER_ROW } from '@/lib/constants'
import { getProducts } from '@/data/products'

export default async function ProductsTableContainer({
  searchParams
}: {
  searchParams: Record<string, string>
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 0
  const offset = page > 0 ? (page - 1) * PRODUCTS_PER_ROW : 0
  const products = await getProducts({
    query: searchParams,
    limit: PRODUCTS_PER_ROW,
    offset
  })

  return <ProductsTable products={products} />
}
