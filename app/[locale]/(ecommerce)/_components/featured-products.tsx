import ProductComponent from '@/components/ecommerce/product-component'
import { getFeaturedProducts } from '@/data/products'
import FeaturedProductsTitle from './featured-products-title'

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="flex flex-col gap-4 my-8">
      <FeaturedProductsTitle />
      <div className="grid md:grid-cols-products gap-4">
        {featuredProducts.map(product => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
