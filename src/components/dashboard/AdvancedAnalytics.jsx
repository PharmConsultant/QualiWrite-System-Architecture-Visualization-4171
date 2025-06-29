import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useAnalytics } from '../../hooks/useAnalytics'

const { FiTrendingUp, FiTrendingDown, FiClock, FiTarget, FiCalendar, FiBarChart3, FiSettings, FiMinus } = FiIcons

const AdvancedAnalytics = ({ deviations }) => {
  const [timeRange, setTimeRange] = useState('month')
  const [targetDaysToClose, setTargetDaysToClose] = useState(30)
  const { analyticsData, loading, getDataForTimeRange } = useAnalytics()

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  const data = getDataForTimeRange(timeRange)
  if (!data) return null

  const { current, trends, backlogComparison } = data

  const getTimeRangeLabel = () => {
    const labels = {
      week: 'This Week',
      month: 'This Month', 
      quarter: 'This Quarter',
      year: 'This Year'
    }
    return labels[timeRange] || 'This Month'
  }

  const getTrendIcon = (trend) => {
    if (trend.direction === 'up') return FiTrendingUp
    if (trend.direction === 'down') return FiTrendingDown
    return FiMinus
  }

  const getTrendColor = (trend) => {
    if (trend.isImprovement) return 'text-green-600 dark:text-green-400'
    if (trend.direction === 'neutral') return 'text-slate-500 dark:text-slate-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getBacklogTrendText = (comparison, period) => {
    if (!comparison[period]) return 'No data'
    
    const { trend } = comparison[period]
    const sign = trend.isImprovement ? '-' : '+'
    return `${sign}${trend.change}% YoY`
  }

  const getBacklogTrendColor = (comparison, period) => {
    if (!comparison[period]) return 'text-slate-500'
    return comparison[period].trend.isImprovement ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <SafeIcon icon={FiBarChart3} className="text-blue-600 dark:text-blue-400" />
          <span>Advanced Deviation Analytics</span>
        </h3>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            title="Configure Target Days"
          >
            <SafeIcon icon={FiSettings} className="text-sm" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Days to Close with Real Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <SafeIcon icon={FiClock} className="text-blue-600 dark:text-blue-400" />
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor(trends.avgDaysToClose)}`}>
              <SafeIcon icon={getTrendIcon(trends.avgDaysToClose)} />
              <span>{trends.avgDaysToClose.change}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
            {current.avgDaysToClose.toFixed(1)}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Avg Days to Close</div>
          <div className="text-xs text-blue-500 dark:text-blue-500">
            Target: {targetDaysToClose} days (Adjustable)
          </div>
        </motion.div>

        {/* Percentage Closed on Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <SafeIcon icon={FiTarget} className="text-green-600 dark:text-green-400" />
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor(trends.closedOnTarget)}`}>
              <SafeIcon icon={getTrendIcon(trends.closedOnTarget)} />
              <span>{trends.closedOnTarget.change}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
            {current.closedOnTarget.toFixed(1)}%
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">% Closed on Target</div>
          <div className="text-xs text-green-500 dark:text-green-500">
            vs same period last year
          </div>
        </motion.div>

        {/* Projected to Close on Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <SafeIcon icon={FiCalendar} className="text-amber-600 dark:text-amber-400" />
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor(trends.projectedOnTarget)}`}>
              <SafeIcon icon={getTrendIcon(trends.projectedOnTarget)} />
              <span>{trends.projectedOnTarget.change}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300 mb-1">
            {current.projectedOnTarget.toFixed(1)}%
          </div>
          <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">% Open Projected on Target</div>
          <div className="text-xs text-amber-500 dark:text-amber-500">
            Based on current progress
          </div>
        </motion.div>

        {/* Total Backlog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <SafeIcon icon={FiBarChart3} className="text-purple-600 dark:text-purple-400" />
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor(trends.totalBacklog)}`}>
              <SafeIcon icon={getTrendIcon(trends.totalBacklog)} />
              <span>{trends.totalBacklog.change}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-1">
            {current.totalBacklog}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Total Backlog</div>
          <div className="text-xs text-purple-500 dark:text-purple-500">
            vs same period last year
          </div>
        </motion.div>
      </div>

      {/* Enhanced Backlog Breakdown with Real Data */}
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-slate-700 dark:text-slate-300">Backlog Age Breakdown - {getTimeRangeLabel()}</h4>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Compared to same period last year
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-xl font-bold text-green-700 dark:text-green-300">
              {current.backlogBreakdown.under30}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">≤ 30 Days</div>
            <div className={`text-xs mt-1 ${getBacklogTrendColor(backlogComparison, 'under30')}`}>
              {getBacklogTrendText(backlogComparison, 'under30')}
            </div>
          </div>
          <div className="text-center p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
            <div className="text-xl font-bold text-amber-700 dark:text-amber-300">
              {current.backlogBreakdown.days31to60}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400">31-60 Days</div>
            <div className={`text-xs mt-1 ${getBacklogTrendColor(backlogComparison, 'days31to60')}`}>
              {getBacklogTrendText(backlogComparison, 'days31to60')}
            </div>
          </div>
          <div className="text-center p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <div className="text-xl font-bold text-orange-700 dark:text-orange-300">
              {current.backlogBreakdown.days61to90}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400">61-90 Days</div>
            <div className={`text-xs mt-1 ${getBacklogTrendColor(backlogComparison, 'days61to90')}`}>
              {getBacklogTrendText(backlogComparison, 'days61to90')}
            </div>
          </div>
          <div className="text-center p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <div className="text-xl font-bold text-red-700 dark:text-red-300">
              {current.backlogBreakdown.over90}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">&gt; 90 Days</div>
            <div className={`text-xs mt-1 ${getBacklogTrendColor(backlogComparison, 'over90')}`}>
              {getBacklogTrendText(backlogComparison, 'over90')}
            </div>
          </div>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="text-blue-700 dark:text-blue-300">
            📊 <strong>Data Source:</strong> Real-time analytics with historical comparisons
          </div>
          <div className="text-blue-600 dark:text-blue-400 text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedAnalytics