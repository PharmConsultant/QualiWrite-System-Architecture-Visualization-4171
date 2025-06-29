import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import FiveWhysAnalysis from './FiveWhysAnalysis'
import FishboneAnalysis from './FishboneAnalysis'

const { FiAlertTriangle, FiCpu, FiCheckCircle, FiX } = FiIcons

const RCAWorkspace = () => {
  const [selectedMethod, setSelectedMethod] = useState('5_whys')
  const [humanErrorBlocked, setHumanErrorBlocked] = useState(true)
  const [systemValidated, setSystemValidated] = useState(false)

  const rcaMethods = [
    { id: '5_whys', name: '5 Whys', description: 'Current method' },
    { id: 'fishbone', name: 'Fishbone Diagram', description: 'Cause & Effect' },
    { id: 'fault_tree', name: 'Fault Tree Analysis', description: 'Logic Tree' }
  ]

  const aiRecommendations = [
    {
      id: 1,
      title: 'Check calibration records',
      description: 'Last calibration: 45 days ago',
      status: 'pending',
      color: 'green'
    },
    {
      id: 2,
      title: 'Review maintenance logs',
      description: 'Pressure sensor replacement due',
      status: 'in_progress',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Verify operator training',
      description: 'Current certification valid',
      status: 'completed',
      color: 'purple'
    }
  ]

  const renderMethodContent = () => {
    switch (selectedMethod) {
      case '5_whys':
        return <FiveWhysAnalysis humanErrorBlocked={humanErrorBlocked} />
      case 'fishbone':
        return <FishboneAnalysis />
      default:
        return <FiveWhysAnalysis humanErrorBlocked={humanErrorBlocked} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">RCA Wizard - Enhanced Analysis</h1>
          <p className="text-slate-600">AI-powered root cause analysis with depth enforcement</p>
        </div>
        <div className={`px-3 py-1 rounded text-sm font-medium ${humanErrorBlocked ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
          {humanErrorBlocked ? '"Human Error" Block Active' : 'System Validated'}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">Prevents Superficial Root-Cause Classification</h3>
            <p className="text-amber-700 text-sm">
              System enforces deeper inquiry before allowing "human error" classification - validates against FDA expectations for thoroughness
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Method Selection */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-800 mb-4">RCA Methods</h3>
            <div className="space-y-2">
              {rcaMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedMethod === method.id
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-medium">{method.name}</div>
                  <div className="text-xs text-slate-500">{method.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className="col-span-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {renderMethodContent()}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiCpu} className="text-slate-600" />
              <h3 className="font-semibold text-slate-800">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 bg-${rec.color}-50 rounded-lg border border-${rec.color}-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm text-${rec.color}-700 font-medium`}>{rec.title}</p>
                      <p className={`text-xs text-${rec.color}-600 mt-1`}>{rec.description}</p>
                    </div>
                    {rec.status === 'completed' ? (
                      <SafeIcon icon={FiCheckCircle} className={`text-${rec.color}-600 text-sm`} />
                    ) : rec.status === 'in_progress' ? (
                      <div className={`w-2 h-2 bg-${rec.color}-500 rounded-full animate-pulse`}></div>
                    ) : (
                      <div className={`w-2 h-2 bg-${rec.color}-300 rounded-full`}></div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Validation Panel */}
      {humanErrorBlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">System Validation Required</h3>
            <button
              onClick={() => setSystemValidated(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Mark as Validated
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Calibration Records</h4>
              <p className="text-sm text-red-600">Last calibration: 45 days ago (Due: 30 days)</p>
              <div className="mt-2">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Action Required</span>
              </div>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">Maintenance Logs</h4>
              <p className="text-sm text-amber-600">Pressure sensor replacement overdue by 5 days</p>
              <div className="mt-2">
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">Review Required</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Training Records</h4>
              <p className="text-sm text-green-600">All operators current on certification</p>
              <div className="mt-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Verified</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default RCAWorkspace