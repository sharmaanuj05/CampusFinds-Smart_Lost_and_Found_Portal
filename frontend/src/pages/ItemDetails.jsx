import { CalendarDays, Clock, MapPin, PencilLine, SearchCheck, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItem } from '../api/itemsApi'
import PageContainer from '../components/layout/PageContainer'
import ItemStatusBadge, { TypeBadge } from '../components/items/ItemStatusBadge'
import CategoryPlaceholder from '../components/ui/CategoryPlaceholder'
import { ErrorState, LoadingState } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { formatDate, formatTime } from '../lib/utils'
import { Link } from 'react-router-dom'

export default function ItemDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [state, setState] = useState({ forId: null, item: null, error: null })

  useEffect(() => {
    let active = true
    getItem(id)
      .then((item) => {
        if (active) setState({ forId: id, item, error: null })
      })
      .catch((err) => {
        if (active) setState({ forId: id, item: null, error: err.message })
      })
    return () => {
      active = false
    }
  }, [id])

  const loading = state.forId !== id
  const item = loading ? null : state.item
  const error = loading ? null : state.error

  if (loading) {
    return <LoadingState label="Loading report…" />
  }

  if (error || !item) {
    return (
      <PageContainer className="py-16">
        <ErrorState
          title="Report not found"
          message={error || 'This report does not exist or was removed.'}
        />
      </PageContainer>
    )
  }

  const isOwner = user?.email?.toLowerCase() === item.reportedBy.toLowerCase()

  return (
    <PageContainer className="py-10">
      <p className="mb-4 text-sm text-gray-500">
        <Link to="/items" className="font-medium text-indigo-600 hover:text-indigo-700">
          ← Back to browse
        </Link>
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <CategoryPlaceholder category={item.category} name={item.name} />
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={item.type} />
            <ItemStatusBadge status={item.status} />
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {item.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>

          <p className="mt-5 leading-relaxed text-gray-700">{item.description}</p>

          <dl className="mt-6 space-y-3 rounded-xl border border-gray-200 bg-white p-5 text-sm">
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 text-gray-400" aria-hidden="true" />
              <dt className="w-28 shrink-0 text-gray-500">Location</dt>
              <dd className="font-medium text-gray-900">{item.location}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarDays className="size-4 text-gray-400" aria-hidden="true" />
              <dt className="w-28 shrink-0 text-gray-500">Date</dt>
              <dd className="font-medium text-gray-900">{formatDate(item.date)}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 text-gray-400" aria-hidden="true" />
              <dt className="w-28 shrink-0 text-gray-500">Time</dt>
              <dd className="font-medium text-gray-900">{formatTime(item.time)}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={`/matches/${item.id}`} size="lg">
              <SearchCheck className="size-4" aria-hidden="true" />
              Find Possible Matches
            </Button>
            {item.type === 'found' && (
              <Button to={`/claim/${item.id}`} size="lg" variant="secondary">
                <ShieldCheck className="size-4" aria-hidden="true" />
                I think this is mine
              </Button>
            )}
            {isOwner && (
              <Button to={`/report?edit=${item.id}`} size="lg" variant="ghost">
                <PencilLine className="size-4" aria-hidden="true" />
                Edit Report
              </Button>
            )}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-gray-500">
            Match scores are AI-assisted ranking suggestions. Ownership is always
            confirmed by the campus safety team before an item is returned.
          </p>
        </div>
      </div>
    </PageContainer>
  )
}