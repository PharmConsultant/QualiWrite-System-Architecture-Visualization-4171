import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'

const { FiX, FiSave } = FiIcons

const CapaForm = ({ capa, onSubmit, onCancel, isEditing = false }) => {
  const { deviations, users } = useData()
  
  const [formData, setFormData] = useState({
    deviation_id: capa?.deviation_id || '',
    title: capa?.title || '',
    description: capa?.description || '',
    owner: capa?.owner || '',
    due_date: capa?.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: capa?.status || 'open'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit CAPA Action' : 'New CAPA Action'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-2"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Related Deviation
            </label>
            <select
              value={formData.deviation_id}
              onChange={(e) => setFormData(prev => ({ ...prev, deviation_id: e.target.value }))}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select deviation...</option>
              {deviations.map(dev => (
                <option key={dev.id} value={dev.id}>
                  {dev.deviation_id} - {dev.batch_number}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              CAPA Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief title for the corrective action"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of the corrective and preventive action..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Owner
              </label>
              <select
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select owner...</option>
                {users.map(user => (
                  <option key={user.id} value={user.full_name}>
                    {user.full_name} ({user.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} />
              <span>{isEditing ? 'Update CAPA' : 'Create CAPA'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CapaForm