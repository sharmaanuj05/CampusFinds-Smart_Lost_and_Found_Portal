import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { inputClass } from '../../lib/fieldStyles'

const questions = [
  { key: 'distinctiveMark', label: 'Distinctive mark or scratch', hint: 'A scratch, sticker, custom engraving…' },
  { key: 'serialNumber', label: 'Serial number (if any)', hint: 'Only you would know this.' },
  { key: 'contents', label: 'What is inside?', hint: 'Items stored in the bag, wallet or case…' },
  { key: 'exactLocation', label: 'Precise spot', hint: 'A detail the report cannot show publicly.' },
  { key: 'identifyingDetail', label: 'Identifying detail', hint: 'Something unique about the item.' },
]

export default function ClaimForm({ onSubmit, submitting }) {
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')

  const update = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    if (error) setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const filled = Object.values(answers).some((value) => String(value).trim())
    if (!filled) {
      setError('Provide at least one verification detail before continuing.')
      return
    }
    onSubmit(answers)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p>
          These answers are <strong>not shown publicly</strong>. They are only
          used to confirm that you know details a random person could not.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {questions.map((question) => (
          <Field key={question.key} label={question.label} hint={question.hint}>
            <input
              className={inputClass}
              value={answers[question.key] || ''}
              onChange={(event) => update(question.key, event.target.value)}
            />
          </Field>
        ))}
      </div>

      <Field
        label="Approximate time you lost / found it"
        htmlFor="claim-time"
      >
        <input
          id="claim-time"
          type="time"
          className={inputClass}
          value={answers.approximateTime || ''}
          onChange={(event) => update('approximateTime', event.target.value)}
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Submitting claim…' : 'Submit for Review'}
        </Button>
      </div>
    </form>
  )
}