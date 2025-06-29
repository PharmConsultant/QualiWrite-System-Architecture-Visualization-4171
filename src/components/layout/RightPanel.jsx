import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

const { FiX, FiBell, FiActivity, FiAlertTriangle, FiCheckCircle, FiClock, FiTrendingUp, FiUsers, FiCalendar, FiChevronLeft, FiChevronRight } = FiIcons

const RightPanel = ({ isOpen, onToggle, onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications')
  const { isDarkMode } = useTheme()

  const tabs = [
    { id: 'notifications', icon: FiBell, label: 'Alerts' },
    { id: 'activity', icon: FiActivity, label: 'Activity' },
    { id: 'analytics', icon: FiTrendingUp, label: 'Insights' }
  ]

  const notifications = [
    {
      id: 1,
      type: 'critical',
      icon: FiAlertTriangle,
      title: '3 Critical Deviations',
      message: 'Require immediate attention - FDA escalation threshold reached',
      time: '2 min ago',
      color: 'red'
    },
    {
      id: 2,
      type: 'warning',
      icon: FiClock,
      title: 'CAPA Effectiveness Due',
      message: '5 effectiveness checks due this week per SISPQ requirements',
      time: '1 hour ago',
      color: 'amber'
    },
    {
      id: 3,
      type: 'success',
      icon: FiCheckCircle,
      title: 'Investigation Completed',
      message: 'DEV-2024-003 closed with verified root cause',
      time: '3 hours ago',
      color: 'green'
    },
    {
      id: 4,
      type: 'info',
      icon: FiUsers,
      title: 'New Team Member',
      message: 'Sarah Johnson added to CAPA review team',
      time: '1 day ago',
      color: 'blue'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Created deviation',
      details: 'DEV-2024-005 for Batch-2024-A52',
      user: 'John Smith',
      time: '10 min ago',
      icon: FiAlertTriangle,
      color: 'red'
    },
    {
      id: 2,
      action: 'Updated CAPA',
      details: 'CAPA-2024-003 moved to effectiveness check',
      user: 'Sarah Johnson',
      time: '25 min ago',
      icon: FiCheckCircle,
      color: 'green'
    },
    {
      id: 3,
      action: 'Generated report',
      details: 'FDA Deviation Summary for Q4 2024',
      user: 'Mike Chen',
      time: '1 hour ago',
      icon: FiActivity,
      color: 'blue'
    },
    {
      id: 4,
      action: 'Completed RCA',
      details: 'Root cause analysis for equipment failure',
      user: 'Lisa Rodriguez',
      time: '2 hours ago',
      icon: FiTrendingUp,
      color: 'purple'
    }
  ]

  const insights = [
    {
      id: 1,
      title: 'Quality Score Trending Up',
      value: '+12%',
      description: 'Continuous improvement metrics show positive trend',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      id: 2,
      title: 'Investigation Cycle Time',
      value: '3.2 days',
      description: 'Average time reduced by 40% this quarter',
      icon: FiClock,
      color: 'blue'
    },
    {
      id: 3,
      title: 'CAPA Closure Rate',
      value: '87%',
      description: 'On track to meet 95% target by Q1',
      icon: FiCheckCircle,
      color: 'amber'
    },
    {
      id: 4,
      title: 'Recurring Patterns',
      value: '3 identified',
      description: 'Equipment-related deviations require system CAPA',
      icon: FiAlertTriangle,
      color: 'red'
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border bg-${notification.color}-50 dark:bg-${notification.color}-900/20 border-${notification.color}-200 dark:border-${notification.color}-800`}
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon
                    icon={notification.icon}
                    className={`text-${notification.color}-600 dark:text-${notification.color}-400 mt-0.5 flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-${notification.color}-800 dark:text-${notification.color}-200 text-sm`}>
                      {notification.title}
                    </p>
                    <p className={`text-${notification.color}-600 dark:text-${notification.color}-300 text-xs mt-1 leading-relaxed`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'activity':
        return (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 bg-${activity.color}-100 dark:bg-${activity.color}-900/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <SafeIcon icon={activity.icon} className={`text-${activity.color}-600 dark:text-${activity.color}-400 text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{activity.action}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">{activity.details}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.user}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-4">
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 bg-${insight.color}-100 dark:bg-${insight.color}-900/20 rounded-xl flex items-center justify-center`}>
                    <SafeIcon icon={insight.icon} className={`text-${insight.color}-600 dark:text-${insight.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{insight.title}</p>
                    <p className={`text-2xl font-bold text-${insight.color}-600 dark:text-${insight.color}-400`}>{insight.value}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Control Center</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="text-slate-400 dark:text-slate-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mt-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="text-xs" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default RightPanel