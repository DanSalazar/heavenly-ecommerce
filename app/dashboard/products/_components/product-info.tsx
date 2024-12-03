import { VariantFields } from '@/db/types'
import { FormControl } from './form-schema'
import {
  ProductArchive,
  ProductDetailsForm,
  ProductVariantsForm
} from './product-form-components'

export default function ProductInfo({
  control,
  variantFields
}: {
  control: FormControl
  variantFields: VariantFields
}) {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <ProductDetailsForm control={control} />
      <ProductVariantsForm
        error={control._formState.errors.variants?.message || ''}
        control={control}
        variantFields={variantFields}
      />
      <ProductArchive control={control} />
    </div>
  )
}
