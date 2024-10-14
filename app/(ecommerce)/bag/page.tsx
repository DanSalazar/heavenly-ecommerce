import BagEmpty from '../_components/bag-empty'
import ProductRow from '@/components/shopping-bag/product-row'
import { reduceBagPrice } from '@/lib/utils'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import Summary from './_components/summary'
import { getBag } from '@/data/bag'

export default async function Page() {
  const bag = await getBag()

  if (!bag.length) return <BagEmpty />

  const total = reduceBagPrice(bag)

  return (
    <>
      <BreadcrumbWrapper />
      <div className="my-12 flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <header className="mb-8 flex items-start gap-2">
            <h2 className="uppercase text-4xl md:text-7xl font-semibold break-words">
              Your bag{' '}
              <span className="text-xl md:text-2xl">({bag.length})</span>
            </h2>
          </header>
          <div>
            {bag.map(bag_item => {
              if (!bag_item.product_variant) return <></>
              const { product_variant } = bag_item

              if (!product_variant.product) return <></>

              return (
                <ProductRow
                  stock={product_variant.stock}
                  key={product_variant.id}
                  id={bag_item.id}
                  quantity={bag_item.quantity!}
                  product={product_variant.product}
                  color={product_variant.color?.name!}
                  size={product_variant.size?.name!}
                />
              )
            })}
          </div>
        </div>
        <Summary total={total} />
      </div>
    </>
  )
}
