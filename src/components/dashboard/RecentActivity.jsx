import React from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiActivity, FiArrowRight } = FiIcons

const RecentActivity = ({ deviations }) => {
  const recentDeviations = deviations
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-gray-100 text-gray-700',
      'investigation': 'bg-blue-100 text-blue-700',
      'rca_progress': 'bg-purple-100 text-purple-700',
      'capa_planning': 'bg-yellow-100 text-yellow-700',
      'effectiveness_check': 'bg-orange-100 text-orange-700',
      'closed': 'bg-green-100 text-green-700'
    }
    return colors[status] || colors.open
  }

  const getStatusLabel = (status) => {
    const labels = {
      'open': 'Open',
      'investigation': 'Investigation',
      'rca_progress': 'RCA in Progress',
      'capa_planning': 'CAPA Planning',
      'effectiveness_check': 'Effectiveness Check',
      'closed': 'Closed'
    }
    return labels[status] || status
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiActivity} className="text-slate-600" />
        <h3 className="font-semibold text-slate-800">Recent Deviation Activity</h3>
      </div>
      
      <div className="space-y-3">
        {recentDeviations.map((deviation) => (
          <div key={deviation.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-sm font-medium text-slate-800">{deviation.deviation_id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deviation.status)}`}>
                  {getStatusLabel(deviation.status)}
                </span>
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {deviation.batch_number} • {deviation.equipment_id}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {deviation.days_open} days open
              </div>
            </div>
            <SafeIcon icon={FiArrowRight} className="text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity