export const PRODUCTS_PER_ROW = 5
export const PRODUCTS_PER_PAGE = 20
export const NOT_LISTED_FILTERS = ['page', 'q', 'price_from', 'price_to']
export const MAX_VISIBLE_PAGES_PAGINATION = 4

export const SCROLLBAR_CLASS =
  'scrollbar scrollbar-rounded scrollbar-thumb-primary/20 scrollbar-track-secondary'

export const LOCALES = ['en', 'es', 'de', 'ja'] as const
export type Locale = (typeof LOCALES)[number]
