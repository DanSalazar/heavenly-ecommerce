import { db } from '@/db'
import { product } from '@/db/schema'
import ProductComponent from './product-component'
import ProductsWrapper from './products-wrapper'

export default async function RelatedProducts() {
  const products = await db.select().from(product).limit(4)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl">Related Products</h2>
      <ProductsWrapper>
        {products.map(product => (
          <ProductComponent product={product} key={product.id} />
        ))}
      </ProductsWrapper>
    </div>
  )
}
