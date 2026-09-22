import { PackageSearch, RefreshCw, ScanSearch, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItemsByReporter } from '../api/itemsApi'
import { getMatches } from '../api/matchingApi'
import PageContainer from '../components/layout/PageContainer'
import ItemStatusBadge, { TypeBadge } from '../components/items/ItemStatusBadge'
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { cn, relativeTime } from '../lib/utils'

function overviewCards(counts) {
  return [
    { key: 'lost', label: 'Lost Reports', value: counts.lost, icon: PackageSearch },
    { key: 'found', label: 'Found Reports', value: counts.found, icon: PackageSearch },
    { key: 'matches', label: 'Possible Matches', value: counts.matches, icon: ScanSearch },
    { key: 'claims', label: 'Active Claims', value: counts.claims, icon: ShieldCheck },
  ]
}

export default function Dashboard() {
  const { user } = useAuth()
  const [state, setState] = useState({ data: null, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const items = await getItemsByReporter(user.email)
        const matchResults = await Promise.all(
          items.map((item) =>
            getMatches(item.id).catch(() => ({ queryItem: item, matches: [] })),
          ),
        )
        const possibleMatches = matchResults.flatMap((result, index) =>
          result.matches
            .filter((match) => match.score >= 50)
            .map((match) => ({
              ...match,
              queryItemId: items[index].id,
              queryItemName: items[index].name,
            })),
        )

        const data = {
          items,
          possibleMatches,
          counts: {
            lost: items.filter((item) => item.type === 'lost').length,
            found: items.filter((item) => item.type === 'found').length,
            matches: possibleMatches.length,
            claims: items.filter((item) => item.status === 'claim_pending').length,
          },
        }
        if (active) setState({ data, error: null })
      } catch (err) {
        if (active) {
          setState({ data: null, error: err.message || 'Failed to load your dashboard.' })
        }
      }
    }

    load()
    return () => {
      active = false
    }
  }, [user.email, reloadKey])

  const loading = !state.data && !state.error

  if (loading) {
    return <LoadingState label="Loading your dashboard…" />
  }

  if (state.error) {
    return (
      <PageContainer className="py-16">
        <ErrorState
          message={state.error}
          onRetry={() => {
            setState({ data: null, error: null })
            setReloadKey((value) => value + 1)
          }}
        />
      </PageContainer>
    )
  }

  const { items, possibleMatches, counts } = state.data
  const activity = [...items].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )

  return (
    <PageContainer className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            An overview of your campus reports.
          </p>
        </div>
        <Button to="/report" size="md">
          Report New Item
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards(counts).map((card) => (
          <div
            key={card.key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <card.icon className="size-5 text-indigo-500" aria-hidden="true" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="my-reports-title">
          <h2 id="my-reports-title" className="text-lg font-semibold text-gray-900">
            My Reports
          </h2>
          {items.length === 0 ? (
            <EmptyState
              className="mt-4"
              icon={<PackageSearch className="size-10" aria-hidden="true" />}
              title="No reports yet"
              body="Report a lost or found item to get started."
              action={
                <Button to="/report" variant="secondary" size="sm">
                  Report an item
                </Button>
              }
            />
          ) : (
            <ul className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white shadow-sm">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/items/${item.id}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900">{item.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <TypeBadge type={item.type} />
                        <ItemStatusBadge status={item.status} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="my-matches-title">
          <h2 id="my-matches-title" className="text-lg font-semibold text-gray-900">
            Possible Matches
          </h2>
          {possibleMatches.length === 0 ? (
            <EmptyState
              className="mt-4"
              icon={<ScanSearch className="size-10" aria-hidden="true" />}
              title="No possible matches yet"
              body="New reports may match one of yours later."
            />
          ) : (
            <ul className="mt-4 space-y-3">
              {possibleMatches.map((match) => (
                <li
                  key={`${match.queryItemId}-${match.candidate.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {match.candidate.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      matched your {match.queryItemName}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="rounded-lg border border-gray-200 px-2 py-1 text-sm font-bold text-gray-900">
                      {match.score}
                    </span>
                    <Link
                      to={`/matches/${match.queryItemId}`}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Review Match
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="activity-title" className="mt-10">
        <h2 id="activity-title" className="text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No activity yet. Your report submissions will appear here.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {activity.slice(0, 5).map((item) => (
              <li
                key={item.id}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-4 py-2.5 text-sm',
                )}
              >
                <span className="flex items-center gap-2 text-gray-700">
                  <RefreshCw className="size-4 text-gray-400" aria-hidden="true" />
                  {item.type === 'lost' ? 'Reported lost' : 'Reported found'}:{' '}
                  <Link
                    to={`/items/${item.id}`}
                    className="font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {item.name}
                  </Link>
                </span>
                <span className="shrink-0 text-xs text-gray-400">
                  {relativeTime(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageContainer>
  )
}