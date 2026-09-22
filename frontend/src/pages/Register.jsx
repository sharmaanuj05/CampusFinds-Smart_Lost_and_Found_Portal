import { AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import { inputClass } from '../lib/fieldStyles'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your full name.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (form.password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }
    if (form.confirm !== form.password) {
      next.confirm = 'Passwords do not match.'
    }
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setError('')
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to create your account.')
    }
  }

  return (
    <PageContainer className="py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track your reports and discover possible matches.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {error && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field label="Full name" htmlFor="name" required error={errors.name}>
              <input
                id="name"
                className={inputClass}
                value={form.name}
                onChange={(event) => update({ name: event.target.value })}
                placeholder="e.g. Aisha Khan"
                autoComplete="name"
              />
            </Field>

            <Field label="Email" htmlFor="email" required error={errors.email}>
              <input
                id="email"
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(event) => update({ email: event.target.value })}
                placeholder="you@campus.edu"
                autoComplete="email"
              />
            </Field>

            <Field label="Password" htmlFor="password" required error={errors.password}>
              <input
                id="password"
                type="password"
                className={inputClass}
                value={form.password}
                onChange={(event) => update({ password: event.target.value })}
                autoComplete="new-password"
              />
            </Field>

            <Field label="Confirm password" htmlFor="confirm" required error={errors.confirm}>
              <input
                id="confirm"
                type="password"
                className={inputClass}
                value={form.confirm}
                onChange={(event) => update({ confirm: event.target.value })}
                autoComplete="new-password"
              />
            </Field>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}