import { getNewProductFields, getProductById } from '@/server/actions'
import { EditProductForm } from '../../_components/edit-form'
import { VariantFields } from '../../new/page'

export default async function Page({ params }: { params: { id: string } }) {
  const variantFields: VariantFields = await getNewProductFields()
  const product = await getProductById(params.id)

  if (!product || !product[0]?.product) return 'No product'

  return (
    <EditProductForm
      variantFields={variantFields}
      variants={product}
      product={product[0].product}
    />
  )
}
