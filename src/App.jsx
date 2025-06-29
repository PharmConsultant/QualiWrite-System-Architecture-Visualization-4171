import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ThemeProvider } from './hooks/useTheme.jsx'
import MainLayout from './components/layout/MainLayout'
import LoginForm from './components/auth/LoginForm'
import OnboardingFlow from './components/auth/OnboardingFlow'
import Dashboard from './components/dashboard/Dashboard'
import DeviationList from './components/deviations/DeviationList'
import InvestigationsList from './components/investigations/InvestigationsList'
import RCAWorkspace from './components/rca/RCAWorkspace'
import CapaBoard from './components/capa/CapaBoard'
import ReportsPage from './components/reports/ReportsPage'
import CalendarPage from './components/calendar/CalendarPage'
import FilesPage from './components/files/FilesPage'
import AnalyticsPage from './components/analytics/AnalyticsPage'
import DeviationAnalyticsPage from './components/analytics/DeviationAnalyticsPage'
import AICostTrackingPage from './components/analytics/AICostTrackingPage'
import VisionWall from './components/VisionWall'
import ProcessFlow from './components/ProcessFlow'
import TechnicalArchitecture from './components/TechnicalArchitecture'
import Wireframes from './components/Wireframes'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleLogin = (userData) => {
    // Check if user needs onboarding (first time login or hasn't completed onboarding)
    if (!userData.onboardingCompleted) {
      setShowOnboarding(true)
    }
    setUser(userData)
  }

  const handleOnboardingComplete = (updatedUser) => {
    setUser(updatedUser)
    setShowOnboarding(false)
  }

  const handleLogout = () => {
    setUser(null)
    setShowOnboarding(false)
  }

  // Show login if no user
  if (!user) {
    return (
      <ThemeProvider>
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  // Show onboarding if user hasn't completed it
  if (showOnboarding) {
    return (
      <ThemeProvider>
        <OnboardingFlow user={user} onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    )
  }

  // Show main application
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <MainLayout user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/deviations" element={<DeviationList />} />
              <Route path="/investigations" element={<InvestigationsList />} />
              <Route path="/rca" element={<RCAWorkspace />} />
              <Route path="/capa" element={<CapaBoard />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/deviation-analytics" element={<DeviationAnalyticsPage />} />
              <Route path="/ai-cost-tracking" element={<AICostTrackingPage />} />
              <Route path="/vision" element={<VisionWall />} />
              <Route path="/process-flow" element={<ProcessFlow />} />
              <Route path="/architecture" element={<TechnicalArchitecture />} />
              <Route path="/wireframes" element={<Wireframes />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App