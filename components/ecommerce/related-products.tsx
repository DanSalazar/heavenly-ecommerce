import { db } from '@/db'
import { product } from '@/db/schema'
import ProductComponent from './product-component'

export default async function RelatedProducts() {
  const products = await db.select().from(product).limit(6)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Related Products</h2>
      <div className="flex overflow-y-auto border-t gap-8 pt-4 pb-8 border-zinc-200">
        {products.map(product => (
          <ProductComponent product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
