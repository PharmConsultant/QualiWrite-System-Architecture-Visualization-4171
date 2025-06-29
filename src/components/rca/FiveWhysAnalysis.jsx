import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiAlertTriangle, FiPlus, FiCheck } = FiIcons

const FiveWhysAnalysis = ({ humanErrorBlocked }) => {
  const [whySteps, setWhySteps] = useState([
    {
      id: 1,
      question: 'Why did tablet hardness fail?',
      answer: 'Compression force was insufficient during manufacturing',
      validated: true
    },
    {
      id: 2,
      question: 'Why was compression force insufficient?',
      answer: 'Tablet press pressure settings were below specification',
      validated: true
    },
    {
      id: 3,
      question: 'Why were pressure settings incorrect?',
      answer: 'Last calibration showed drift in pressure sensor readings',
      validated: true
    },
    {
      id: 4,
      question: 'Why was sensor drift not detected earlier?',
      answer: '',
      validated: false
    },
    {
      id: 5,
      question: 'Why was the calibration schedule inadequate?',
      answer: '',
      validated: false
    }
  ])

  const updateWhyStep = (id, answer) => {
    setWhySteps(prev => prev.map(step => 
      step.id === id ? { ...step, answer, validated: answer.length > 10 } : step
    ))
  }

  return (
    <div>
      <h3 className="font-semibold text-slate-800 mb-4">5 Whys Analysis - Equipment Failure</h3>
      <div className="space-y-4">
        {whySteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${
              step.validated ? 'border-slate-200 bg-white' : 'border-blue-200 bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {step.validated ? (
                  <SafeIcon icon={FiCheck} className="text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-blue-600 font-bold">{step.id}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800 mb-2">
                  Why {step.id}: {step.question}
                </div>
                {step.answer ? (
                  <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
                    {step.answer}
                  </div>
                ) : (
                  <textarea
                    placeholder="Enter your analysis..."
                    onChange={(e) => updateWhyStep(step.id, e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {humanErrorBlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 border-2 border-red-200 bg-red-50 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiAlertTriangle} className="text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-red-800 mb-1">System Block: Human Error Check</div>
                <div className="text-sm text-red-600">
                  Before concluding operator error, verify: calibration records, maintenance logs, training documentation
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-white border border-red-300 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-50">
                    Review Calibration
                  </button>
                  <button className="bg-white border border-red-300 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-50">
                    Check Maintenance
                  </button>
                  <button className="bg-white border border-red-300 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-50">
                    Verify Training
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FiveWhysAnalysis