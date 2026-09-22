import {
  ArrowRight,
  Eye,
  FileSearch,
  SearchCheck,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/items/ItemCard'
import { TypeBadge } from '../components/items/ItemStatusBadge'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import CategoryPlaceholder from '../components/ui/CategoryPlaceholder'
import { mockItems } from '../data/mockItems'

const steps = [
  {
    icon: SearchCheck,
    title: 'Report',
    body: 'Report what you lost or found with a photo, category and location.',
  },
  {
    icon: FileSearch,
    title: 'Get matches',
    body: 'CampusFinds ranks other reports by visual and contextual similarity.',
  },
  {
    icon: Eye,
    title: 'Verify & recover',
    body: 'Confirm ownership through private verification before an item is returned.',
  },
]

export default function Home() {
  const recentItems = mockItems.slice(0, 3)

  return (
    <div>
      <section className="border-b border-gray-200 bg-white">
        <PageContainer className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              AI-assisted campus lost &amp; found
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Lost something?
              <br />
              Find it faster.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Report lost or found items and let CampusFinds surface possible
              matches using image and contextual similarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/report" size="lg" state={{ type: 'lost' }}>
                Report Lost Item
              </Button>
              <Button to="/report" size="lg" variant="secondary" state={{ type: 'found' }}>
                Report Found Item
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Free for students · Matching is a suggestion, never a verdict.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Found report</p>
                <TypeBadge type="found" />
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <CategoryPlaceholder category="Bags" name="Black backpack" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Black Backpack</p>
                  <p className="text-xs text-gray-500">Library · Sep 18</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 right-4 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-md">
              <p className="text-2xl font-bold text-gray-900">87</p>
              <p className="text-xs font-medium text-gray-500">Match Score</p>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-16">
        <h2 className="text-center text-2xl font-bold text-gray-900">How CampusFinds works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <step.icon className="size-6 text-indigo-600" aria-hidden="true" />
                <span className="text-4xl font-bold text-gray-100">0{index + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
            </div>
          ))}
        </div>
      </PageContainer>

      <section className="bg-white">
        <PageContainer className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent reports</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fresh campus reports to browse.
              </p>
            </div>
            <Link
              to="/items"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Browse all reports
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <PageContainer className="grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              AI-assisted matching, explained
            </h2>
            <p className="mt-4 text-gray-600">
              When you report an item, CampusFinds compares its photo, category,
              location and date against other campus reports. It produces a{' '}
              <strong className="font-semibold text-gray-900">match score</strong>{' '}
              that ranks how similar two reports look — so you know which leads
              are worth checking.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <SearchCheck className="mt-0.5 size-5 shrink-0 text-indigo-600" aria-hidden="true" />
                Every score is explained with the signals behind it.
              </li>
              <li className="flex gap-3">
                <SearchCheck className="mt-0.5 size-5 shrink-0 text-indigo-600" aria-hidden="true" />
                A score is a ranking signal — not proof of ownership.
              </li>
              <li className="flex gap-3">
                <SearchCheck className="mt-0.5 size-5 shrink-0 text-indigo-600" aria-hidden="true" />
                Human review always makes the final call.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 overflow-hidden rounded-lg bg-white">
                  <CategoryPlaceholder category="Bags" name="Backpack" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Black Backpack</p>
                  <p className="text-xs text-gray-500">Found · Library</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">87</p>
                <p className="text-xs text-gray-500">Match Score</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Visual similarity', value: 92, color: 'bg-indigo-500' },
                { label: 'Category', value: 100, color: 'bg-emerald-500' },
                { label: 'Location relevance', value: 78, color: 'bg-amber-500' },
                { label: 'Date proximity', value: 81, color: 'bg-sky-500' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-medium text-gray-900">{row.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-gray-500">
              Why this appeared: similar appearance and category. The reports
              were also made near the same campus building.
            </p>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-16">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-indigo-600 px-6 py-12 text-center sm:px-12">
          <h2 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
            Found it? Report it now and help someone get it back.
          </h2>
          <p className="max-w-xl text-sm text-indigo-100">
            The sooner something is reported, the sooner a possible match can be
            surfaced.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              to="/report"
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50"
            >
              Report an Item
            </Button>
            <Button
              to="/items"
              size="lg"
              variant="secondary"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Browse Reports
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}