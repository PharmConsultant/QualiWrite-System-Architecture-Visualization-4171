import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'
import MetricsCards from './MetricsCards'
import DeviationChart from './DeviationChart'
import AlertsPanel from './AlertsPanel'
import RecentActivity from './RecentActivity'

const { FiBell, FiUser } = FiIcons

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Performance Dashboard</h1>
          <p className="text-slate-600">Life-science KPI tracking with drill-down capabilities</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Quality Score: {metrics?.quality_score}/10
          </div>
          <SafeIcon icon={FiBell} className="text-slate-400 text-xl cursor-pointer hover:text-slate-600" />
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiUser} className="text-slate-400 text-xl" />
            <span className="text-sm text-slate-600">{user?.full_name}</span>
          </div>
        </div>
      </div>

      <MetricsCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviationChart deviations={deviations} />
        <AlertsPanel deviations={deviations} />
      </div>

      <RecentActivity deviations={deviations} />
    </div>
  )
}

export default Dashboard