import { sql } from 'drizzle-orm'
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
  }).notNull(),
})

export const color = createTable('color', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 })
})

export const size = createTable('size', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 })
})

export const category = createTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 })
})

export const product_type = createTable('product_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 })
})

export const productVariations = createTable('product_variations', {
  id: serial('id').primaryKey(),
  product_id: varchar('product_id').references(() => product.id),
  color_id: serial('color_id').references(() => color.id),
  size_id: serial('size_id').references(() => size.id),
  product_type_Id: serial('product_type_id').references(() => product_type.id),
  category_id: serial('category_id').references(() => category.id),
  stock: integer('stock')
})

export const bagItem = createTable('bag_item', {
  id: serial('id').primaryKey(),
  item_id: serial('item_id')
    .references(() => productVariations.id),
  quantity: integer('quantity'),
  createdAt: date('createdAt').defaultNow(),
  expiresAt: date('expiresAt').default(sql`current_timestamp + interval '24 hours'`),
})