import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiDollarSign, FiCpu, FiTrendingUp, FiBarChart3 } = FiIcons

const AICostOverview = () => {
  const aiCostData = [
    {
      service: 'Problem Statement Generation',
      provider: 'ChatGPT 4 Mini',
      usageCount: 156,
      totalCost: 0.47,
      successRate: 98.7
    },
    {
      service: 'Compliance Check',
      provider: 'Claude Sonnet 4',
      usageCount: 134,
      totalCost: 1.07,
      successRate: 96.3
    },
    {
      service: 'Root Cause Analysis',
      provider: 'ChatGPT 4',
      usageCount: 89,
      totalCost: 4.01,
      successRate: 94.4
    },
    {
      service: 'RCA Validation',
      provider: 'Perplexity',
      usageCount: 67,
      totalCost: 0.80,
      successRate: 92.5
    }
  ]

  const totalMonthlyCost = aiCostData.reduce((sum, item) => sum + item.totalCost, 0)
  const totalUsage = aiCostData.reduce((sum, item) => sum + item.usageCount, 0)
  const avgSuccessRate = aiCostData.reduce((sum, item) => sum + item.successRate, 0) / aiCostData.length

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <SafeIcon icon={FiDollarSign} className="text-green-600 dark:text-green-400" />
          <span>AI Cost Overview - This Month</span>
        </h3>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm">
          View Detailed Report →
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiDollarSign} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">${totalMonthlyCost.toFixed(2)}</div>
          <div className="text-xs text-green-600 dark:text-green-400">vs $5.89 last month</div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiCpu} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">AI Calls</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalUsage}</div>
          <div className="text-xs text-blue-600 dark:text-blue-400">+8% from last month</div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{avgSuccessRate.toFixed(1)}%</div>
          <div className="text-xs text-purple-600 dark:text-purple-400">Quality maintained</div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiBarChart3} className="text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Avg Cost/Call</span>
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">${(totalMonthlyCost / totalUsage).toFixed(3)}</div>
          <div className="text-xs text-orange-600 dark:text-orange-400">-5% optimization</div>
        </div>
      </div>

      {/* Service Breakdown */}
      <div>
        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">Service Usage Breakdown</h4>
        <div className="space-y-3">
          {aiCostData.map((service, index) => {
            const percentage = (service.totalCost / totalMonthlyCost) * 100
            return (
              <div key={service.service} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{service.service}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">${service.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{service.provider}</span>
                    <span>{service.usageCount} calls</span>
                    <span>{service.successRate}% success</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className={`h-1.5 rounded-full ${
                        index === 0 ? 'bg-green-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Budget Status */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Monthly Budget Status</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">$500 allocated • ${(500 - totalMonthlyCost).toFixed(2)} remaining</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{((totalMonthlyCost / 500) * 100).toFixed(1)}%</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">used</div>
          </div>
        </div>
        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-3">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
            style={{ width: `${(totalMonthlyCost / 500) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default AICostOverview