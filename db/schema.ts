import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core'

const createTable = pgTableCreator(name => 'heavenly_' + name)

export const departmentEnum = pgEnum('department', ['men', 'women'])
export const statusEnum = pgEnum('status', ['active', 'archived'])

export const product = createTable('product', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 50 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  discount: boolean('discount').default(false),
  percentage_off: integer('percentage_off'),
  image: text('image').notNull(),
  department: departmentEnum('department').notNull(),
  status: statusEnum('status').notNull(),
  created_at: varchar('created_at', { length: 27 }).notNull(),
  featured: boolean('featured').notNull().default(false)
})

export type Product = typeof product.$inferSelect

export const productRelations = relations(product, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const color = createTable('color', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).unique().notNull()
})

export const colorRelations = relations(color, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const size = createTable('size', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 }).unique().notNull()
})

export const sizeRelations = relations(size, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const category = createTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 40 }).unique().notNull()
})

export const categoryRelations = relations(category, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const product_type = createTable('product_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 40 }).unique().notNull()
})

export type Color = typeof color.$inferSelect
export type Size = typeof size.$inferSelect
export type Category = typeof category.$inferSelect
export type ProductType = typeof product_type.$inferSelect

export type AllFiltersType = {
  categories: Category[]
  colors: Color[]
  sizes: Size[]
  productTypes?: ProductType[]
}

export const producty_type_relations = relations(product_type, ({ many }) => ({
  productVariations: many(productVariations)
}))

export const productVariations = createTable('product_variations', {
  id: serial('id').primaryKey(),
  product_id: varchar('product_id').notNull(),
  color_id: serial('color_id').notNull(),
  size_id: serial('size_id').notNull(),
  product_type_Id: serial('product_type_id'),
  category_id: serial('category_id').notNull(),
  stock: integer('stock').notNull()
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

export type ProductVariants = typeof productVariations.$inferSelect
export type ProductVariantWithJoins = Pick<ProductVariants, 'id' | 'stock'> & {
  product?: Product | null
  color?: Color | null
  category?: Category | null
  size?: Size | null
  product_type?: ProductType | null
}

export const bagItem = createTable('bag_item', {
  id: serial('id').primaryKey(),
  item_id: serial('item_id').unique(),
  quantity: integer('quantity'),
  created_at: timestamp('created_at').defaultNow(),
  expires_at: timestamp('expires_at').default(
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
export type BagItem = Bag & {
  product_variant: ProductVariantWithJoins
}

export const order = createTable(
  'order',
  {
    id: serial('id'),
    order_created_at: varchar('order_created_at', { length: 27 }).notNull(),
    customer_name: varchar('customer_name', { length: 255 }).notNull(),
    customer_email: varchar('customer_email', { length: 255 }).notNull(),
    order_status: varchar('order_status', { length: 50 }).notNull(),
    payment_method: varchar('payment_method', { length: 255 }).notNull(),
    total_amount: integer('total_amount').notNull()
  },
  table => ({
    userIdx: index('userIdx').on(table.customer_name),
    emailIdx: index('emailIdx').on(table.customer_email)
  })
)

export type OrderType = typeof order.$inferSelect
