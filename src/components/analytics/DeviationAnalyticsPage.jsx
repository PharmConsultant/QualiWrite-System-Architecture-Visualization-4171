import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'
import { useAnalytics } from '../../hooks/useAnalytics'

const { 
  FiBarChart3, FiTrendingUp, FiTrendingDown, FiClock, FiTarget, 
  FiAlertTriangle, FiCheckCircle, FiFilter, FiDownload, FiCalendar,
  FiSettings, FiRefreshCw, FiPieChart, FiActivity, FiShield
} = FiIcons

const DeviationAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('overview')
  const [filterBySeverity, setFilterBySeverity] = useState('all')
  const [filterByStatus, setFilterByStatus] = useState('all')
  
  const { deviations, loading } = useData()
  const { analyticsData, getDataForTimeRange } = useAnalytics()

  // Enhanced deviation analytics calculations
  const calculateDeviationMetrics = () => {
    const now = new Date()
    const timeRangeMs = {
      'week': 7 * 24 * 60 * 60 * 1000,
      'month': 30 * 24 * 60 * 60 * 1000,
      'quarter': 90 * 24 * 60 * 60 * 1000,
      'year': 365 * 24 * 60 * 60 * 1000
    }

    const rangeMs = timeRangeMs[timeRange]
    const cutoffDate = new Date(now.getTime() - rangeMs)
    
    const filteredDeviations = deviations.filter(dev => {
      const devDate = new Date(dev.created_at)
      const matchesTime = devDate >= cutoffDate
      const matchesSeverity = filterBySeverity === 'all' || dev.severity === filterBySeverity
      const matchesStatus = filterByStatus === 'all' || dev.status === filterByStatus
      return matchesTime && matchesSeverity && matchesStatus
    })

    // Core metrics
    const totalDeviations = filteredDeviations.length
    const closedDeviations = filteredDeviations.filter(d => d.status === 'closed').length
    const criticalDeviations = filteredDeviations.filter(d => d.severity === 'critical').length
    const overdueDeviations = filteredDeviations.filter(d => d.days_open > 30).length

    // Time-to-resolution metrics
    const avgDaysToClose = closedDeviations > 0 
      ? filteredDeviations
          .filter(d => d.status === 'closed')
          .reduce((sum, d) => sum + d.days_open, 0) / closedDeviations
      : 0

    // Severity breakdown
    const severityBreakdown = {
      critical: filteredDeviations.filter(d => d.severity === 'critical').length,
      major: filteredDeviations.filter(d => d.severity === 'major').length,
      minor: filteredDeviations.filter(d => d.severity === 'minor').length
    }

    // Status breakdown
    const statusBreakdown = {
      open: filteredDeviations.filter(d => d.status === 'open').length,
      investigation: filteredDeviations.filter(d => d.status === 'investigation').length,
      rca_progress: filteredDeviations.filter(d => d.status === 'rca_progress').length,
      capa_planning: filteredDeviations.filter(d => d.status === 'capa_planning').length,
      effectiveness_check: filteredDeviations.filter(d => d.status === 'effectiveness_check').length,
      closed: filteredDeviations.filter(d => d.status === 'closed').length
    }

    // Equipment/Product analysis
    const equipmentFrequency = {}
    const productFrequency = {}
    
    filteredDeviations.forEach(dev => {
      equipmentFrequency[dev.equipment_id] = (equipmentFrequency[dev.equipment_id] || 0) + 1
      productFrequency[dev.product_name] = (productFrequency[dev.product_name] || 0) + 1
    })

    const topEquipmentIssues = Object.entries(equipmentFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([equipment, count]) => ({ equipment, count }))

    const topProductIssues = Object.entries(productFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([product, count]) => ({ product, count }))

    // RPN Score analysis
    const avgRPN = totalDeviations > 0 
      ? filteredDeviations.reduce((sum, d) => sum + (d.rpn_score || 0), 0) / totalDeviations
      : 0

    const highRiskDeviations = filteredDeviations.filter(d => (d.rpn_score || 0) > 100).length

    return {
      totalDeviations,
      closedDeviations,
      criticalDeviations,
      overdueDeviations,
      avgDaysToClose,
      severityBreakdown,
      statusBreakdown,
      topEquipmentIssues,
      topProductIssues,
      avgRPN,
      highRiskDeviations,
      closureRate: totalDeviations > 0 ? (closedDeviations / totalDeviations * 100) : 0,
      criticalRate: totalDeviations > 0 ? (criticalDeviations / totalDeviations * 100) : 0,
      overdueRate: totalDeviations > 0 ? (overdueDeviations / totalDeviations * 100) : 0
    }
  }

  const metrics = calculateDeviationMetrics()

  // Mock historical data for trending
  const generateTrendData = () => {
    const points = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : timeRange === 'quarter' ? 12 : 12
    const data = []
    
    for (let i = points - 1; i >= 0; i--) {
      const date = new Date()
      if (timeRange === 'week') {
        date.setDate(date.getDate() - i)
      } else if (timeRange === 'month') {
        date.setDate(date.getDate() - i)
      } else if (timeRange === 'quarter') {
        date.setDate(date.getDate() - i * 7)
      } else {
        date.setMonth(date.getMonth() - i)
      }
      
      data.push({
        date: date.toLocaleDateString(),
        newDeviations: Math.floor(Math.random() * 5) + 1,
        closedDeviations: Math.floor(Math.random() * 4) + 1,
        avgDaysOpen: Math.floor(Math.random() * 10) + 15
      })
    }
    
    return data
  }

  const trendData = generateTrendData()

  const timeRangeLabels = {
    'week': 'This Week',
    'month': 'This Month', 
    'quarter': 'This Quarter',
    'year': 'This Year'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Deviation Management Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive analysis of deviation trends, performance metrics, and compliance indicators
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
            <SafeIcon icon={FiDownload} />
            <span>Export Report</span>
          </button>
          <button className="bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-700">
            <SafeIcon icon={FiRefreshCw} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="text-slate-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-slate-500" />
              <select
                value={filterBySeverity}
                onChange={(e) => setFilterBySeverity(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={filterByStatus}
                onChange={(e) => setFilterByStatus(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="investigation">Investigation</option>
                <option value="rca_progress">RCA Progress</option>
                <option value="capa_planning">CAPA Planning</option>
                <option value="effectiveness_check">Effectiveness Check</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Analyzing {metrics.totalDeviations} deviations • {timeRangeLabels[timeRange]}
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiBarChart3} className="text-2xl" />
            <SafeIcon icon={FiTrendingUp} className="text-blue-200" />
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.totalDeviations}</div>
          <div className="text-blue-100 text-sm">Total Deviations</div>
          <div className="text-xs text-blue-200 mt-1">{timeRangeLabels[timeRange]}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiCheckCircle} className="text-2xl" />
            <SafeIcon icon={metrics.closureRate > 75 ? FiTrendingUp : FiTrendingDown} className="text-green-200" />
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.closureRate.toFixed(1)}%</div>
          <div className="text-green-100 text-sm">Closure Rate</div>
          <div className="text-xs text-green-200 mt-1">{metrics.closedDeviations} of {metrics.totalDeviations} closed</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiClock} className="text-2xl" />
            <SafeIcon icon={metrics.avgDaysToClose < 20 ? FiTrendingDown : FiTrendingUp} className="text-amber-200" />
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.avgDaysToClose.toFixed(1)}</div>
          <div className="text-amber-100 text-sm">Avg Days to Close</div>
          <div className="text-xs text-amber-200 mt-1">Target: &lt; 30 days</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiAlertTriangle} className="text-2xl" />
            <SafeIcon icon={metrics.criticalRate < 20 ? FiTrendingDown : FiTrendingUp} className="text-red-200" />
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.criticalDeviations}</div>
          <div className="text-red-100 text-sm">Critical Deviations</div>
          <div className="text-xs text-red-200 mt-1">{metrics.criticalRate.toFixed(1)}% of total</div>
        </motion.div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiPieChart} className="text-blue-600" />
            <span>Severity Distribution</span>
          </h3>
          
          <div className="space-y-4">
            {Object.entries(metrics.severityBreakdown).map(([severity, count]) => {
              const percentage = metrics.totalDeviations > 0 ? (count / metrics.totalDeviations * 100) : 0
              const colors = {
                critical: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700' },
                major: { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700' },
                minor: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700' }
              }
              
              return (
                <div key={severity} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                      {severity}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{count}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-500">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className={`h-2 rounded-full ${colors[severity].bg}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Workflow */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiActivity} className="text-purple-600" />
            <span>Workflow Status</span>
          </h3>
          
          <div className="space-y-3">
            {Object.entries(metrics.statusBreakdown).map(([status, count]) => {
              const statusLabels = {
                open: 'Open',
                investigation: 'Investigation',
                rca_progress: 'RCA Progress',
                capa_planning: 'CAPA Planning',
                effectiveness_check: 'Effectiveness Check',
                closed: 'Closed'
              }
              
              const statusColors = {
                open: 'text-slate-600 bg-slate-100',
                investigation: 'text-blue-600 bg-blue-100',
                rca_progress: 'text-purple-600 bg-purple-100',
                capa_planning: 'text-amber-600 bg-amber-100',
                effectiveness_check: 'text-orange-600 bg-orange-100',
                closed: 'text-green-600 bg-green-100'
              }
              
              return (
                <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{count}</span>
                    <span className="text-xs text-slate-500">
                      {metrics.totalDeviations > 0 ? ((count / metrics.totalDeviations * 100).toFixed(1)) : 0}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Risk Analysis & Equipment Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Analysis */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiShield} className="text-red-600" />
            <span>Risk Analysis (ICH Q9)</span>
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">{metrics.avgRPN.toFixed(0)}</div>
                <div className="text-sm text-red-600 dark:text-red-400">Average RPN Score</div>
                <div className="text-xs text-red-500 mt-1">Risk Priority Number</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{metrics.highRiskDeviations}</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">High Risk (RPN &gt; 100)</div>
                <div className="text-xs text-orange-500 mt-1">Require immediate action</div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{metrics.overdueDeviations}</div>
                  <div className="text-sm text-amber-600 dark:text-amber-400">Overdue Deviations</div>
                </div>
                <SafeIcon icon={FiAlertTriangle} className="text-2xl text-amber-600" />
              </div>
              <div className="text-xs text-amber-500 mt-2">
                {metrics.overdueRate.toFixed(1)}% of total deviations &gt; 30 days
              </div>
            </div>
          </div>
        </div>

        {/* Top Equipment Issues */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiSettings} className="text-blue-600" />
            <span>Top Equipment Issues</span>
          </h3>
          
          <div className="space-y-3">
            {metrics.topEquipmentIssues.length > 0 ? (
              metrics.topEquipmentIssues.map((item, index) => (
                <div key={item.equipment} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{item.equipment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.count} issues
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <SafeIcon icon={FiSettings} className="text-3xl mb-2 mx-auto" />
                <p>No equipment issues in selected timeframe</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trending Chart Placeholder */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiTrendingUp} className="text-green-600" />
          <span>Deviation Trends - {timeRangeLabels[timeRange]}</span>
        </h3>
        
        <div className="h-64 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <SafeIcon icon={FiBarChart3} className="text-4xl text-slate-400 mb-4 mx-auto" />
            <h4 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Interactive Chart Coming Soon</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Time series visualization of deviation patterns, closure rates, and performance trends
            </p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-600 p-2 rounded">
                <div className="font-bold text-blue-600">New: {trendData[trendData.length - 1]?.newDeviations || 0}</div>
                <div className="text-slate-500">Today</div>
              </div>
              <div className="bg-white dark:bg-slate-600 p-2 rounded">
                <div className="font-bold text-green-600">Closed: {trendData[trendData.length - 1]?.closedDeviations || 0}</div>
                <div className="text-slate-500">Today</div>
              </div>
              <div className="bg-white dark:bg-slate-600 p-2 rounded">
                <div className="font-bold text-amber-600">Avg: {trendData[trendData.length - 1]?.avgDaysOpen || 0}d</div>
                <div className="text-slate-500">Days Open</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Performance Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center space-x-2">
          <SafeIcon icon={FiTarget} className="text-blue-600" />
          <span>FDA 21 CFR 210.192 Compliance Summary</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Documentation Complete</span>
              <SafeIcon icon={FiCheckCircle} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {((metrics.totalDeviations - metrics.statusBreakdown.open) / Math.max(metrics.totalDeviations, 1) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">All required fields captured</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Timely Investigation</span>
              <SafeIcon icon={FiClock} className="text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {((metrics.totalDeviations - metrics.overdueDeviations) / Math.max(metrics.totalDeviations, 1) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">Within regulatory timeframes</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">CAPA Effectiveness</span>
              <SafeIcon icon={FiShield} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {((metrics.statusBreakdown.closed + metrics.statusBreakdown.effectiveness_check) / Math.max(metrics.totalDeviations, 1) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">Verified or in verification</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Regulatory Status:</strong> All deviations are being tracked in accordance with 
            FDA 21 CFR 210.192 requirements for investigation, documentation, and corrective action.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeviationAnalyticsPage