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

  const rcaMethods = [
    { id: '5_whys', name: '5 Whys', description: 'Current method' },
    { id: 'fishbone', name: 'Fishbone Diagram', description: 'Cause & Effect' }
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
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">RCA Wizard - Enhanced Analysis</h1>
          <p className="text-slate-600 dark:text-slate-400">AI-powered root cause analysis with depth enforcement</p>
        </div>
        <div className={`px-3 py-1 rounded text-sm font-medium ${
          humanErrorBlocked 
            ? 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' 
            : 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
        }`}>
          {humanErrorBlocked ? '"Human Error" Block Active' : 'System Validated'}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Prevents Superficial Root-Cause Classification</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              System enforces deeper inquiry before allowing "human error" classification - validates against FDA expectations for thoroughness
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Method Selection */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">RCA Methods</h3>
            <div className="space-y-2">
              {rcaMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedMethod === method.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="font-medium">{method.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{method.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className="col-span-9">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            {renderMethodContent()}
          </div>
        </div>
      </div>

      {/* AI Recommendations - Horizontal Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiCpu} className="text-slate-600 dark:text-slate-300" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 bg-${rec.color}-50 dark:bg-${rec.color}-900/20 rounded-lg border border-${rec.color}-200 dark:border-${rec.color}-800`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm text-${rec.color}-700 dark:text-${rec.color}-300 font-medium`}>{rec.title}</p>
                  <p className={`text-xs text-${rec.color}-600 dark:text-${rec.color}-400 mt-1`}>{rec.description}</p>
                </div>
                {rec.status === 'completed' ? (
                  <SafeIcon icon={FiCheckCircle} className={`text-${rec.color}-600 dark:text-${rec.color}-400 text-sm`} />
                ) : rec.status === 'in_progress' ? (
                  <div className={`w-2 h-2 bg-${rec.color}-500 rounded-full animate-pulse`}></div>
                ) : (
                  <div className={`w-2 h-2 bg-${rec.color}-300 rounded-full`}></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default RCAWorkspace