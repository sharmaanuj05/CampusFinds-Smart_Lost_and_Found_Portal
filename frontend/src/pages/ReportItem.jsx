import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { createItem, getItem, updateItem } from '../api/itemsApi'
import ItemForm from '../components/forms/ItemForm'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import { ErrorState, LoadingState } from '../components/ui/States'
import { useAuth } from '../hooks/useAuth'

export default function ReportItem() {
  const { user } = useAuth()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const isEditing = Boolean(editId)
  const [formState, setFormState] = useState(() =>
    editId ? null : { type: location.state?.type || '' },
  )
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!editId) return undefined

    let active = true
    getItem(editId)
      .then((data) => {
        if (active) {
          setFormState(data)
          setLoadError('')
        }
      })
      .catch((err) => {
        if (active) setLoadError(err.message)
      })
    return () => {
      active = false
    }
  }, [editId])

  const loading = isEditing && !formState && !loadError

  async function handleSubmit(payload) {
    setSubmitting(true)
    setSubmitError('')
    try {
      if (isEditing) {
        const updated = await updateItem(editId, {
          ...payload,
          reportedBy: user.email,
        })
        setSuccess({ mode: 'updated', item: updated })
      } else {
        const created = await createItem({
          ...payload,
          reportedBy: user.email,
        })
        setSuccess({ mode: 'created', item: created })
      }
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while submitting.')
    } finally {
      setSubmitting(false)
    }
  }

  function renderSuccess() {
    const { item } = success
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-14 text-center">
        <CheckCircle2 className="size-10 text-emerald-600" aria-hidden="true" />
        <h2 className="text-xl font-bold text-emerald-900">
          {success.mode === 'created'
            ? 'Your report has been submitted'
            : 'Your report has been updated'}
        </h2>
        <p className="max-w-md text-sm text-emerald-800">
          CampusFinds is now comparing your {item.type === 'lost' ? 'lost' : 'found'}{' '}
          report against other campus reports to surface possible matches.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button to={`/matches/${item.id}`} size="md">
            See Possible Matches
          </Button>
          <Button to={`/items/${item.id}`} size="md" variant="secondary">
            View Report
          </Button>
          <Button to="/dashboard" size="md" variant="ghost">
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageContainer className="py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Report' : 'Report an Item'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEditing
            ? 'Update the details of your report.'
            : 'A few details help CampusFinds surface possible matches.'}
        </p>

        <div className="mt-8">
          {success ? (
            renderSuccess()
          ) : loading ? (
            <LoadingState label="Loading report…" />
          ) : loadError ? (
            <ErrorState message={loadError} />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              {submitError && (
                <p
                  className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
              <ItemForm
                key={editId || 'new'}
                initialValues={formState}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}