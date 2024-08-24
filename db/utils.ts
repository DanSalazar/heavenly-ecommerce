import { category, color, product, size } from '@/db/schema'
import { SQL, asc, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { PgColumn } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const departmentSchema = z.enum(['men', 'women'])
export const filtersSchema = z.record(z.string(), z.string())

export const addMultipleConditions = (column: PgColumn, string: string) => {
  const sqlConditions: SQL[] = []

  for (const condition of string.split(',')) {
    sqlConditions.push(eq(column, condition))
  }

  const sqlQuery = or(...sqlConditions)

  return sqlQuery || sql.empty()
}

export const ordersByMap: { [k: string]: SQL<unknown> } = {
  'low to high': asc(product.price),
  'high to low': desc(product.price)
}

export const makeFiltersBySearchParams = (
  filters: z.infer<typeof filtersSchema>
) => {
  const conditions: SQL[] = []

  if (filters.category) {
    if (filters.category.includes(',')) {
      const multipleConditions = addMultipleConditions(
        category.name,
        filters.category
      )
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(category.name, filters.category))
    }
  }

  if (filters.color) {
    if (filters.color.includes(',')) {
      const multipleConditions = addMultipleConditions(
        color.name,
        filters.color
      )
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(color.name, filters.color))
    }
  }

  if (filters.size) {
    if (filters.size.includes(',')) {
      const multipleConditions = addMultipleConditions(size.name, filters.size)
      conditions.push(multipleConditions)
    } else {
      conditions.push(eq(size.name, filters.size))
    }
  }

  if (filters.department) {
    const parsedDepartment = departmentSchema.parse(filters.department)
    conditions.push(eq(product.department, parsedDepartment))
  }

  if (filters.q) {
    const sql = ilike(product.name, filters.q + '%')
    conditions.push(sql)
  }

  if (filters.status) {
    const enumSchema = z.enum(['active', 'archived'])
    const status = enumSchema.safeParse(filters.status)

    if (status.success) {
      conditions.push(eq(product.status, status.data))
    }
  }

  if (filters.featured) {
    if (filters.featured === 'featured')
      conditions.push(eq(product.featured, true))
  }

  return conditions
}
