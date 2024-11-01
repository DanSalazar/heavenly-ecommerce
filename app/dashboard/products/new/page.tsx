import { getNewProductFields } from '@/data/products'
import { ProductForm } from '../_components/product-form'
import { VariantFields } from '@/db/types'

export const metadata = {
  title: 'New Product'
}

export default async function Page() {
  const variantFields: VariantFields = await getNewProductFields()

  return <ProductForm variantFields={variantFields} />
}
