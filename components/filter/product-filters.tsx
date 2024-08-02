import { getFilters } from '@/server/actions'
import Filters from './filters'

export default async function ProductFilters() {
  const filters = await getFilters()

  return <Filters filters={filters} />
}
