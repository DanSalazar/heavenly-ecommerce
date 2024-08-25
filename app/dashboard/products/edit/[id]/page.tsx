import { getNewProductFields } from '@/server/actions'
import { EditProductForm } from '../../_components/edit-form'
import { VariantFields } from '../../new/page'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { product as productSchema } from '@/db/schema'

export default async function Page({ params }: { params: { id: string } }) {
  const variantFields: VariantFields = await getNewProductFields()
  const product = await db.query.product.findFirst({
    where: eq(productSchema.id, params.id),
    with: {
      productVariations: {
        with: {
          color: true,
          size: true
        }
      },
      images: true
    }
  })

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
