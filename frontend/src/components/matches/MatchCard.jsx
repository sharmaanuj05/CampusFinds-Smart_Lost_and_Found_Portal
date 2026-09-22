import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn, formatDate, matchLevel } from '../../lib/utils'
import CategoryPlaceholder from '../ui/CategoryPlaceholder'
import ItemStatusBadge, { TypeBadge } from '../items/ItemStatusBadge'
import MatchExplanation from './MatchExplanation'
import MatchScore from './MatchScore'

const levelLabel = { strong: 'High similarity', moderate: 'Moderate similarity', weak: 'Low similarity' }

const levelRing = {
  strong: 'border-emerald-200',
  moderate: 'border-amber-200',
  weak: 'border-gray-200 opacity-80',
}

export default function MatchCard({ match }) {
  const { candidate, score, signals, explanation } = match
  const level = matchLevel(score)

  return (
    <article
      className={cn(
        'flex flex-col gap-5 rounded-xl border bg-white p-5 shadow-sm sm:flex-row',
        levelRing[level],
      )}
    >
      <div className="sm:w-44 sm:shrink-0">
        <Link
          to={`/items/${candidate.id}`}
          className="block aspect-square overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
          tabIndex={-1}
          aria-hidden="true"
        >
          {candidate.image ? (
            <img
              src={candidate.image}
              alt={candidate.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <CategoryPlaceholder category={candidate.category} name={candidate.name} />
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {levelLabel[level]}
            </p>
            <h3 className="mt-0.5 text-lg font-semibold text-gray-900">
              <Link to={`/items/${candidate.id}`} className="hover:text-indigo-700">
                {candidate.name}
              </Link>
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <TypeBadge type={candidate.type} />
              <ItemStatusBadge status={candidate.status} />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 px-3 py-2 text-center sm:text-right">
            <p className="text-2xl font-bold text-gray-900">{score}</p>
            <p className="text-xs text-gray-500">Match Score</p>
          </div>
        </div>

        <div className="grid gap-2 text-xs text-gray-500 sm:grid-cols-2">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {candidate.location}
          </p>
          <p>{formatDate(candidate.date)}</p>
        </div>

        <MatchExplanation text={explanation} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <MatchScore score={score} signals={signals} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to={`/items/${candidate.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Details
            </Link>
            {candidate.type === 'found' && (
              <Link
                to={`/claim/${candidate.id}`}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Verify Potential Match
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}