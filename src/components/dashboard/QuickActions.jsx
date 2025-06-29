import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiSearch, FiFileText, FiTarget, FiTrendingUp, FiAlertCircle } = FiIcons

const QuickActions = () => {
  const actions = [
    {
      id: 'new-deviation',
      title: 'New Deviation',
      description: 'Create FDA compliant deviation entry',
      icon: FiPlus,
      color: 'from-red-500 to-red-600',
      link: '/deviations',
      urgent: false
    },
    {
      id: 'rca-analysis',
      title: 'RCA Analysis',
      description: 'Start root cause investigation',
      icon: FiSearch,
      color: 'from-purple-500 to-purple-600',
      link: '/rca',
      urgent: false
    },
    {
      id: 'capa-review',
      title: 'CAPA Review',
      description: '5 actions pending effectiveness check',
      icon: FiTarget,
      color: 'from-amber-500 to-amber-600',
      link: '/capa',
      urgent: true
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Audit-ready documentation',
      icon: FiFileText,
      color: 'from-green-500 to-green-600',
      link: '/reports',
      urgent: false
    },
    {
      id: 'trend-analysis',
      title: 'Trend Analysis',
      description: 'Quality metrics dashboard',
      icon: FiTrendingUp,
      color: 'from-blue-500 to-blue-600',
      link: '/analytics',
      urgent: false
    },
    {
      id: 'critical-alerts',
      title: 'Critical Alerts',
      description: '3 deviations require escalation',
      icon: FiAlertCircle,
      color: 'from-red-600 to-red-700',
      link: '/deviations',
      urgent: true
    }
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
        <div className="text-sm text-slate-500">FDA 21 CFR Compliant</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.link}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl bg-gradient-to-br ${action.color} text-white cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                {/* Urgent indicator */}
                {action.urgent && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white" />
                )}

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <SafeIcon icon={action.icon} className="text-2xl text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1">{action.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{action.description}</p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* System Status */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-xs text-green-700">System Uptime</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.1s</div>
            <div className="text-xs text-blue-700">Avg Response</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-xs text-purple-700">Active Users</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">24/7</div>
            <div className="text-xs text-amber-700">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions