import BagEmpty from '../_components/bag-empty'
import ProductRow from '@/components/shopping-bag/product-row'
import { reduceBagPrice } from '@/lib/utils'
import BreadcrumbWrapper from '@/components/ui/breadcrumb-wrapper'
import Summary from './_components/summary'
import { getBag } from '@/data/bag'
import BagHeader from './_components/bag-header'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata.bag')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function Page() {
  const bag = await getBag()

  if (!bag.length) return <BagEmpty />

  const total = reduceBagPrice(bag)

  return (
    <>
      <BreadcrumbWrapper />
      <div className="my-12 flex flex-col md:grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <BagHeader count={bag.length} />
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
