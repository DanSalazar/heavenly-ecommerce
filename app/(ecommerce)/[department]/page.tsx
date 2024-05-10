import ProductComponent from '@/components/ecommerce/product'
import FilterProducts from '@/components/filter/filter-products'
import { getProducts } from '@/server/actions'

export default async function Page({ params }: { params: { department: string } }) {
  const data = await getProducts()

  if (!data) return <div>
    No products
  </div>

  return (
    <main className="flex flex-col gap-4 mt-12">
      <h2 className="text-7xl font-semibold uppercase break-words">
        {params.department}
      </h2>
      <FilterProducts/>
      <div className="flex flex-wrap gap-4 border-t py-4 border-zinc-200">
        {data.map(item => (
          <ProductComponent product={item} />
        ))}
      </div>
    </main>
  )
}
