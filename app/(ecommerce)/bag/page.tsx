import { getBag } from '@/server/actions'
import BagEmpty from '../_components/bag-empty'
import ProductRow from '@/components/shopping-bag/product-row'
import { reduceBagPrice } from '@/utils'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import Summary from './_components/summary'

export default async function Page() {
  const bag = await getBag()

  if (!bag?.bagItem.length) return <BagEmpty />

  const total = reduceBagPrice(bag.bagItem)

  return (
    <>
      <BreadcrumbWrapper />
      <div className="my-12 flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <header className="mb-8 flex justify-between items-center flex-wrap">
            <h2 className="uppercase text-7xl font-medium">Shopping Bag</h2>
            <span className="font-medium bg-primary py-1 px-3 rounded-md text-white">
              {bag.bagItem.length}
            </span>
          </header>
          <div>
            {bag.bagItem.map(bag_item => {
              if (!bag_item.product_variant) return <></>
              const { product_variant } = bag_item

              if (!product_variant.product) return <></>

              return (
                <ProductRow
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
