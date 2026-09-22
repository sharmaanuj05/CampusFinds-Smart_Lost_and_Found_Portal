import { Link } from 'react-router-dom'
import PageContainer from './PageContainer'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <PageContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">CampusFinds</p>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-gray-500">
            AI-assisted ranking suggests possible matches. Final ownership
            is always verified by a person.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
            <li>
              <Link to="/items" className="hover:text-gray-900">
                Browse
              </Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-gray-900">
                Report Item
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-900">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </PageContainer>
    </footer>
  )
}