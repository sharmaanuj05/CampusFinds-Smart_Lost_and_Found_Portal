import { Info } from 'lucide-react'

export default function MatchExplanation({ text }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <Info className="size-3.5" aria-hidden="true" />
        Why this appeared
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{text}</p>
    </div>
  )
}