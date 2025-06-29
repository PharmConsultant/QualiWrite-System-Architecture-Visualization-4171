import React from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiBarChart3 } = FiIcons

const DeviationChart = ({ deviations }) => {
  const severityCounts = deviations.reduce((acc, dev) => {
    acc[dev.severity] = (acc[dev.severity] || 0) + 1
    return acc
  }, {})

  const chartData = [
    { name: 'Critical', count: severityCounts.critical || 0, color: 'bg-red-500', bgColor: 'bg-red-50' },
    { name: 'Major', count: severityCounts.major || 0, color: 'bg-amber-500', bgColor: 'bg-amber-50' },
    { name: 'Minor', count: severityCounts.minor || 0, color: 'bg-green-500', bgColor: 'bg-green-50' }
  ]

  const maxCount = Math.max(...chartData.map(d => d.count), 1)

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiBarChart3} className="text-slate-600" />
        <h3 className="font-semibold text-slate-800">Deviations by Severity (ICH Q9)</h3>
      </div>
      
      <div className="space-y-4">
        {chartData.map((item) => (
          <div key={item.name} className={`p-4 rounded-lg ${item.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-800">{item.name}</span>
              <span className="text-2xl font-bold text-slate-800">{item.count}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {item.name === 'Critical' ? 'Requires system CAPA' :
               item.name === 'Major' ? 'SOP updates needed' :
               'Training validation required'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeviationChart