import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiClock, FiCheckCircle, FiTarget, FiTrendingDown } = FiIcons

const MetricsCards = ({ metrics }) => {
  const cards = [
    {
      title: 'Avg. Time-to-Investigation',
      value: `${metrics?.avg_investigation_time || 0}`,
      unit: 'Days',
      target: 'Target: 50% reduction',
      icon: FiClock,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    {
      title: 'CAPA Closure Rate',
      value: `${metrics?.capa_closure_rate || 0}`,
      unit: '%',
      target: 'Target: 95%+',
      icon: FiCheckCircle,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-100'
    },
    {
      title: 'True Root-Cause ID',
      value: `${metrics?.true_root_cause_rate || 0}%`,
      unit: 'Rate',
      target: 'Eliminates false positives',
      icon: FiTarget,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-100'
    },
    {
      title: 'Deviation Backlog',
      value: `${metrics?.deviation_backlog || 0}`,
      unit: 'Items',
      target: 'Down from 45 last month',
      icon: FiTrendingDown,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-r ${card.color} p-6 rounded-xl text-white`}
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={card.icon} className="text-2xl" />
            <span className={`${card.textColor} text-sm`}>{card.unit}</span>
          </div>
          <div className="text-3xl font-bold mb-1">{card.value}</div>
          <div className={`${card.textColor} text-sm`}>{card.title}</div>
          <div className={`text-xs ${card.textColor} mt-1`}>{card.target}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default MetricsCards