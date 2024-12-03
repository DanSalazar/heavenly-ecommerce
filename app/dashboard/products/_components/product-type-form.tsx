import { Category } from '@/db/types'
import { FormControlType } from './form-schema'
import { ProductCategory, ProductDepartment } from './product-form-components'

export default function ProductTypeForm({
  control,
  categories
}: {
  control: FormControlType
  categories: Category[]
}) {
  return (
    <>
      <ProductCategory categories={categories} control={control} />
      <ProductDepartment control={control} />
    </>
  )
}
