import { getNewProductFields } from '@/data/products'
import { ProductForm } from '../_components/product-form'
import { VariantFields } from '@/db/types'

export const metadata = {
  title: 'New Product'
}

export default async function Page() {
  await new Promise(resolve => setTimeout(resolve, 20000))
  const variantFields: VariantFields = await getNewProductFields()

  return <ProductForm variantFields={variantFields} />
}
