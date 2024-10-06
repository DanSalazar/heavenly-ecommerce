import { getNewProductFields } from '@/server/actions'
import { ProductForm } from '../_components/product-form'
import { Category, Color, Size } from '@/db/types'

export type VariantFields = {
  categories: Category[] | null
  size: Size[] | null
  colors: Color[] | null
}

export default async function Page() {
  const variantFields: VariantFields = await getNewProductFields()

  return <ProductForm variantFields={variantFields} />
}
