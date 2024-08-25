import ProductsTable from './products-table'
import { PRODUCTS_PER_ROW } from '@/lib/constants'
import { db } from '@/db'
import { makeFiltersBySearchParams } from '@/db/utils'

export default async function ProductsTableContainer({
  searchParams
}: {
  searchParams?: any
}) {
  const offset = searchParams?.page
    ? Number(searchParams?.page - 1) * PRODUCTS_PER_ROW
    : 0
  const filterByParams = makeFiltersBySearchParams(searchParams)
  const products = await db.query.product.findMany({
    limit: PRODUCTS_PER_ROW,
    offset,
    where: (_fields, { and }) => and(...filterByParams)
  })

  return <ProductsTable products={products} />
}
