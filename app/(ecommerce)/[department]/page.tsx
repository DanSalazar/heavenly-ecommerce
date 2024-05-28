import ProductComponent from '@/components/ecommerce/product'
import FilterProducts from '@/components/filter/filter-products'
import { getFilters, getProducts } from '@/server/actions'

export default async function Page({
  params,
  searchParams
}: {
  params: { department: string }
  searchParams: unknown
}) {
  const data = await getProducts(params.department, searchParams)
  const filters = await getFilters()

  if (!data)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <h2 className="text-5xl font-semibold">Department not Available</h2>
      </div>
    )

  return (
    <main className="flex flex-col gap-4 mt-12">
      <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
        {params.department}
      </h2>
      <FilterProducts filters={filters} />
      <div className="flex flex-wrap gap-4 border-t py-4 border-zinc-200">
        {data.map(item => (
          <ProductComponent product={item.product} />
        ))}
      </div>
    </main>
  )
}
