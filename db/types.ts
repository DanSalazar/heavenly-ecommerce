import * as schema from './schema'

export type Product = typeof schema.product.$inferSelect
export type ProductInsert = typeof schema.product.$inferInsert

export type Color = typeof schema.color.$inferSelect
export type Size = typeof schema.size.$inferSelect
export type Category = typeof schema.category.$inferSelect

export type Variant = typeof schema.productVariations.$inferSelect
export type ProductVariantsInsert = Omit<Variant, 'id'> & {
  id?: number
}

export type VariantsJoined = Pick<Variant, 'id' | 'stock'> & {
  color: Color
  size: Size
}

export type ProductWithVariants = Product & {
  variants: VariantsJoined[]
}

export type ProductWithVariant = Product & {
  variant: VariantsJoined
}

export type VariantFields = {
  categories: Category[]
  size: Size[]
  colors: Color[]
}

export type Bag = typeof schema.bagItem.$inferSelect

export type BagItem = Omit<Bag, 'item_id' | 'bag_id'> & {
  product_variant: Omit<Variant, 'color_id' | 'size_id' | 'product_id'> & {
    product: Product
  } & VariantsJoined
}

export type OrderType = typeof schema.order.$inferSelect

export type ImageSelect = typeof schema.imagesTable.$inferSelect
export type ImageInsert = typeof schema.imagesTable.$inferInsert
export type ImageInsertNoProductId = Omit<ImageInsert, 'product_id'>

export type ShopInformation = typeof schema.shopInformation.$inferSelect
