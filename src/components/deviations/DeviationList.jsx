import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'
import DeviationForm from './DeviationForm'

const { FiPlus, FiSearch, FiFilter, FiSettings, FiEdit3, FiEye } = FiIcons

const DeviationList = () => {
  const { deviations, loading, createDeviation, updateDeviation } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingDeviation, setEditingDeviation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredDeviations = deviations.filter(deviation => {
    const matchesSearch = deviation.deviation_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deviation.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deviation.equipment_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || deviation.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getSeverityColor = (severity) => {
    const colors = {
      'critical': 'bg-red-100 text-red-700',
      'major': 'bg-amber-100 text-amber-700',
      'minor': 'bg-green-100 text-green-700'
    }
    return colors[severity] || colors.minor
  }

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-gray-100 text-gray-700',
      'investigation': 'bg-blue-100 text-blue-700',
      'rca_progress': 'bg-purple-100 text-purple-700',
      'capa_planning': 'bg-yellow-100 text-yellow-700',
      'effectiveness_check': 'bg-orange-100 text-orange-700',
      'closed': 'bg-green-100 text-green-700'
    }
    return colors[status] || colors.open
  }

  const getRpnColor = (rpn) => {
    if (rpn > 100) return 'bg-red-100 text-red-700'
    if (rpn > 50) return 'bg-amber-100 text-amber-700'
    return 'bg-green-100 text-green-700'
  }

  const handleCreateDeviation = async (deviationData) => {
    await createDeviation(deviationData)
    setShowForm(false)
  }

  const handleUpdateDeviation = async (id, updates) => {
    await updateDeviation(id, updates)
    setEditingDeviation(null)
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
          <h1 className="text-3xl font-bold text-slate-800">Deviation Management</h1>
          <p className="text-slate-600">Track and manage quality deviations with FDA compliance</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <SafeIcon icon={FiPlus} />
          <span>New Deviation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by deviation ID, batch, equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="investigation">Investigation</option>
            <option value="rca_progress">RCA Progress</option>
            <option value="capa_planning">CAPA Planning</option>
            <option value="effectiveness_check">Effectiveness Check</option>
            <option value="closed">Closed</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100">
            <SafeIcon icon={FiSettings} />
            <span>Configure Workflow</span>
          </button>
        </div>
      </div>

      {/* Deviations Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Deviation ID</th>
                <th className="text-left p-4 font-medium text-slate-700">Batch/Equipment</th>
                <th className="text-left p-4 font-medium text-slate-700">RPN Score</th>
                <th className="text-left p-4 font-medium text-slate-700">Severity</th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
                <th className="text-left p-4 font-medium text-slate-700">Days Open</th>
                <th className="text-left p-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeviations.map((deviation) => (
                <motion.tr
                  key={deviation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-4 font-mono text-sm font-medium">{deviation.deviation_id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-slate-800">{deviation.batch_number}</div>
                      <div className="text-xs text-slate-500">{deviation.equipment_id}</div>
                      <div className="text-xs text-slate-400">{deviation.product_name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getRpnColor(deviation.rpn_score)}`}>
                      {deviation.rpn_score}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(deviation.severity)}`}>
                      {deviation.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deviation.status)}`}>
                      {deviation.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${deviation.days_open > 7 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                      {deviation.days_open} days
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingDeviation(deviation)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit3} className="text-sm" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-1 rounded"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} className="text-sm" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <DeviationForm
          onSubmit={handleCreateDeviation}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingDeviation && (
        <DeviationForm
          deviation={editingDeviation}
          onSubmit={(data) => handleUpdateDeviation(editingDeviation.id, data)}
          onCancel={() => setEditingDeviation(null)}
          isEditing
        />
      )}
    </div>
  )
}

export default DeviationList