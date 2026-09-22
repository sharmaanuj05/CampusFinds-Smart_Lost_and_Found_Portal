import { AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import { inputClass } from '../lib/fieldStyles'

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to log in.')
    }
  }

  function fillDemo() {
    setForm({ email: 'demo@campus.edu', password: 'demo1234' })
    setError('')
  }

  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  return (
    <PageContainer className="py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">
          Sign in to manage your reports and matches.
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
            <Field label="Email" htmlFor="email" required>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                value={form.email}
                onChange={(event) => update({ email: event.target.value })}
                placeholder="you@campus.edu"
                required
              />
            </Field>

            <Field label="Password" htmlFor="password" required>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={inputClass}
                value={form.password}
                onChange={(event) => update({ password: event.target.value })}
                placeholder="••••••••"
                required
              />
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <button
            type="button"
            onClick={fillDemo}
            className="mt-4 w-full rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            Use demo account (demo@campus.edu)
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-600">
          New to CampusFinds?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}