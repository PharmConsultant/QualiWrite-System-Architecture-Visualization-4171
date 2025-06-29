import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiDollarSign, FiCpu, FiTrendingUp, FiTrendingDown, FiBarChart3, FiSettings, FiRefreshCw } = FiIcons

const AICostTrackingPage = () => {
  const [timeRange, setTimeRange] = useState('month')

  const aiCostData = [
    {
      service: 'Problem Statement Generation',
      provider: 'ChatGPT 4 Mini',
      usageCount: 156,
      costPerUse: 0.003,
      totalCost: 0.47,
      avgTokens: 450,
      successRate: 98.7
    },
    {
      service: 'Compliance Check',
      provider: 'Claude Sonnet 4',
      usageCount: 134,
      costPerUse: 0.008,
      totalCost: 1.07,
      avgTokens: 650,
      successRate: 96.3
    },
    {
      service: 'Root Cause Analysis',
      provider: 'ChatGPT 4',
      usageCount: 89,
      costPerUse: 0.045,
      totalCost: 4.01,
      avgTokens: 1250,
      successRate: 94.4
    },
    {
      service: 'RCA Validation',
      provider: 'Perplexity',
      usageCount: 67,
      costPerUse: 0.012,
      totalCost: 0.80,
      avgTokens: 800,
      successRate: 92.5
    }
  ]

  const monthlyTrends = [
    {
      month: 'Oct',
      problemStatement: 0.32,
      compliance: 0.89,
      rca: 3.21,
      validation: 0.67
    },
    {
      month: 'Nov',
      problemStatement: 0.41,
      compliance: 0.95,
      rca: 3.78,
      validation: 0.74
    },
    {
      month: 'Dec',
      problemStatement: 0.47,
      compliance: 1.07,
      rca: 4.01,
      validation: 0.80
    }
  ]

  const totalMonthlyCost = aiCostData.reduce((sum, item) => sum + item.totalCost, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">AI Cost Tracking & Budget Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Monitor AI service usage, costs, and optimize budget allocation</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <SafeIcon icon={FiSettings} />
            <span>Configure AI Settings</span>
          </button>
        </div>
      </div>

      {/* Cost Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiDollarSign} className="text-2xl" />
            <span className="text-green-100 text-sm">USD</span>
          </div>
          <div className="text-3xl font-bold mb-1">${totalMonthlyCost.toFixed(2)}</div>
          <div className="text-green-100 text-sm">Total Monthly AI Cost</div>
          <div className="text-xs text-green-200 mt-1">↑ 12% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiCpu} className="text-2xl" />
            <span className="text-blue-100 text-sm">Calls</span>
          </div>
          <div className="text-3xl font-bold mb-1">{aiCostData.reduce((sum, item) => sum + item.usageCount, 0)}</div>
          <div className="text-blue-100 text-sm">Total AI Calls</div>
          <div className="text-xs text-blue-200 mt-1">↑ 8% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiTrendingUp} className="text-2xl" />
            <span className="text-purple-100 text-sm">Rate</span>
          </div>
          <div className="text-3xl font-bold mb-1">95.5%</div>
          <div className="text-purple-100 text-sm">Avg Success Rate</div>
          <div className="text-xs text-purple-200 mt-1">↑ 2.1% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiBarChart3} className="text-2xl" />
            <span className="text-orange-100 text-sm">Avg</span>
          </div>
          <div className="text-3xl font-bold mb-1">789</div>
          <div className="text-orange-100 text-sm">Tokens per Call</div>
          <div className="text-xs text-orange-200 mt-1">↓ 5% from last month</div>
        </motion.div>
      </div>

      {/* AI Service Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">AI Service Cost Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Service</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">AI Provider</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Usage Count</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Cost per Use</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Total Cost</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {aiCostData.map((service, index) => (
                <motion.tr
                  key={service.service}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-800 dark:text-slate-100">{service.service}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.provider.includes('ChatGPT') 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                        : service.provider.includes('Claude')
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    }`}>
                      {service.provider}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{service.usageCount}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">${service.costPerUse.toFixed(3)}</td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">${service.totalCost.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        service.successRate > 95 ? 'bg-green-500' : 
                        service.successRate > 90 ? 'bg-amber-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-slate-600 dark:text-slate-300">{service.successRate}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Cost Trends */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Monthly Cost Trends</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">Cost by Service Type</h4>
            <div className="space-y-3">
              {aiCostData.map((service, index) => {
                const percentage = (service.totalCost / totalMonthlyCost) * 100
                return (
                  <div key={service.service}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{service.service}</span>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        ${service.totalCost.toFixed(2)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-green-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                        }`}
                      ></motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">3-Month Trend</h4>
            <div className="space-y-4">
              {monthlyTrends.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{month.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        ${(month.problemStatement + month.compliance + month.rca + month.validation).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {index > 0 ? (
                          <span className="text-green-600 dark:text-green-400">
                            ↑ {(((month.problemStatement + month.compliance + month.rca + month.validation) / 
                            (monthlyTrends[index-1].problemStatement + monthlyTrends[index-1].compliance + 
                             monthlyTrends[index-1].rca + monthlyTrends[index-1].validation) - 1) * 100).toFixed(1)}%
                          </span>
                        ) : (
                          'Baseline'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Management */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Budget Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Monthly Budget</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 text-sm">Allocated:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">$500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 text-sm">Used:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">${totalMonthlyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 text-sm">Remaining:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">${(500 - totalMonthlyCost).toFixed(2)}</span>
              </div>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-3">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(totalMonthlyCost / 500) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {((totalMonthlyCost / 500) * 100).toFixed(1)}% of budget used
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Cost Optimization</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTrendingDown} className="text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Switch RCA to Claude: Save $2.50/month</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTrendingDown} className="text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Batch processing: Save 15%</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Quality improvement ROI: $125/month</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Usage Alerts</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300">Budget on track</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300">High usage detected: RCA service</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-amber-700 dark:text-amber-300">Projected: $6.78 this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICostTrackingPage