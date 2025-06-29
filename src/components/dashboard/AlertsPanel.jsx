import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiAlertCircle, FiClock, FiTarget } = FiIcons

const AlertsPanel = ({ deviations }) => {
  const criticalDeviations = deviations.filter(d => d.severity === 'critical' && d.days_open > 7)
  const overdueItems = deviations.filter(d => d.days_open > 10)

  const alerts = [
    {
      id: 1,
      type: 'critical',
      icon: FiAlertCircle,
      color: 'red',
      title: `${criticalDeviations.length} critical deviations`,
      description: '> 7 days open (FDA escalation required)',
      count: criticalDeviations.length
    },
    {
      id: 2,
      type: 'warning',
      icon: FiClock,
      color: 'amber',
      title: '5 CAPA effectiveness checks',
      description: 'Due this week per SISPQ requirements',
      count: 5
    },
    {
      id: 3,
      type: 'info',
      icon: FiTarget,
      color: 'blue',
      title: 'Quality Score trending up',
      description: '+12% improvement in continuous metrics',
      count: null
    }
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-800 mb-4">SLA Breach Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 bg-${alert.color}-50 rounded-lg border border-${alert.color}-200`}
          >
            <SafeIcon icon={alert.icon} className={`text-${alert.color}-500`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{alert.title}</p>
              <p className="text-xs text-slate-500">{alert.description}</p>
            </div>
            {alert.count !== null && (
              <div className={`bg-${alert.color}-100 text-${alert.color}-700 px-2 py-1 rounded-full text-xs font-medium`}>
                {alert.count}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AlertsPanel