import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import Navigation from './components/Navigation'
import LoginForm from './components/auth/LoginForm'
import Dashboard from './components/dashboard/Dashboard'
import DeviationList from './components/deviations/DeviationList'
import RCAWorkspace from './components/rca/RCAWorkspace'
import CapaBoard from './components/capa/CapaBoard'
import ReportsPage from './components/reports/ReportsPage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navigation user={user} onLogout={handleLogout} />
          <main className="pt-16 p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/deviations" element={<DeviationList />} />
                <Route path="/rca" element={<RCAWorkspace />} />
                <Route path="/capa" element={<CapaBoard />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App