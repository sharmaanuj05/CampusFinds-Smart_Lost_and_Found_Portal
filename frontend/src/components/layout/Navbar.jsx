import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { cn, initials } from '../../lib/utils'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/items', label: 'Browse', end: false },
  { to: '/report', label: 'Report Item', end: false },
  { to: '/dashboard', label: 'Dashboard', end: false },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  function renderAuthActions() {
    if (isAuthenticated) {
      return (
        <div className="relative hidden sm:block" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
              {initials(user?.name)}
            </span>
            <span className="max-w-[9rem] truncate">{user?.name}</span>
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg"
            >
              <div className="border-b border-gray-100 px-4 py-2.5">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link
                to="/dashboard"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Report an item
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          to="/login"
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Register
        </Link>
      </div>
    )
  }

  function renderMobileAuthActions() {
    if (isAuthenticated) {
      return (
        <div className="space-y-2 border-t border-gray-100 pt-4">
          <Link
            to="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false)
              logout()
            }}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )
    }

    return (
      <div className="grid gap-2 border-t border-gray-100 pt-4 sm:hidden">
        <Link
          to="/login"
          className="rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
          onClick={() => setMobileOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white"
          onClick={() => setMobileOpen(false)}
        >
          Register
        </Link>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            C
          </span>
          CampusFinds
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn('block rounded-md px-3 py-2 text-sm font-medium transition-colors', isActive ? 'text-indigo-700' : 'text-gray-600 hover:text-gray-900')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/items"
            className="hidden size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 sm:flex md:hidden"
            aria-label="Browse items"
          >
            <Search className="size-5" />
          </Link>
          {renderAuthActions()}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2 text-base font-medium',
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50',
                      )
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {renderMobileAuthActions()}
        </div>
      )}
    </header>
  )
}