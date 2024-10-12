import ProductComponent from '@/components/ecommerce/product-component'
import { getFeaturedProducts } from '@/data/products'

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="mt-8">
      <h2 className="font-semibold text-3xl mb-4">Featured Products</h2>
      <div className="min-h-[400px] grid md:grid-cols-products gap-4 py-4">
        {featuredProducts.map(product => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
