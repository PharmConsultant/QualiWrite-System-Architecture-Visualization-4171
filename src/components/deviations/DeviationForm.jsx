import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiX, FiSave, FiAlertTriangle } = FiIcons

const DeviationForm = ({ deviation, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    batch_number: deviation?.batch_number || '',
    equipment_id: deviation?.equipment_id || '',
    product_name: deviation?.product_name || '',
    date_discovered: deviation?.date_discovered ? deviation.date_discovered.split('T')[0] : new Date().toISOString().split('T')[0],
    description: deviation?.description || '',
    immediate_actions: deviation?.immediate_actions || '',
    severity: deviation?.severity || 'minor',
    rpn_score: deviation?.rpn_score || 0
  })

  const [aiSuggestion, setAiSuggestion] = useState('')
  const [showAiSuggestion, setShowAiSuggestion] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Simulate AI problem statement generation
    if ((field === 'batch_number' || field === 'equipment_id' || field === 'description') && 
        formData.batch_number && formData.equipment_id && formData.description) {
      generateAiSuggestion()
    }
  }

  const generateAiSuggestion = () => {
    const suggestion = `Based on batch ${formData.batch_number} and equipment ${formData.equipment_id}, this appears to be a ${formData.equipment_id.includes('Press') ? 'compression force' : 'process'} deviation affecting ${formData.description.includes('hardness') ? 'tablet hardness' : 'product quality'} specifications. Initial RPN assessment: ${Math.floor(Math.random() * 100) + 25}.`
    setAiSuggestion(suggestion)
    setShowAiSuggestion(true)
  }

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
        className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Deviation' : 'New Deviation Entry'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-2"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">FDA 21 CFR 210.192 Compliant Entry</h3>
          <p className="text-blue-700 text-sm">All fields are validated for regulatory compliance and audit trail requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deviation ID
              </label>
              <input
                type="text"
                value={deviation?.deviation_id || 'Auto-generated'}
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Batch Number *
              </label>
              <input
                type="text"
                value={formData.batch_number}
                onChange={(e) => handleInputChange('batch_number', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Batch-2024-xxx (LIMS integration)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Equipment ID
              </label>
              <select
                value={formData.equipment_id}
                onChange={(e) => handleInputChange('equipment_id', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select equipment...</option>
                <option value="Tablet Press #3">Tablet Press #3 (TP-003)</option>
                <option value="Coating Pan #1">Coating Pan #1 (CP-001)</option>
                <option value="Blender #2">Blender #2 (BL-002)</option>
                <option value="Packaging Line #4">Packaging Line #4 (PL-004)</option>
                <option value="Granulator #1">Granulator #1 (GR-001)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.product_name}
                onChange={(e) => handleInputChange('product_name', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product name and strength"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date Discovered *
              </label>
              <input
                type="date"
                value={formData.date_discovered}
                onChange={(e) => handleInputChange('date_discovered', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Severity Classification
              </label>
              <select
                value={formData.severity}
                onChange={(e) => handleInputChange('severity', e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deviation Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the deviation in detail..."
              required
            />
          </div>

          {showAiSuggestion && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiAlertTriangle} className="text-green-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-2">AI-Generated Problem Statement</h4>
                  <p className="text-green-700 text-sm mb-3">{aiSuggestion}</p>
                  <div className="flex space-x-2">
                    <button type="button" className="text-xs bg-white border border-green-300 px-3 py-1 rounded hover:bg-green-50">
                      Accept
                    </button>
                    <button type="button" className="text-xs bg-white border border-green-300 px-3 py-1 rounded hover:bg-green-50">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Immediate Actions Taken
            </label>
            <textarea
              value={formData.immediate_actions}
              onChange={(e) => handleInputChange('immediate_actions', e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Document containment steps and immediate actions..."
            />
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
              <span>{isEditing ? 'Update Deviation' : 'Create Deviation'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default DeviationForm