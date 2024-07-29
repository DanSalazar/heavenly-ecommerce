import { getNewProductFields, getProductById } from '@/server/actions'
import { EditProductForm } from '../../_components/edit-form'
import { VariantFields } from '../../new/page'

export default async function Page({ params }: { params: { id: string } }) {
  const variantFields: VariantFields = await getNewProductFields()
  const product = await getProductById(params.id)

  if (!product) return 'No product'

  return (
    <EditProductForm
      variantFields={variantFields}
      variants={product.productVariations}
      product={product}
      images={product.images}
    />
  )
}
