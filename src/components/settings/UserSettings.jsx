import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

const { 
  FiUser, FiSave, FiX, FiMoon, FiSun, FiBell, FiLock, FiMail, FiPhone, 
  FiShield, FiSettings, FiEye, FiKey, FiCheckCircle 
} = FiIcons

const UserSettings = ({ isOpen, onClose, user }) => {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')

  const [userSettings, setUserSettings] = useState({
    personal: {
      fullName: user?.full_name || 'Demo User',
      email: user?.email || 'demo@qualiwrite.com',
      phone: '+1 (555) 123-4567',
      department: 'Quality Assurance',
      title: 'QA Investigator',
      employeeId: 'EMP-001',
      manager: 'Sarah Johnson',
      startDate: '2023-01-15'
    },
    preferences: {
      theme: isDarkMode ? 'dark' : 'light',
      language: 'en-US',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      dashboardLayout: 'default',
      notifications: {
        email: true,
        desktop: true,
        deviationAlerts: true,
        capaReminders: true,
        reportGeneration: false,
        escalationAlerts: true,
        weeklyDigest: true
      }
    },
    security: {
      changePassword: false,
      twoFactorEnabled: true,
      sessionNotifications: true,
      lastPasswordChange: '2024-11-15',
      activeSessions: 2,
      securityQuestions: true
    },
    permissions: {
      role: user?.role || 'qa_investigator',
      modules: {
        deviations: {
          read: true,
          write: true,
          delete: false
        },
        investigations: {
          read: true,
          write: true,
          delete: false
        },
        rca: {
          read: true,
          write: true,
          delete: false
        },
        capa: {
          read: true,
          write: true,
          delete: false
        },
        reports: {
          read: true,
          write: false,
          delete: false
        },
        analytics: {
          read: true,
          write: false,
          delete: false
        },
        settings: {
          read: false,
          write: false,
          delete: false
        }
      }
    }
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'preferences', name: 'Preferences', icon: FiSettings },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'security', name: 'Security', icon: FiLock },
    { id: 'permissions', name: 'Permissions', icon: FiShield }
  ]

  const rolePermissions = {
    qa_investigator: {
      name: 'QA Investigator',
      description: 'Creates and investigates deviations, performs RCA',
      color: 'blue'
    },
    capa_manager: {
      name: 'CAPA Manager',
      description: 'Manages CAPA actions and effectiveness verification',
      color: 'green'
    },
    compliance_officer: {
      name: 'Compliance Officer',
      description: 'Oversees compliance, approves reports, system administration',
      color: 'purple'
    },
    line_supervisor: {
      name: 'Line Supervisor',
      description: 'Reports deviations, implements immediate actions',
      color: 'orange'
    },
    qa_manager: {
      name: 'QA Manager',
      description: 'Senior oversight, final approvals, strategic decisions',
      color: 'red'
    },
    system_admin: {
      name: 'System Administrator',
      description: 'Full system access, user management, system configuration',
      color: 'slate'
    }
  }

  const handlePersonalChange = (key, value) => {
    setUserSettings(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [key]: value
      }
    }))
  }

  const handlePreferenceChange = (key, value) => {
    setUserSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  const handleNotificationChange = (key, value) => {
    setUserSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [key]: value
        }
      }
    }))
  }

  const handleSecurityChange = (key, value) => {
    setUserSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    console.log('Saving user settings:', userSettings)
    onClose()
  }

  if (!isOpen) return null

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Personal Information</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">Update your personal details and contact information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userSettings.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={userSettings.personal.employeeId}
                  disabled
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userSettings.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={userSettings.personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Department</label>
                <input
                  type="text"
                  value={userSettings.personal.department}
                  disabled
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                <input
                  type="text"
                  value={userSettings.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Manager</label>
                <input
                  type="text"
                  value={userSettings.personal.manager}
                  disabled
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
                <input
                  type="date"
                  value={userSettings.personal.startDate}
                  disabled
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>
            </div>
          </div>
        )

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Application Preferences</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Customize your application experience and display settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Theme</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleDarkMode}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-slate-100' 
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <SafeIcon icon={isDarkMode ? FiMoon : FiSun} />
                    <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Language</label>
                <select
                  value={userSettings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timezone</label>
                <select
                  value={userSettings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date Format</label>
                <select
                  value={userSettings.preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time Format</label>
                <select
                  value={userSettings.preferences.timeFormat}
                  onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="12h">12 Hour (AM/PM)</option>
                  <option value="24h">24 Hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dashboard Layout</label>
                <select
                  value={userSettings.preferences.dashboardLayout}
                  onChange={(e) => handlePreferenceChange('dashboardLayout', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="default">Default</option>
                  <option value="compact">Compact</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Notification Preferences</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm">Control how and when you receive notifications</p>
            </div>

            <div className="space-y-6">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Delivery Methods</h5>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Email Notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.desktop}
                      onChange={(e) => handleNotificationChange('desktop', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Desktop Notifications</span>
                  </label>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Notification Types</h5>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.deviationAlerts}
                      onChange={(e) => handleNotificationChange('deviationAlerts', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Deviation Alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.capaReminders}
                      onChange={(e) => handleNotificationChange('capaReminders', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">CAPA Reminders</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.escalationAlerts}
                      onChange={(e) => handleNotificationChange('escalationAlerts', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Escalation Alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.reportGeneration}
                      onChange={(e) => handleNotificationChange('reportGeneration', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Report Generation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userSettings.preferences.notifications.weeklyDigest}
                      onChange={(e) => handleNotificationChange('weeklyDigest', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Weekly Digest</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Security Settings</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">Manage your account security and authentication settings</p>
            </div>

            <div className="space-y-6">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Password & Authentication</h5>
                <div className="space-y-4">
                  <button className="w-full text-left p-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiKey} className="text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Change Password</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Last changed: {userSettings.security.lastPasswordChange}</p>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center justify-between p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiShield} className="text-green-600" />
                      <div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Two-Factor Authentication</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Extra security for your account</p>
                      </div>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={userSettings.security.twoFactorEnabled}
                        onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                      <span className="text-sm text-green-600">Enabled</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiBell} className="text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Login Notifications</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Get notified of new login attempts</p>
                      </div>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={userSettings.security.sessionNotifications}
                        onChange={(e) => handleSecurityChange('sessionNotifications', e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Active Sessions</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Current Session</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Chrome on Windows • Active now</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Mobile Session</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Safari on iPhone • 2 hours ago</div>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-800">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Role & Permissions</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">View your current role and module permissions</p>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Current Role</h5>
              <div className={`p-4 rounded-lg bg-${rolePermissions[userSettings.permissions.role]?.color}-50 dark:bg-${rolePermissions[userSettings.permissions.role]?.color}-900/20 border border-${rolePermissions[userSettings.permissions.role]?.color}-200 dark:border-${rolePermissions[userSettings.permissions.role]?.color}-800`}>
                <div className="flex items-center space-x-3 mb-2">
                  <SafeIcon icon={FiShield} className={`text-${rolePermissions[userSettings.permissions.role]?.color}-600`} />
                  <span className={`font-semibold text-${rolePermissions[userSettings.permissions.role]?.color}-800 dark:text-${rolePermissions[userSettings.permissions.role]?.color}-200`}>
                    {rolePermissions[userSettings.permissions.role]?.name}
                  </span>
                </div>
                <p className={`text-${rolePermissions[userSettings.permissions.role]?.color}-700 dark:text-${rolePermissions[userSettings.permissions.role]?.color}-300 text-sm`}>
                  {rolePermissions[userSettings.permissions.role]?.description}
                </p>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Module Permissions</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                      <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Module</th>
                      <th className="text-center p-3 font-medium text-slate-700 dark:text-slate-300">Read</th>
                      <th className="text-center p-3 font-medium text-slate-700 dark:text-slate-300">Write</th>
                      <th className="text-center p-3 font-medium text-slate-700 dark:text-slate-300">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(userSettings.permissions.modules).map(([module, perms]) => (
                      <tr key={module} className="border-b border-slate-200 dark:border-slate-600">
                        <td className="p-3 font-medium text-slate-800 dark:text-slate-100 capitalize">
                          {module.replace('_', ' ')}
                        </td>
                        <td className="p-3 text-center">
                          <SafeIcon 
                            icon={perms.read ? FiCheckCircle : FiX} 
                            className={perms.read ? 'text-green-500' : 'text-red-500'} 
                          />
                        </td>
                        <td className="p-3 text-center">
                          <SafeIcon 
                            icon={perms.write ? FiCheckCircle : FiX} 
                            className={perms.write ? 'text-green-500' : 'text-red-500'} 
                          />
                        </td>
                        <td className="p-3 text-center">
                          <SafeIcon 
                            icon={perms.delete ? FiCheckCircle : FiX} 
                            className={perms.delete ? 'text-green-500' : 'text-red-500'} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Note:</strong> Permissions are managed by system administrators. Contact your manager or IT support if you need additional access.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex"
      >
        {/* Sidebar Tabs */}
        <div className="w-64 bg-slate-50 dark:bg-slate-700 border-r border-slate-200 dark:border-slate-600">
          <div className="p-6 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiUser} className="text-2xl text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">User Settings</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user?.full_name}</p>
          </div>
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <SafeIcon icon={tab.icon} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UserSettings