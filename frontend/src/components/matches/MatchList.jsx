import { ScanSearch } from 'lucide-react'
import { matchLevel } from '../../lib/utils'
import Button from '../ui/Button'
import { EmptyState } from '../ui/States'
import MatchCard from './MatchCard'

function groupMatches(matches) {
  const groups = { strong: [], moderate: [], weak: [] }
  matches.forEach((match) => {
    groups[matchLevel(match.score)].push(match)
  })
  return groups
}

export default function MatchList({ matches }) {
  const groups = groupMatches(matches)
  const hasAny = matches.length > 0
  const hasStrong = groups.strong.length > 0

  if (!hasAny) {
    return (
      <EmptyState
        icon={<ScanSearch className="size-10" aria-hidden="true" />}
        title="No strong possible matches yet"
        body="New reports may create a match later. Check back soon or browse all campus reports."
        action={
          <Button to="/items" variant="secondary" size="sm">
            View all reports
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-10">
      {hasStrong && (
        <section aria-label="Strong possible matches">
          <div className="space-y-4">
            {groups.strong.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {groups.moderate.length > 0 && (
        <section aria-label="Moderate possible matches">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Moderate candidates to check
          </h2>
          <div className="space-y-4">
            {groups.moderate.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {groups.weak.length > 0 && (
        <section aria-label="Other reports surfaced">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Other reports surfaced
          </h2>
          <div className="space-y-4">
            {groups.weak.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}