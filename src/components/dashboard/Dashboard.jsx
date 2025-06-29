import React from 'react'
import { motion } from 'framer-motion'
import { useData } from '../../hooks/useData'
import MetricsCards from './MetricsCards'
import DeviationChart from './DeviationChart'
import AlertsPanel from './AlertsPanel'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import AdvancedAnalytics from './AdvancedAnalytics'
import AICostOverview from './AICostOverview'

const Dashboard = ({ user }) => {
  const { metrics, deviations, loading } = useData()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.full_name || 'Demo User'}
        </h1>
        <p className="text-blue-100">
          FDA 21 CFR 210/211 Compliant Quality Management Dashboard
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">System Status: Operational</span>
          </div>
          <div className="text-sm">
            Last Login: {new Date().toLocaleDateString()}
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <MetricsCards metrics={metrics} />

      {/* Advanced Analytics Section */}
      <AdvancedAnalytics deviations={deviations} />

      {/* AI Cost Overview */}
      <AICostOverview />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="xl:col-span-2 space-y-6">
          <DeviationChart deviations={deviations} />
          <RecentActivity deviations={deviations} />
        </div>

        {/* Right Column - Actions & Alerts */}
        <div className="space-y-6">
          <QuickActions />
          <AlertsPanel deviations={deviations} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard