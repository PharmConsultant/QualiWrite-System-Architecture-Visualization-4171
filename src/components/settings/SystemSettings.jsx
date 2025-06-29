import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'
import UserRoleManagement from './UserRoleManagement'

const { FiSettings, FiSave, FiX, FiMoon, FiSun, FiGlobe, FiBell, FiShield, FiDatabase, FiCpu, FiUsers, FiClock, FiLock, FiServer, FiMonitor } = FiIcons

const SystemSettings = ({ isOpen, onClose, user }) => {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('general')
  
  // All hooks MUST be called before any early returns
  const [settings, setSettings] = useState({
    // General System Settings
    companyName: 'Pharma Corp',
    systemVersion: '2.1.0',
    timezone: 'UTC-05:00',
    dateFormat: 'MM/DD/YYYY',
    language: 'en-US',
    maintenanceMode: false,

    // Enhanced Deviation Analytics Settings
    deviationTargets: {
      targetDaysToClose: 30,
      criticalEscalationDays: 7,
      majorEscalationDays: 14,
      minorEscalationDays: 21,
      capaEffectivenessCheckDays: 90,
      autoEscalationEnabled: true
    },

    // Manufacturing Shifts Configuration
    shifts: {
      day: {
        name: 'Day Shift',
        start: '06:00',
        end: '14:00',
        enabled: true
      },
      evening: {
        name: 'Evening Shift',
        start: '14:00',
        end: '22:00',
        enabled: true
      },
      night: {
        name: 'Night Shift',
        start: '22:00',
        end: '06:00',
        enabled: true
      }
    },

    // AI Provider Configuration
    aiProviders: {
      problemStatement: 'chatgpt-4-mini',
      complianceCheck: 'claude-sonnet-4',
      rootCauseAnalysis: 'chatgpt-4',
      rcaValidation: 'perplexity',
      monthlyBudget: 500,
      usageAlerts: true
    },

    // Integration Settings
    integrations: {
      limsEnabled: false,
      limsEndpoint: '',
      erpEnabled: false,
      erpEndpoint: '',
      emailNotifications: true,
      smsNotifications: false,
      webhookUrl: ''
    },

    // Security & Compliance
    security: {
      sessionTimeout: 30,
      passwordComplexity: 'high',
      twoFactorRequired: true,
      auditRetention: 7,
      signatureRequired: true,
      autoBackup: true,
      encryptionLevel: 'AES-256',
      accessLogging: true
    },

    // System Performance
    performance: {
      maxConcurrentUsers: 100,
      databaseBackupFrequency: 'daily',
      cacheExpiry: 3600,
      fileStorageLimit: '10GB',
      apiRateLimit: 1000
    }
  })

  // Check if user is system administrator - AFTER all hooks
  const isSystemAdmin = user?.role === 'system_admin' || user?.role === 'compliance_officer'

  const tabs = [
    { id: 'general', name: 'General', icon: FiGlobe },
    { id: 'analytics', name: 'Analytics', icon: FiClock },
    { id: 'users', name: 'User Management', icon: FiUsers },
    { id: 'integrations', name: 'Integrations', icon: FiDatabase },
    { id: 'ai', name: 'AI Configuration', icon: FiCpu },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'performance', name: 'Performance', icon: FiServer }
  ]

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleDeviationTargetChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      deviationTargets: {
        ...prev.deviationTargets,
        [key]: parseInt(value) || 0
      }
    }))
  }

  const handleShiftChange = (shiftId, field, value) => {
    setSettings(prev => ({
      ...prev,
      shifts: {
        ...prev.shifts,
        [shiftId]: {
          ...prev.shifts[shiftId],
          [field]: value
        }
      }
    }))
  }

  const handleSave = () => {
    console.log('Saving system settings:', settings)
    // API call to save settings
    onClose()
  }

  // Early return AFTER all hooks have been called
  if (!isSystemAdmin) {
    return null
  }

  if (!isOpen) {
    return null
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">System Administration</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">Configure global system settings and organizational preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">System Version</label>
                <input
                  type="text"
                  value={settings.systemVersion}
                  disabled
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
                  <option value="UTC-06:00">Central Time (UTC-06:00)</option>
                  <option value="UTC-07:00">Mountain Time (UTC-07:00)</option>
                  <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date Format</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enable Maintenance Mode</span>
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Temporarily restrict system access for updates</p>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Deviation Analytics Configuration</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">Configure target timelines and escalation thresholds</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Target Days to Close (Overall)
                </label>
                <input
                  type="number"
                  value={settings.deviationTargets.targetDaysToClose}
                  onChange={(e) => handleDeviationTargetChange('targetDaysToClose', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  min="1"
                  max="365"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used for % Closed on Target calculation</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  CAPA Effectiveness Check (Days)
                </label>
                <input
                  type="number"
                  value={settings.deviationTargets.capaEffectivenessCheckDays}
                  onChange={(e) => handleDeviationTargetChange('capaEffectivenessCheckDays', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  min="30"
                  max="365"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Follow-up verification timeline</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">Escalation Thresholds by Severity</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                    Critical Escalation (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.deviationTargets.criticalEscalationDays}
                    onChange={(e) => handleDeviationTargetChange('criticalEscalationDays', e.target.value)}
                    className="w-full p-3 border border-red-300 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 text-slate-900 dark:text-slate-100"
                    min="1"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                    Major Escalation (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.deviationTargets.majorEscalationDays}
                    onChange={(e) => handleDeviationTargetChange('majorEscalationDays', e.target.value)}
                    className="w-full p-3 border border-amber-300 dark:border-amber-600 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-slate-900 dark:text-slate-100"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Minor Escalation (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.deviationTargets.minorEscalationDays}
                    onChange={(e) => handleDeviationTargetChange('minorEscalationDays', e.target.value)}
                    className="w-full p-3 border border-green-300 dark:border-green-600 rounded-lg bg-green-50 dark:bg-green-900/20 text-slate-900 dark:text-slate-100"
                    min="1"
                    max="90"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.deviationTargets.autoEscalationEnabled}
                  onChange={(e) => handleDeviationTargetChange('autoEscalationEnabled', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enable Automatic Escalation</span>
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Automatically notify managers when thresholds are exceeded</p>
            </div>
          </div>
        )

      case 'users':
        return <UserRoleManagement settings={settings} onSettingsChange={setSettings} />

      case 'integrations':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">External System Integrations</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Configure connections to LIMS, ERP, and other enterprise systems</p>
            </div>

            <div className="space-y-6">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-slate-800 dark:text-slate-100">LIMS Integration</h5>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.limsEnabled}
                      onChange={(e) => handleSettingChange('integrations', 'limsEnabled', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Enable</span>
                  </label>
                </div>
                {settings.integrations.limsEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">LIMS API Endpoint</label>
                    <input
                      type="url"
                      value={settings.integrations.limsEndpoint}
                      onChange={(e) => handleSettingChange('integrations', 'limsEndpoint', e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      placeholder="https://lims.company.com/api/v1"
                    />
                  </div>
                )}
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-slate-800 dark:text-slate-100">ERP Integration</h5>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.erpEnabled}
                      onChange={(e) => handleSettingChange('integrations', 'erpEnabled', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Enable</span>
                  </label>
                </div>
                {settings.integrations.erpEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ERP API Endpoint</label>
                    <input
                      type="url"
                      value={settings.integrations.erpEndpoint}
                      onChange={(e) => handleSettingChange('integrations', 'erpEndpoint', e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      placeholder="https://erp.company.com/api"
                    />
                  </div>
                )}
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-4">Notification Settings</h5>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.emailNotifications}
                      onChange={(e) => handleSettingChange('integrations', 'emailNotifications', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Email Notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.smsNotifications}
                      onChange={(e) => handleSettingChange('integrations', 'smsNotifications', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">SMS Notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 'ai':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">AI Provider Configuration</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Configure AI services for different analysis tasks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monthly Budget (USD)</label>
                <input
                  type="number"
                  value={settings.aiProviders.monthlyBudget}
                  onChange={(e) => handleSettingChange('aiProviders', 'monthlyBudget', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  min="0"
                />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  checked={settings.aiProviders.usageAlerts}
                  onChange={(e) => handleSettingChange('aiProviders', 'usageAlerts', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enable Usage Alerts</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Problem Statement Generation</label>
                <select
                  value={settings.aiProviders.problemStatement}
                  onChange={(e) => handleSettingChange('aiProviders', 'problemStatement', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="chatgpt-4-mini">ChatGPT 4 Mini ($0.003/use)</option>
                  <option value="claude-sonnet-4">Claude Sonnet 4 ($0.008/use)</option>
                  <option value="perplexity">Perplexity ($0.012/use)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Compliance Check</label>
                <select
                  value={settings.aiProviders.complianceCheck}
                  onChange={(e) => handleSettingChange('aiProviders', 'complianceCheck', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="claude-sonnet-4">Claude Sonnet 4 ($0.008/use)</option>
                  <option value="chatgpt-4">ChatGPT 4 ($0.045/use)</option>
                  <option value="perplexity">Perplexity ($0.012/use)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Root Cause Analysis</label>
                <select
                  value={settings.aiProviders.rootCauseAnalysis}
                  onChange={(e) => handleSettingChange('aiProviders', 'rootCauseAnalysis', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="chatgpt-4">ChatGPT 4 ($0.045/use)</option>
                  <option value="claude-sonnet-4">Claude Sonnet 4 ($0.008/use)</option>
                  <option value="perplexity">Perplexity ($0.012/use)</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Security & Compliance Settings</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">Configure security policies and compliance requirements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password Complexity</label>
                <select
                  value={settings.security.passwordComplexity}
                  onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorRequired}
                  onChange={(e) => handleSettingChange('security', 'twoFactorRequired', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Require Two-Factor Authentication</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.signatureRequired}
                  onChange={(e) => handleSettingChange('security', 'signatureRequired', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Require Electronic Signatures</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.accessLogging}
                  onChange={(e) => handleSettingChange('security', 'accessLogging', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enable Access Logging</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.security.autoBackup}
                  onChange={(e) => handleSettingChange('security', 'autoBackup', e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Enable Automatic Backups</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Audit Retention (years)</label>
              <input
                type="number"
                value={settings.security.auditRetention}
                onChange={(e) => handleSettingChange('security', 'auditRetention', parseInt(e.target.value))}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                min="1"
                max="20"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Regulatory requirement for audit trail retention</p>
            </div>
          </div>
        )

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">System Performance Settings</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">Configure system limits and performance parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Max Concurrent Users</label>
                <input
                  type="number"
                  value={settings.performance.maxConcurrentUsers}
                  onChange={(e) => handleSettingChange('performance', 'maxConcurrentUsers', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Database Backup Frequency</label>
                <select
                  value={settings.performance.databaseBackupFrequency}
                  onChange={(e) => handleSettingChange('performance', 'databaseBackupFrequency', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cache Expiry (seconds)</label>
                <input
                  type="number"
                  value={settings.performance.cacheExpiry}
                  onChange={(e) => handleSettingChange('performance', 'cacheExpiry', parseInt(e.target.value))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">File Storage Limit</label>
                <input
                  type="text"
                  value={settings.performance.fileStorageLimit}
                  onChange={(e) => handleSettingChange('performance', 'fileStorageLimit', e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="10GB"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">API Rate Limit (requests/hour)</label>
              <input
                type="number"
                value={settings.performance.apiRateLimit}
                onChange={(e) => handleSettingChange('performance', 'apiRateLimit', parseInt(e.target.value))}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">System Status</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-600">99.9%</div>
                  <div className="text-slate-600 dark:text-slate-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">2.1s</div>
                  <div className="text-slate-600 dark:text-slate-400">Response</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">156</div>
                  <div className="text-slate-600 dark:text-slate-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-600">4.2GB</div>
                  <div className="text-slate-600 dark:text-slate-400">Storage Used</div>
                </div>
              </div>
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
              <SafeIcon icon={FiLock} className="text-2xl text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">System Settings</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Administrator Only</p>
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

export default SystemSettings