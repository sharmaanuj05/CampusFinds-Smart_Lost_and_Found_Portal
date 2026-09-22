import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import RequireAuth from './components/ui/RequireAuth'
import ScrollToTop from './components/ui/ScrollToTop'
import AuthProvider from './context/AuthContext'
import BrowseItems from './pages/BrowseItems'
import ClaimVerification from './pages/ClaimVerification'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ItemDetails from './pages/ItemDetails'
import Login from './pages/Login'
import Matches from './pages/Matches'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import ReportItem from './pages/ReportItem'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items" element={<BrowseItems />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route
                path="/report"
                element={
                  <RequireAuth>
                    <ReportItem />
                  </RequireAuth>
                }
              />
              <Route
                path="/matches/:id"
                element={
                  <RequireAuth>
                    <Matches />
                  </RequireAuth>
                }
              />
              <Route
                path="/claim/:id"
                element={
                  <RequireAuth>
                    <ClaimVerification />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}