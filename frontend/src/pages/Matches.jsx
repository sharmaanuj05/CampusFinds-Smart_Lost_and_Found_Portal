import { Info } from 'lucide-react'
import { useParams } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import ItemStatusBadge, { TypeBadge } from '../components/items/ItemStatusBadge'
import MatchList from '../components/matches/MatchList'
import CategoryPlaceholder from '../components/ui/CategoryPlaceholder'
import { ErrorState, LoadingState } from '../components/ui/States'
import { useMatches } from '../hooks/useMatches'
import { formatDate } from '../lib/utils'

export default function Matches() {
  const { id } = useParams()
  const { queryItem, matches, loading, error } = useMatches(id)

  return (
    <PageContainer className="py-10">
      <h1 className="text-2xl font-bold text-gray-900">Possible Matches</h1>

      <div className="mt-3 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <Info className="mt-0.5 size-5 shrink-0 text-sky-600" aria-hidden="true" />
        <p>
          CampusFinds uses visual and contextual similarity to{' '}
          <strong className="font-semibold">rank</strong> potentially related
          reports. These results are suggestions, not proof of ownership.
        </p>
      </div>

      {loading ? (
        <div className="mt-8">
          <LoadingState label="Loading possible matches…" />
        </div>
      ) : error ? (
        <div className="mt-8">
          <ErrorState message={error} />
        </div>
      ) : queryItem ? (
        <div className="mt-8">
          <section
            aria-label="Report you are matching"
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Matching against this report
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                {queryItem.image ? (
                  <img
                    src={queryItem.image}
                    alt={queryItem.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <CategoryPlaceholder
                    category={queryItem.category}
                    name={queryItem.name}
                  />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {queryItem.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <TypeBadge type={queryItem.type} />
                  <ItemStatusBadge status={queryItem.status} />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {queryItem.category} · {queryItem.location} · {formatDate(queryItem.date)}
                </p>
              </div>
            </div>
          </section>

          <section aria-label="Match results" className="mt-8">
            <MatchList matches={matches} />
          </section>
        </div>
      ) : null}
    </PageContainer>
  )
}