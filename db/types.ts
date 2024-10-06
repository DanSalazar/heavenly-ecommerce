import * as schema from './schema'

export type Product = typeof schema.product.$inferSelect
export type ProductInsert = typeof schema.product.$inferInsert

export type Color = typeof schema.color.$inferSelect
export type Size = typeof schema.size.$inferSelect
export type Category = typeof schema.category.$inferSelect

export type ProductVariants = typeof schema.productVariations.$inferSelect
export type ProductVariantsInsert = Omit<ProductVariants, 'id'> & {
  id?: number
}
export type ProductVariantWithJoins = Pick<ProductVariants, 'id' | 'stock'> & {
  product: Omit<Product, 'status' | 'created_at' | 'featured' | 'category_id'>
  color: Color
  size: Size
}

export type ProductWithVariants = Product & {
  productVariations?: ProductVariantWithJoins[]
}

export type Bag = typeof schema.bagItem.$inferSelect
export type BagItem = Bag & {
  product_variant: ProductVariantWithJoins
}

export type OrderType = typeof schema.order.$inferSelect

export type ImageSelect = typeof schema.imagesTable.$inferSelect
export type ImageInsert = typeof schema.imagesTable.$inferInsert
export type ImageInsertNoProductId = Omit<ImageInsert, 'product_id'>

export type ShopInformation = typeof schema.shopInformation.$inferSelect
