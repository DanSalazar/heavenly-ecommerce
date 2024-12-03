import { Category } from '@/db/types'
import { FormControl } from './form-schema'
import { ProductCategory, ProductDepartment } from './product-form-components'

export default function ProductTypeForm({
  control,
  categories
}: {
  control: FormControl
  categories: Category[]
}) {
  return (
    <>
      <ProductCategory categories={categories} control={control} />
      <ProductDepartment control={control} />
    </>
  )
}
