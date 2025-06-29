import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'

const { FiPlus, FiSearch, FiFilter, FiEye, FiClock, FiUser, FiAlertTriangle } = FiIcons

const InvestigationsList = () => {
  const { deviations, loading } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock investigation data based on deviations
  const investigations = deviations.map((deviation, index) => ({
    id: deviation.id,
    investigation_id: `INV-2024-${String(index + 1).padStart(3, '0')}`,
    deviation_id: deviation.deviation_id,
    title: `Investigation: ${deviation.description.substring(0, 50)}...`,
    investigator: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez'][index % 4],
    status: ['open', 'in_progress', 'review', 'completed'][Math.floor(Math.random() * 4)],
    priority: deviation.severity,
    started_date: deviation.date_discovered,
    due_date: new Date(new Date(deviation.date_discovered).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    progress: Math.floor(Math.random() * 100),
    findings: Math.floor(Math.random() * 5) + 1
  }))

  const filteredInvestigations = investigations.filter(investigation => {
    const matchesSearch = investigation.investigation_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investigation.deviation_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investigation.investigator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || investigation.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      'in_progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      'review': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
      'completed': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    }
    return colors[status] || colors.open
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'critical': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
      'major': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
      'minor': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    }
    return colors[priority] || colors.minor
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Investigation Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and manage quality investigations with detailed findings</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <SafeIcon icon={FiPlus} />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by investigation ID, deviation, or investigator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Investigations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInvestigations.map((investigation) => (
          <motion.div
            key={investigation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{investigation.investigation_id}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Related: {investigation.deviation_id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(investigation.priority)}`}>
                  {investigation.priority}
                </span>
                {isOverdue(investigation.due_date) && investigation.status !== 'completed' && (
                  <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                )}
              </div>
            </div>

            {/* Title */}
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{investigation.title}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{investigation.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${investigation.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiUser} className="text-slate-400 text-sm" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">{investigation.investigator}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(investigation.status)}`}>
                  {investigation.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiClock} className="text-slate-400 text-sm" />
                  <span className={`text-xs ${isOverdue(investigation.due_date) && investigation.status !== 'completed' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-600 dark:text-slate-300'}`}>
                    Due: {new Date(investigation.due_date).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {investigation.findings} findings
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 py-2 px-3 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-1">
                  <SafeIcon icon={FiEye} className="text-xs" />
                  <span>View Details</span>
                </button>
                {investigation.status === 'open' && (
                  <button className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 py-2 px-3 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    Start
                  </button>
                )}
                {investigation.status === 'in_progress' && (
                  <button className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 py-2 px-3 rounded-lg text-sm hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    Update
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredInvestigations.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiSearch} className="text-4xl text-slate-400 dark:text-slate-500 mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">No investigations found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search criteria or create a new investigation.</p>
        </div>
      )}
    </div>
  )
}

export default InvestigationsList