import { FileSearch } from 'lucide-react'
import ItemCard from './ItemCard'
import { EmptyState } from '../ui/States'
import Button from '../ui/Button'

export default function ItemGrid({ items, emptyAction }) {
  if (!items.length) {
    return (
      <EmptyState
        icon={<FileSearch className="size-10" aria-hidden="true" />}
        title="No reports match your filters"
        body="Try clearing filters or broaden your search to see more campus reports."
        action={
          emptyAction || (
            <Button to="/report" variant="secondary" size="sm">
              Report an item
            </Button>
          )
        }
      />
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}