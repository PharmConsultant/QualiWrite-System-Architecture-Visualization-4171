import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUsers, FiPlus, FiEdit3, FiTrash2, FiShield, FiCheck, FiX, FiUserCheck, FiUserX } = FiIcons

const UserRoleManagement = ({ settings, onSettingsChange }) => {
  const [showAddUser, setShowAddUser] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [users, setUsers] = useState([
    {
      id: '1',
      fullName: 'John Smith',
      email: 'john.smith@pharma.com',
      role: 'qa_investigator',
      department: 'Quality Assurance',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@pharma.com',
      role: 'capa_manager',
      department: 'Quality Assurance',
      status: 'active',
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      fullName: 'Mike Chen',
      email: 'mike.chen@pharma.com',
      role: 'compliance_officer',
      department: 'Regulatory Affairs',
      status: 'active',
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      fullName: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@pharma.com',
      role: 'line_supervisor',
      department: 'Manufacturing',
      status: 'inactive',
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      fullName: 'David Wilson',
      email: 'david.wilson@pharma.com',
      role: 'qa_manager',
      department: 'Quality Assurance',
      status: 'active',
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    }
  ])

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'qa_investigator',
    department: '',
    status: 'active'
  })

  const roles = [
    {
      id: 'qa_investigator',
      name: 'QA Investigator',
      description: 'Creates and investigates deviations, performs RCA',
      permissions: ['create_deviation', 'investigate', 'rca_analysis', 'view_reports'],
      color: 'blue'
    },
    {
      id: 'capa_manager',
      name: 'CAPA Manager',
      description: 'Manages CAPA actions and effectiveness verification',
      permissions: ['manage_capa', 'effectiveness_check', 'approve_actions', 'view_reports'],
      color: 'green'
    },
    {
      id: 'compliance_officer',
      name: 'Compliance Officer',
      description: 'Oversees compliance, approves reports, system administration',
      permissions: ['system_admin', 'approve_reports', 'audit_trail', 'user_management'],
      color: 'purple'
    },
    {
      id: 'line_supervisor',
      name: 'Line Supervisor',
      description: 'Reports deviations, implements immediate actions',
      permissions: ['create_deviation', 'immediate_actions', 'view_own'],
      color: 'orange'
    },
    {
      id: 'qa_manager',
      name: 'QA Manager',
      description: 'Senior oversight, final approvals, strategic decisions',
      permissions: ['approve_investigations', 'final_approval', 'strategic_reports', 'system_config'],
      color: 'red'
    }
  ]

  const departments = [
    'Quality Assurance',
    'Regulatory Affairs',
    'Manufacturing',
    'Quality Control',
    'Engineering',
    'IT/Systems'
  ]

  const handleAddUser = () => {
    if (newUser.fullName && newUser.email && newUser.role && newUser.department) {
      const user = {
        ...newUser,
        id: Date.now().toString(),
        lastLogin: null,
        createdAt: new Date()
      }
      setUsers(prev => [...prev, user])
      setNewUser({ fullName: '', email: '', role: 'qa_investigator', department: '', status: 'active' })
      setShowAddUser(false)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser({ ...user })
  }

  const handleUpdateUser = () => {
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u))
    setEditingUser(null)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
    }
  }

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const getRoleInfo = (roleId) => {
    return roles.find(r => r.id === roleId) || roles[0]
  }

  const formatLastLogin = (date) => {
    if (!date) return 'Never'
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">User Role Management</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">Manage user accounts and role-based permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add User</span>
        </button>
      </div>

      {/* Role Definitions */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Role Definitions</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((role) => (
            <div key={role.id} className="bg-white dark:bg-slate-600 p-3 rounded-lg border border-slate-200 dark:border-slate-500">
              <div className={`text-sm font-semibold text-${role.color}-700 dark:text-${role.color}-300 mb-1`}>
                {role.name}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {role.description}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {role.permissions.length} permissions
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">User</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Role</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Department</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Last Login</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const roleInfo = getRoleInfo(user.role)
                return (
                  <tr key={user.id} className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-100">{user.fullName}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${roleInfo.color}-100 text-${roleInfo.color}-700 dark:bg-${roleInfo.color}-900/20 dark:text-${roleInfo.color}-300`}>
                        {roleInfo.name}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{user.department}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm ${user.status === 'active' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatLastLogin(user.lastLogin)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1"
                          title="Edit User"
                        >
                          <SafeIcon icon={FiEdit3} className="text-sm" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1 ${user.status === 'active' ? 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200' : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200'}`}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <SafeIcon icon={user.status === 'active' ? FiUserX : FiUserCheck} className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 p-1"
                          title="Delete User"
                        >
                          <SafeIcon icon={FiTrash2} className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Department</label>
                <select
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select department...</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <SafeIcon icon={FiCheck} />
                <span>Add User</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Department</label>
                <select
                  value={editingUser.department}
                  onChange={(e) => setEditingUser(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <SafeIcon icon={FiCheck} />
                <span>Update User</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default UserRoleManagement