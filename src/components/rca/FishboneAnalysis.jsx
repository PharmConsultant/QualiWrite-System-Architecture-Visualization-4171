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
      position: 'top'
    },
    {
      name: 'Method',
      icon: FiFileText,
      causes: ['SOP outdated', 'Process parameters', 'Validation gaps'],
      position: 'top'
    },
    {
      name: 'Materials',
      icon: FiDroplet,
      causes: ['API variability', 'Excipient quality', 'Raw material COA'],
      position: 'top'
    },
    {
      name: 'People',
      icon: FiUsers,
      causes: ['Training gaps', 'Shift changes', 'Experience level'],
      position: 'bottom'
    },
    {
      name: 'Environment',
      icon: FiTrendingUp,
      causes: ['Temperature variation', 'Humidity changes', 'Facility conditions'],
      position: 'bottom'
    },
    {
      name: 'Measurement',
      icon: FiTool,
      causes: ['Instrument accuracy', 'Testing frequency', 'Sample handling'],
      position: 'bottom'
    }
  ]

  return (
    <div>
      <h3 className="font-semibold text-slate-800 mb-4">Fishbone Diagram - Cause & Effect Analysis</h3>
      
      <div className="relative bg-slate-50 rounded-lg p-8 min-h-[400px]">
        {/* Central Problem */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-100 border border-red-300 rounded-lg p-4 text-center">
          <div className="font-semibold text-red-800">Tablet Hardness</div>
          <div className="font-semibold text-red-800">Below Spec</div>
        </div>
        
        {/* Main spine */}
        <div className="absolute top-1/2 left-4 right-24 h-0.5 bg-slate-400 transform -translate-y-1/2"></div>
        
        {/* Categories */}
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Top row */}
          <div className="space-y-4">
            {categories.filter(cat => cat.position === 'top').slice(0, 1).map((category) => (
              <div key={category.name} className="relative">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={category.icon} className="text-blue-600" />
                    <span className="font-medium text-slate-800">{category.name}</span>
                  </div>
                  <div className="space-y-1">
                    {category.causes.map((cause, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        {cause}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bone line to spine */}
                <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-slate-300 transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {categories.filter(cat => cat.position === 'top').slice(1, 2).map((category) => (
              <div key={category.name} className="relative">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={category.icon} className="text-green-600" />
                    <span className="font-medium text-slate-800">{category.name}</span>
                  </div>
                  <div className="space-y-1">
                    {category.causes.map((cause, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        {cause}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-slate-300 transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {categories.filter(cat => cat.position === 'top').slice(2, 3).map((category) => (
              <div key={category.name} className="relative">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={category.icon} className="text-purple-600" />
                    <span className="font-medium text-slate-800">{category.name}</span>
                  </div>
                  <div className="space-y-1">
                    {category.causes.map((cause, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        {cause}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-slate-300 transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom categories */}
        <div className="absolute bottom-4 left-4 right-24 grid grid-cols-3 gap-4">
          {categories.filter(cat => cat.position === 'bottom').map((category) => (
            <div key={category.name} className="relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-slate-300 transform -translate-x-1/2 -translate-y-8"></div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={category.icon} className="text-orange-600" />
                  <span className="font-medium text-slate-800">{category.name}</span>
                </div>
                <div className="space-y-1">
                  {category.causes.map((cause, idx) => (
                    <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
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