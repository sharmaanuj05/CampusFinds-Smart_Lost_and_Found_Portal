import { AlertTriangle, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import Button from './Button'

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Loader2 className="size-8 animate-spin text-indigo-600" aria-hidden="true" />
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <AlertTriangle className="size-7 text-red-600" aria-hidden="true" />
      <p className="font-medium text-red-800">{title}</p>
      <p className="max-w-sm text-sm text-red-700">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

export function EmptyState({ icon, title, body, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center',
        className,
      )}
    >
      {icon && <div className="text-gray-400">{icon}</div>}
      <p className="font-medium text-gray-900">{title}</p>
      {body && <p className="max-w-sm text-sm text-gray-500">{body}</p>}
      {action}
    </div>
  )
}

export function SuccessState({ title, body, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-14 text-center">
      <p className="font-medium text-emerald-900">{title}</p>
      {body && <p className="max-w-md text-sm text-emerald-800">{body}</p>}
      {action}
    </div>
  )
}