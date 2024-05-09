import { boolean, integer, pgTableCreator, text, varchar, } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator(name => 'heavenly_' + name)

export const product = createTable('product', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  brand: varchar('brand', { length: 50 }),
  description: text("description"),
  price: integer("price").notNull(),
  discount: boolean("discount").default(false),
  percentage_off: integer("percentage_off"),
  image: varchar("image", { length: 255 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  sizes: varchar("sizes", { length: 255 }).notNull(),
  department: varchar("department", { length: 20, enum: ['Men', 'Women'] }).notNull(),
  category: varchar("category", { length: 20 }).notNull()
})