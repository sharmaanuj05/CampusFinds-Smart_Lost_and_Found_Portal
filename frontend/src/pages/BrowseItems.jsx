import PageContainer from '../components/layout/PageContainer'
import ItemFilters from '../components/items/ItemFilters'
import ItemGrid from '../components/items/ItemGrid'
import { ErrorState, LoadingState } from '../components/ui/States'
import { useItems } from '../hooks/useItems'

export default function BrowseItems() {
  const { items, loading, error, filters, setFilters } = useItems()

  return (
    <PageContainer className="py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse campus reports</h1>
        <p className="mt-1 text-sm text-gray-600">
          Search lost and found reports across the campus.
        </p>
      </div>

      <ItemFilters value={filters} onChange={setFilters} />

      <div className="mt-8">
        {loading ? (
          <LoadingState label="Loading reports…" />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => setFilters({ ...filters })}
          />
        ) : (
          <ItemGrid items={items} />
        )}
      </div>
    </PageContainer>
  )
}