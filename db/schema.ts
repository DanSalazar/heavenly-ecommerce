import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  integer,
  pgTableCreator,
  serial,
  text,
  varchar
} from 'drizzle-orm/pg-core'

const createTable = pgTableCreator(name => 'heavenly_' + name)

export const product = createTable('product', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 50 }),
  description: text('description'),
  price: integer('price').notNull(),
  discount: boolean('discount').default(false),
  image: text('image'),
  percentage_off: integer('percentage_off'),
  department: varchar('department', {
    length: 20,
    enum: ['men', 'women']
  }).notNull()
})

export type Product = typeof product.$inferSelect

export const productRelations = relations(product, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const color = createTable('color', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 })
})

export const colorRelations = relations(color, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const size = createTable('size', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 })
})

export const sizeRelations = relations(size, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const category = createTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 })
})

export const categoryRelations = relations(category, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const product_type = createTable('product_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 })
})

type Color = typeof color.$inferSelect
type Size = typeof size.$inferInsert
type Category = typeof category.$inferInsert
type ProductType = typeof product_type.$inferInsert

export const producty_type_relations = relations(product_type, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const productVariations = createTable('product_variations', {
  id: serial('id').primaryKey(),
  product_id: varchar('product_id'),
  color_id: serial('color_id'),
  size_id: serial('size_id'),
  product_type_Id: serial('product_type_id'),
  category_id: serial('category_id'),
  stock: integer('stock')
})

export const productVariationsRelations = relations(
  productVariations,
  ({ one }) => ({
    product: one(product, {
      fields: [productVariations.product_id],
      references: [product.id]
    }),
    color: one(color, {
      fields: [productVariations.color_id],
      references: [color.id]
    }),
    category: one(category, {
      fields: [productVariations.category_id],
      references: [category.id]
    }),
    size: one(size, {
      fields: [productVariations.size_id],
      references: [size.id]
    }),
    product_type: one(product_type, {
      fields: [productVariations.product_type_Id],
      references: [product_type.id]
    })
  })
)

export type ProductVariantWithJoins = {
  id: number
  product: Product | null
  color: Color
  category: Category
  size: Size
}

export const bagItem = createTable('bag_item', {
  id: serial('id').primaryKey(),
  item_id: serial('item_id').unique(),
  quantity: integer('quantity'),
  createdAt: date('createdAt').defaultNow(),
  expiresAt: date('expiresAt').default(
    sql`current_timestamp + interval '24 hours'`
  )
})

export const bagItemRelations = relations(bagItem, ({ one }) => ({
  product_variant: one(productVariations, {
    fields: [bagItem.item_id],
    references: [productVariations.id]
  })
}))

export type Bag = typeof bagItem.$inferSelect
export type BagWithProduct = Bag & {
  product_variant: {
    id: number,
    product: Product | null
  }
}