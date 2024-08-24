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
  unique,
  varchar
} from 'drizzle-orm/pg-core'

const createTable = pgTableCreator(name => 'heavenly_' + name)

export const departmentEnum = pgEnum('department', ['men', 'women'])
export const statusEnum = pgEnum('status', ['active', 'archived'])

export const product = createTable(
  'product',
  {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    brand: varchar('brand', { length: 50 }).notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    discount: boolean('discount').default(false),
    percentage_off: integer('percentage_off'),
    thumbnail: text('image').notNull(),
    department: departmentEnum('department').notNull(),
    status: statusEnum('status').notNull(),
    created_at: varchar('created_at', { length: 27 }).notNull(),
    featured: boolean('featured').notNull().default(false),
    category_id: serial('category_id').references(() => category.id)
  },
  table => ({
    categoryIdx: index('category_idx').on(table.category_id)
  })
)

export type Product = typeof product.$inferSelect
export type ProductInsert = typeof product.$inferInsert

export const productRelations = relations(product, ({ many, one }) => ({
  productVariations: many(productVariations),
  images: many(imagesTable),
  category: one(category, {
    fields: [product.category_id],
    references: [category.id]
  })
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
  product: many(product)
}))

export type Color = typeof color.$inferSelect
export type Size = typeof size.$inferSelect
export type Category = typeof category.$inferSelect

export const productVariations = createTable(
  'product_variations',
  {
    id: serial('id').primaryKey(),
    product_id: varchar('product_id')
      .notNull()
      .references(() => product.id),
    color_id: serial('color_id')
      .notNull()
      .references(() => color.id, { onDelete: 'cascade' }),
    size_id: serial('size_id')
      .notNull()
      .references(() => size.id, { onDelete: 'cascade' }),
    stock: integer('stock').notNull()
  },
  table => {
    return {
      productIdIdx: index('product_id_idx').on(table.product_id),
      colorSizeIdx: index('color_size_idx').on(table.color_id, table.size_id)
    }
  }
)

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
    size: one(size, {
      fields: [productVariations.size_id],
      references: [size.id]
    })
  })
)

export type ProductVariants = typeof productVariations.$inferSelect
export type ProductVariantsInsert = typeof productVariations.$inferInsert
export type ProductVariantWithJoins = Pick<ProductVariants, 'id' | 'stock'> & {
  product?: Product | null
  color?: Color | null
  size?: Size | null
}

export type ProductWithVariants = Product & {
  productVariations?: ProductVariantWithJoins[]
}

export const bag = createTable('bag', {
  id: varchar('id', { length: 37 }).primaryKey(),
  expires_at: timestamp('expires_at').default(
    sql`current_timestamp + interval '24 hours'`
  )
})

export const bagRelations = relations(bag, ({ many }) => ({
  bagItem: many(bagItem)
}))

export const bagItem = createTable(
  'bag_item',
  {
    id: serial('id').primaryKey(),
    bag_id: varchar('bag_id', { length: 37 })
      .references(() => bag.id)
      .notNull(),
    item_id: serial('item_id')
      .references(() => productVariations.id, { onDelete: 'cascade' })
      .notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    quantity: integer('quantity').notNull()
  },
  table => ({
    unq: unique().on(table.bag_id, table.item_id)
  })
)

export const bagItemRelations = relations(bagItem, ({ one }) => ({
  product_variant: one(productVariations, {
    fields: [bagItem.item_id],
    references: [productVariations.id]
  }),
  bag: one(bag, {
    fields: [bagItem.bag_id],
    references: [bag.id]
  })
}))

export type Bag = typeof bagItem.$inferSelect
export type BagItem = Bag & {
  product_variant: ProductVariantWithJoins
}

export const order = createTable(
  'order',
  {
    id: serial('id').primaryKey(),
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

export const imagesTable = createTable('images', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  url: varchar('image_url', { length: 255 }).notNull(),
  product_id: varchar('product_id', { length: 36 })
    .notNull()
    .references(() => product.id)
})

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  product: one(product, {
    fields: [imagesTable.product_id],
    references: [product.id]
  })
}))

export type ImageSelect = typeof imagesTable.$inferSelect
export type ImageInsert = typeof imagesTable.$inferInsert

export const shopInformation = createTable('shop_information', {
  id: serial('id').primaryKey(),
  facebook: varchar('facebook', { length: 255 }),
  x: varchar('x', { length: 255 }),
  instagram: varchar('instagram', { length: 255 })
})

export type ShopInformation = typeof shopInformation.$inferSelect
export type ShopInformationInsert = typeof shopInformation.$inferInsert
