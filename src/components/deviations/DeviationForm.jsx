import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiX, FiSave, FiAlertTriangle, FiClock, FiUser, FiPackage, FiSettings, FiCpu, FiShield, FiCheckCircle, FiEdit3, FiRefreshCw } = FiIcons

const DeviationForm = ({ deviation, onSubmit, onCancel, isEditing = false }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    batch_number: deviation?.batch_number || '',
    part_number: deviation?.part_number || '',
    product_name: deviation?.product_name || '',
    area: deviation?.area || '',
    
    // Event Details
    date_discovered: deviation?.date_discovered ? deviation.date_discovered.split('T')[0] : new Date().toISOString().split('T')[0],
    time_discovered: deviation?.time_discovered || new Date().toTimeString().slice(0, 5),
    discovered_by: deviation?.discovered_by || '',
    shift: deviation?.shift || 'day',
    
    // Deviation Description (broken into questions)
    what_observed: deviation?.what_observed || '',
    when_discovered: deviation?.when_discovered || '',
    where_occurred: deviation?.where_occurred || '',
    how_detected: deviation?.how_detected || '',
    who_involved: deviation?.who_involved || '',
    
    // Immediate Actions (broken into questions)
    containment_actions: deviation?.containment_actions || '',
    notifications_made: deviation?.notifications_made || '',
    samples_retained: deviation?.samples_retained || '',
    equipment_secured: deviation?.equipment_secured || '',
    documentation_gathered: deviation?.documentation_gathered || '',
    
    // AI Generated Content
    problem_statement: deviation?.problem_statement || '',
    compliance_check_status: deviation?.compliance_check_status || 'pending',
    
    // Classifications
    rpn_score: deviation?.rpn_score || 0,
    severity: deviation?.severity || 'minor',
    rpn_severity: deviation?.rpn_severity || '',
    rpn_occurrence: deviation?.rpn_occurrence || '',
    rpn_detection: deviation?.rpn_detection || ''
  })

  const [aiProcessing, setAiProcessing] = useState(false)
  const [complianceCheck, setComplianceCheck] = useState(false)
  const [problemStatementGenerated, setProblemStatementGenerated] = useState(false)
  const [complianceApproved, setComplianceApproved] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateProblemStatement = async () => {
    setAiProcessing(true)
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const statement = `Quality deviation identified in batch ${formData.batch_number || '[BATCH]'} involving ${formData.part_number || '[EQUIPMENT]'} where ${formData.what_observed || '[OBSERVATION]'} was detected during ${formData.how_detected || '[DETECTION METHOD]'}. Initial containment actions included ${formData.containment_actions || '[ACTIONS]'}. Investigation required to determine root cause and implement corrective measures per FDA 21 CFR 210.192 requirements.`
    
    setFormData(prev => ({ ...prev, problem_statement: statement }))
    setProblemStatementGenerated(true)
    setAiProcessing(false)
  }

  const runComplianceCheck = async () => {
    setComplianceCheck(true)
    // Simulate compliance check processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock compliance check result
    const isCompliant = Math.random() > 0.3 // 70% chance of passing
    
    setFormData(prev => ({ 
      ...prev, 
      compliance_check_status: isCompliant ? 'approved' : 'needs_revision' 
    }))
    setComplianceApproved(isCompliant)
    setComplianceCheck(false)
  }

  const calculateRPN = () => {
    const severity = parseInt(formData.rpn_severity) || 1
    const occurrence = parseInt(formData.rpn_occurrence) || 1
    const detection = parseInt(formData.rpn_detection) || 1
    const rpn = severity * occurrence * detection
    setFormData(prev => ({ ...prev, rpn_score: rpn }))
    return rpn
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const generateDeviationId = () => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `DEV-${year}-${randomNum}`
  }

  const canProceedToClassification = () => {
    return problemStatementGenerated && complianceApproved
  }

  const canInitiateDeviation = () => {
    return complianceApproved && formData.rpn_score > 0
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
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiAlertTriangle} className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {currentStep === 1 ? 'Step 1: Deviation Event Details' : 'Step 2: Risk Classification'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEditing ? 'Edit deviation information' : 'Record new quality deviation with FDA compliance'}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="text-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
            </button>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Step 1: Event Details
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToClassification()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 2
                  ? 'bg-blue-600 text-white'
                  : canProceedToClassification()
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              Step 2: Classification
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && (
              <>
                {/* Compliance Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiSettings} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">FDA 21 CFR 210.192 Compliant Entry</h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        All fields are validated for regulatory compliance and audit trail requirements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Information Section */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
                    <SafeIcon icon={FiPackage} className="text-blue-600 dark:text-blue-400" />
                    <span>Basic Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Deviation ID
                      </label>
                      <input
                        type="text"
                        value={deviation?.deviation_id || generateDeviationId()}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        readOnly
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">System generated unique ID</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Batch Number
                      </label>
                      <input
                        type="text"
                        value={formData.batch_number}
                        onChange={(e) => handleInputChange('batch_number', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Batch-2024-xxx"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">LIMS integration available</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.product_name}
                        onChange={(e) => handleInputChange('product_name', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Product name and strength"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Part Number
                      </label>
                      <select
                        value={formData.part_number}
                        onChange={(e) => handleInputChange('part_number', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select part...</option>
                        <option value="TP-003">Tablet Press #3 (TP-003)</option>
                        <option value="CP-001">Coating Pan #1 (CP-001)</option>
                        <option value="BL-002">Blender #2 (BL-002)</option>
                        <option value="PL-004">Packaging Line #4 (PL-004)</option>
                        <option value="GR-001">Granulator #1 (GR-001)</option>
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ERP integrated part list</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Manufacturing Area
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select area...</option>
                        <option value="Compression">Compression Suite</option>
                        <option value="Coating">Coating Department</option>
                        <option value="Blending">Blending Area</option>
                        <option value="Packaging">Packaging Floor</option>
                        <option value="Quality Lab">Quality Control Lab</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Event Details Section */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="text-green-600 dark:text-green-400" />
                    <span>Event Details</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Date Discovered
                      </label>
                      <input
                        type="date"
                        value={formData.date_discovered}
                        onChange={(e) => handleInputChange('date_discovered', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Time Discovered
                      </label>
                      <input
                        type="time"
                        value={formData.time_discovered}
                        onChange={(e) => handleInputChange('time_discovered', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Discovered By
                      </label>
                      <input
                        type="text"
                        value={formData.discovered_by}
                        onChange={(e) => handleInputChange('discovered_by', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Employee name/ID"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Shift
                      </label>
                      <select
                        value={formData.shift}
                        onChange={(e) => handleInputChange('shift', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="day">Day Shift (6AM - 2PM)</option>
                        <option value="evening">Evening Shift (2PM - 10PM)</option>
                        <option value="night">Night Shift (10PM - 6AM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Deviation Description Questions */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Deviation Description</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        What was observed?
                      </label>
                      <textarea
                        value={formData.what_observed}
                        onChange={(e) => handleInputChange('what_observed', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe what was observed..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        When was it discovered?
                      </label>
                      <textarea
                        value={formData.when_discovered}
                        onChange={(e) => handleInputChange('when_discovered', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe when it was discovered..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Where did it occur?
                      </label>
                      <textarea
                        value={formData.where_occurred}
                        onChange={(e) => handleInputChange('where_occurred', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe where it occurred..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        How was it detected?
                      </label>
                      <textarea
                        value={formData.how_detected}
                        onChange={(e) => handleInputChange('how_detected', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe how it was detected..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Who was involved?
                      </label>
                      <textarea
                        value={formData.who_involved}
                        onChange={(e) => handleInputChange('who_involved', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe who was involved..."
                      />
                    </div>
                  </div>
                </div>

                {/* Immediate Actions Questions */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="text-orange-600 dark:text-orange-400" />
                    <span>Immediate Actions Taken</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Containment actions taken?
                      </label>
                      <textarea
                        value={formData.containment_actions}
                        onChange={(e) => handleInputChange('containment_actions', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe containment actions..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Notifications made?
                      </label>
                      <textarea
                        value={formData.notifications_made}
                        onChange={(e) => handleInputChange('notifications_made', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe notifications made..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Samples retained?
                      </label>
                      <textarea
                        value={formData.samples_retained}
                        onChange={(e) => handleInputChange('samples_retained', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe samples retained..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Equipment secured?
                      </label>
                      <textarea
                        value={formData.equipment_secured}
                        onChange={(e) => handleInputChange('equipment_secured', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe equipment security measures..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Documentation gathered?
                      </label>
                      <textarea
                        value={formData.documentation_gathered}
                        onChange={(e) => handleInputChange('documentation_gathered', e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg h-24 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        placeholder="Describe documentation gathered..."
                      />
                    </div>
                  </div>
                </div>

                {/* AI Problem Statement Generation */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center space-x-2">
                    <SafeIcon icon={FiCpu} className="text-green-600 dark:text-green-400" />
                    <span>AI Problem Statement Generation</span>
                  </h3>
                  
                  {!problemStatementGenerated ? (
                    <div className="text-center">
                      <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                        Generate an AI-powered problem statement based on the information provided above.
                      </p>
                      <button
                        type="button"
                        onClick={generateProblemStatement}
                        disabled={aiProcessing}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                      >
                        {aiProcessing ? (
                          <>
                            <SafeIcon icon={FiRefreshCw} className="animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <SafeIcon icon={FiCpu} />
                            <span>Generate Problem Statement</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-green-300 dark:border-green-600 mb-4">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Generated Problem Statement:</h4>
                        <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">{formData.problem_statement}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={generateProblemStatement}
                          className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiEdit3} />
                          <span>Regenerate</span>
                        </button>
                        {!complianceApproved && (
                          <button
                            type="button"
                            onClick={runComplianceCheck}
                            disabled={complianceCheck}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            {complianceCheck ? (
                              <>
                                <SafeIcon icon={FiRefreshCw} className="animate-spin" />
                                <span>Checking...</span>
                              </>
                            ) : (
                              <>
                                <SafeIcon icon={FiShield} />
                                <span>Run Compliance Check</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {formData.compliance_check_status === 'approved' && (
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCheckCircle} className="text-green-600 dark:text-green-400" />
                        <span className="text-green-800 dark:text-green-200 font-medium">Compliance Check Passed</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                        Problem statement meets FDA 21 CFR requirements and is ready for classification.
                      </p>
                    </div>
                  )}
                  
                  {formData.compliance_check_status === 'needs_revision' && (
                    <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-600 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiAlertTriangle} className="text-amber-600 dark:text-amber-400" />
                        <span className="text-amber-800 dark:text-amber-200 font-medium">Revision Required</span>
                      </div>
                      <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                        Problem statement requires additional information or clarification for compliance.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Risk Classification Section */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
                    <SafeIcon icon={FiShield} className="text-purple-600 dark:text-purple-400" />
                    <span>Risk-Based Classification (ICH Q9)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Severity (1-10)
                      </label>
                      <select
                        value={formData.rpn_severity}
                        onChange={(e) => {
                          handleInputChange('rpn_severity', e.target.value)
                          setTimeout(calculateRPN, 100)
                        }}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select severity...</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} - {num <= 3 ? 'Low' : num <= 7 ? 'Medium' : 'High'}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Impact on patient safety</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Occurrence (1-10)
                      </label>
                      <select
                        value={formData.rpn_occurrence}
                        onChange={(e) => {
                          handleInputChange('rpn_occurrence', e.target.value)
                          setTimeout(calculateRPN, 100)
                        }}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select occurrence...</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} - {num <= 3 ? 'Rare' : num <= 7 ? 'Occasional' : 'Frequent'}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Likelihood of occurrence</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Detection (1-10)
                      </label>
                      <select
                        value={formData.rpn_detection}
                        onChange={(e) => {
                          handleInputChange('rpn_detection', e.target.value)
                          setTimeout(calculateRPN, 100)
                        }}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select detection...</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} - {num <= 3 ? 'High' : num <= 7 ? 'Medium' : 'Low'}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ability to detect before release</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200">Calculated RPN Score</h4>
                        <p className="text-purple-700 dark:text-purple-300 text-sm">
                          Severity × Occurrence × Detection = {formData.rpn_score}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${
                        formData.rpn_score > 100 ? 'bg-red-100 text-red-700' :
                        formData.rpn_score > 50 ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {formData.rpn_score}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traditional Classification */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Traditional Severity Classification</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {['minor', 'major', 'critical'].map((level) => (
                      <div
                        key={level}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.severity === level
                            ? level === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                              level === 'major' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' :
                              'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        onClick={() => handleInputChange('severity', level)}
                      >
                        <div className="text-center">
                          <div className={`font-semibold capitalize mb-2 ${
                            level === 'critical' ? 'text-red-700 dark:text-red-300' :
                            level === 'major' ? 'text-amber-700 dark:text-amber-300' :
                            'text-green-700 dark:text-green-300'
                          }`}>
                            {level}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {level === 'critical' ? 'Immediate action required' :
                             level === 'major' ? 'Significant impact' :
                             'Limited impact'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Classification Check */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-800 dark:text-blue-200 font-medium">Classification Complete</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Both RPN-based and traditional classifications have been assigned. Ready to initiate deviation.
                  </p>
                </div>
              </>
            )}

            {/* Form Actions */}
            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex space-x-3">
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Back to Step 1
                  </button>
                )}
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                >
                  <SafeIcon icon={FiSave} />
                  <span>{currentStep === 1 ? 'Save & Continue' : (isEditing ? 'Update Deviation' : 'Initiate Deviation')}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DeviationForm