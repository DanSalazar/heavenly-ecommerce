import { getNewProductFields } from '@/data/products'
import { ProductForm } from '../_components/product-form'
import { Category, Color, Size, VariantFields } from '@/db/types'

export default async function Page() {
  const variantFields: VariantFields = await getNewProductFields()

  return <ProductForm variantFields={variantFields} />
}
