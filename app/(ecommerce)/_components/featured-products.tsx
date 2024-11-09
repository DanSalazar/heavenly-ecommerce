import ProductComponent from '@/components/ecommerce/product-component'
import { marcellus } from '@/components/fonts'
import { getFeaturedProducts } from '@/data/products'

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="flex flex-col gap-4 my-8">
      <h2 className={marcellus.className + ' text-2xl uppercase'}>
        Featured Products
      </h2>
      <div className="grid md:grid-cols-products gap-4">
        {featuredProducts.map(product => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
