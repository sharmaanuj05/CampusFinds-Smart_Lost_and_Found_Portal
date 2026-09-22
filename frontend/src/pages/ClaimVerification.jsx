import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createClaim } from '../api/claimsApi'
import { getItem } from '../api/itemsApi'
import ClaimForm from '../components/forms/ClaimForm'
import PageContainer from '../components/layout/PageContainer'
import ItemStatusBadge, { TypeBadge } from '../components/items/ItemStatusBadge'
import CategoryPlaceholder from '../components/ui/CategoryPlaceholder'
import { ErrorState, LoadingState } from '../components/ui/States'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { cn, formatDate } from '../lib/utils'

const steps = [
  { label: 'Possible Match', check: 'This report was surfaced by matching.' },
  { label: 'Verification', check: 'Provide private confirmation details.' },
  { label: 'Review', check: 'Review your answers before submitting.' },
  { label: 'Resolution', check: 'Campus safety team verifies in person.' },
]

export default function ClaimVerification() {
  const { id } = useParams()
  const { user } = useAuth()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [claim, setClaim] = useState(null)

  useEffect(() => {
    let active = true
    getItem(id)
      .then((data) => active && setItem(data))
      .catch((err) => active && setLoadError(err.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  async function handleSubmitClaim() {
    setSubmitting(true)
    setSubmitError('')
    try {
      const created = await createClaim({
        itemId: id,
        verification: answers,
        claimedBy: user.email,
      })
      setClaim(created)
      setStep(4)
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit your claim.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingState label="Loading claim details…" />
  }

  if (loadError || !item) {
    return (
      <PageContainer className="py-16">
        <ErrorState
          title="Item not found"
          message={loadError || 'This report does not exist or was removed.'}
        />
      </PageContainer>
    )
  }

  const answerRows = [
    { label: 'Distinctive mark or scratch', value: answers.distinctiveMark },
    { label: 'Serial number', value: answers.serialNumber },
    { label: 'What is inside', value: answers.contents },
    { label: 'Precise spot', value: answers.exactLocation },
    { label: 'Identifying detail', value: answers.identifyingDetail },
    { label: 'Approximate time', value: answers.approximateTime },
  ].filter((row) => String(row.value || '').trim())

  return (
    <PageContainer className="mx-auto max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Verify Ownership</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Matching helps identify possible candidates. To protect against false
          claims, you will provide details that are not publicly visible on the
          report.
        </p>
      </div>

      <ol className="mb-10 flex items-center justify-between gap-2" aria-label="Claim progress">
        {steps.map((stepItem, index) => {
          const currentStep = index + 1
          const done = currentStep < step
          return (
            <li key={stepItem.label} className="flex flex-1 flex-col items-center text-center">
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
                  done
                    ? 'bg-emerald-600 text-white'
                    : currentStep === step
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500',
                )}
              >
                {done ? <CheckCircle2 className="size-5" /> : currentStep}
              </span>
              <span
                className={cn(
                  'mt-2 hidden text-xs font-medium sm:block',
                  currentStep === step ? 'text-indigo-700' : 'text-gray-500',
                )}
              >
                {stepItem.label}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
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
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Step 1 · Possible match
                </p>
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <TypeBadge type={item.type} />
                  <ItemStatusBadge status={item.status} />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {item.category} · {item.location} · {formatDate(item.date)}
                </p>
              </div>
            </div>
            <p className="mt-5 rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
              This report surfaced as a possible match to one of your reports.
              A match score is a ranking signal — before this item can be
              returned, the campus safety team confirms ownership using
              verification details you provide next.
            </p>
            <div className="mt-6 flex justify-end">
              <Button size="lg" onClick={() => setStep(2)}>
                Continue to Verification
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-wide text-gray-400">
              Step 2 · Verification
            </p>
            <ClaimForm
              submitting={false}
              onSubmit={(values) => {
                setAnswers(values)
                setStep(3)
              }}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
              Step 3 · Review
            </p>
            <p className="mb-5 text-sm text-gray-700">
              Confirm your verification details for{' '}
              <strong className="font-medium text-gray-900">{item.name}</strong>.
            </p>
            {answerRows.length === 0 ? (
              <p className="text-sm text-red-600">No verification details were provided.</p>
            ) : (
              <dl className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                {answerRows.map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
                    <dt className="text-sm text-gray-500">{row.label}</dt>
                    <dd className="text-sm font-medium text-gray-900 sm:text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {submitError && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Edit answers
              </Button>
              <Button onClick={handleSubmitClaim} disabled={submitting || answerRows.length === 0}>
                {submitting ? 'Submitting…' : 'Submit for Review'}
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <ShieldCheck className="size-12 text-emerald-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900">
              Claim submitted for review
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              Your claim reference is{' '}
              <strong className="font-medium text-gray-900">{claim?.id}</strong>.
              The campus safety team will verify your details and get in touch
              with you. No item is returned automatically — a person always
              confirms ownership.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/dashboard">Go to Dashboard</Button>
              <Button to="/items" variant="secondary">
                Browse Reports
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}