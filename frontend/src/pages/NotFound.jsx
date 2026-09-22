import { FileQuestion } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageContainer className="py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <FileQuestion className="size-12 text-gray-300" aria-hidden="true" />
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="max-w-md text-gray-600">
          This page seems to have been lost on campus. Let's get you back to the
          right place.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button to="/">Go Home</Button>
          <Button to="/items" variant="secondary">
            Browse Reports
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}