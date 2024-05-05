import { pgTableCreator, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => "heavenly_" + name)

export const product = createTable("product", {
	name: varchar("name", { length: 255 })
})