import { EditProductForm } from '../../_components/edit-form'
import { getFullProduct, getNewProductFields } from '@/data/products'
import { Category, Color, Size, VariantFields } from '@/db/types'

export default async function Page({ params }: { params: { id: string } }) {
  const variantFields: VariantFields = await getNewProductFields()
  const product = await getFullProduct({ id: params.id })

  if (!product)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
      </div>
    )

  return (
    <EditProductForm
      variantFields={variantFields}
      variants={product.productVariations}
      product={product}
      images={product.images}
    />
  )
}
