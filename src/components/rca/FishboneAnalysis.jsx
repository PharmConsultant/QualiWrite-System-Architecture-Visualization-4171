import React from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiSettings, FiUsers, FiTool, FiFileText, FiTrendingUp, FiDroplet } = FiIcons

const FishboneAnalysis = () => {
  const categories = [
    {
      name: 'Equipment',
      icon: FiSettings,
      causes: ['Pressure sensor drift', 'Calibration overdue', 'Worn tooling'],
      position: 'top',
      color: 'text-blue-600'
    },
    {
      name: 'Method',
      icon: FiFileText,
      causes: ['SOP outdated', 'Process parameters', 'Validation gaps'],
      position: 'top',
      color: 'text-green-600'
    },
    {
      name: 'Materials',
      icon: FiDroplet,
      causes: ['API variability', 'Excipient quality', 'Raw material COA'],
      position: 'top',
      color: 'text-purple-600'
    },
    {
      name: 'People',
      icon: FiUsers,
      causes: ['Training gaps', 'Shift changes', 'Experience level'],
      position: 'bottom',
      color: 'text-orange-600'
    },
    {
      name: 'Environment',
      icon: FiTrendingUp,
      causes: ['Temperature variation', 'Humidity changes', 'Facility conditions'],
      position: 'bottom',
      color: 'text-red-600'
    },
    {
      name: 'Measurement',
      icon: FiTool,
      causes: ['Instrument accuracy', 'Testing frequency', 'Sample handling'],
      position: 'bottom',
      color: 'text-teal-600'
    }
  ]

  return (
    <div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-6">Fishbone Diagram - Cause & Effect Analysis</h3>
      
      <div className="relative bg-slate-50 dark:bg-slate-800 rounded-lg p-8 min-h-[500px] overflow-hidden">
        {/* Problem Box - Fish Head */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className="bg-red-100 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 text-center shadow-lg">
            <div className="font-bold text-red-800 dark:text-red-200 text-lg">Tablet Hardness</div>
            <div className="font-bold text-red-800 dark:text-red-200 text-lg">Below Spec</div>
          </div>
        </div>

        {/* Main Spine - Fish Backbone */}
        <div className="absolute top-1/2 left-8 right-32 h-1 bg-slate-600 dark:bg-slate-300 transform -translate-y-0.5">
          {/* Arrow head */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
            <div className="w-0 h-0 border-l-4 border-l-slate-600 dark:border-l-slate-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="absolute top-8 left-8 right-40 grid grid-cols-3 gap-8">
          {categories.filter(cat => cat.position === 'top').map((category, index) => (
            <div key={category.name} className="relative">
              {/* Category Box */}
              <div className="bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <SafeIcon icon={category.icon} className={`text-xl ${category.color}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{category.name}</span>
                </div>
                <div className="space-y-2">
                  {category.causes.map((cause, idx) => (
                    <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-600 px-2 py-1 rounded">
                      {cause}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Diagonal bone line to main spine */}
              <svg className="absolute top-full left-1/2 transform -translate-x-1/2" width="2" height="80">
                <line x1="1" y1="0" x2="1" y2="60" stroke="#64748b" strokeWidth="2" className="dark:stroke-slate-300"/>
                <line x1="1" y1="60" x2="20" y2="80" stroke="#64748b" strokeWidth="2" className="dark:stroke-slate-300"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom Categories */}
        <div className="absolute bottom-8 left-8 right-40 grid grid-cols-3 gap-8">
          {categories.filter(cat => cat.position === 'bottom').map((category, index) => (
            <div key={category.name} className="relative">
              {/* Diagonal bone line from main spine */}
              <svg className="absolute bottom-full left-1/2 transform -translate-x-1/2" width="2" height="80">
                <line x1="1" y1="20" x2="20" y2="0" stroke="#64748b" strokeWidth="2" className="dark:stroke-slate-300"/>
                <line x1="1" y1="20" x2="1" y2="80" stroke="#64748b" strokeWidth="2" className="dark:stroke-slate-300"/>
              </svg>
              
              {/* Category Box */}
              <div className="bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <SafeIcon icon={category.icon} className={`text-xl ${category.color}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{category.name}</span>
                </div>
                <div className="space-y-2">
                  {category.causes.map((cause, idx) => (
                    <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-600 px-2 py-1 rounded">
                      {cause}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FishboneAnalysis