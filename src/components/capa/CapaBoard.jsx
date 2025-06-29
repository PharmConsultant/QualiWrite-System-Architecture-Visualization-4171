import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useData } from '../../hooks/useData'
import CapaForm from './CapaForm'

const { FiPlus, FiUser, FiCalendar, FiAlertTriangle } = FiIcons

const CapaBoard = () => {
  const { capaActions, loading, createCapaAction, updateCapaAction } = useData()
  const [showForm, setShowForm] = useState(false)

  const statuses = [
    { id: 'open', name: 'Open', color: 'bg-gray-50 border-gray-200' },
    { id: 'in_progress', name: 'In Progress', color: 'bg-blue-50 border-blue-200' },
    { id: 'effectiveness_check', name: 'Effectiveness Check', color: 'bg-orange-50 border-orange-200' },
    { id: 'closed_verified', name: 'Closed/Verified', color: 'bg-green-50 border-green-200' }
  ]

  const getActionsByStatus = (status) => {
    return capaActions.filter(action => action.status === status)
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  const handleCreateCapa = async (capaData) => {
    await createCapaAction(capaData)
    setShowForm(false)
  }

  const handleMoveAction = async (actionId, newStatus) => {
    await updateCapaAction(actionId, { status: newStatus })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">CAPA Kanban Board</h1>
          <p className="text-slate-600">Track corrective and preventive actions with effectiveness verification</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <SafeIcon icon={FiPlus} />
          <span>New CAPA</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {statuses.map((status) => {
          const actions = getActionsByStatus(status.id)
          return (
            <div key={status.id} className="bg-white rounded-xl border border-slate-200">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">{status.name}</h3>
                <span className="text-sm text-slate-500">
                  {actions.length} item{actions.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="p-4 space-y-3 min-h-[500px]">
                {actions.map((action) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${status.color}`}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('actionId', action.id)}
                  >
                    <div className="mb-2">
                      <p className="text-sm font-medium text-slate-800">{action.capa_id}</p>
                      <p className="text-xs text-slate-600 mt-1">{action.title}</p>
                    </div>
                    
                    <div className="text-xs text-slate-500 mb-2">
                      {action.description.substring(0, 80)}...
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="text-slate-400 text-xs" />
                        <span className={`text-xs ${isOverdue(action.due_date) ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                          Due: {new Date(action.due_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiUser} className="text-slate-400 text-xs" />
                        <span className="text-xs text-slate-500">{action.owner}</span>
                      </div>
                    </div>
                    
                    {isOverdue(action.due_date) && status.id !== 'closed_verified' && (
                      <div className="mt-2 flex items-center space-x-1 text-xs text-red-600">
                        <SafeIcon icon={FiAlertTriangle} />
                        <span>Overdue</span>
                      </div>
                    )}
                    
                    {status.id === 'effectiveness_check' && (
                      <div className="mt-2 text-xs">
                        <div className="bg-amber-50 border border-amber-200 p-2 rounded text-amber-700">
                          Follow-up verification required per SISPQ
                        </div>
                      </div>
                    )}

                    {/* Quick action buttons */}
                    <div className="mt-3 flex space-x-1">
                      {status.id === 'open' && (
                        <button
                          onClick={() => handleMoveAction(action.id, 'in_progress')}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          Start
                        </button>
                      )}
                      {status.id === 'in_progress' && (
                        <button
                          onClick={() => handleMoveAction(action.id, 'effectiveness_check')}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
                        >
                          Review
                        </button>
                      )}
                      {status.id === 'effectiveness_check' && (
                        <button
                          onClick={() => handleMoveAction(action.id, 'closed_verified')}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Drop zone */}
                <div
                  className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-500 text-sm opacity-0 hover:opacity-100 transition-opacity"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const actionId = e.dataTransfer.getData('actionId')
                    if (actionId) {
                      handleMoveAction(actionId, status.id)
                    }
                  }}
                >
                  Drop CAPA here
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CAPA Form */}
      {showForm && (
        <CapaForm
          onSubmit={handleCreateCapa}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default CapaBoard