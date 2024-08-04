import { getProducts } from '@/server/actions'
import ProductsWrapper from './products-wrapper'
import ProductComponent from './product-component'

export default async function Products({
  department,
  searchParams
}: {
  department?: string
  searchParams?: unknown
}) {
  const data = await getProducts(department, searchParams)

  if (!data)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">Department not Available</h2>
      </div>
    )

  return (
    <ProductsWrapper>
      {data.map(item => (
        <ProductComponent key={item.product.id} product={item.product} />
      ))}
    </ProductsWrapper>
  )
}
