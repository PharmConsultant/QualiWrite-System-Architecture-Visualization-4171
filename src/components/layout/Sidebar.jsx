import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'
import SystemSettings from '../settings/SystemSettings'
import UserSettings from '../settings/UserSettings'

const { FiHome, FiAlertCircle, FiCpu, FiTarget, FiFileText, FiBarChart3, FiSearch, FiSettings, FiUser, FiLogOut, FiChevronLeft, FiChevronRight, FiMoon, FiSun, FiCalendar, FiFolder, FiTrendingUp, FiDollarSign } = FiIcons

const Sidebar = ({ user, onLogout, collapsed, onToggleCollapse }) => {
  const location = useLocation()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [showSystemSettings, setShowSystemSettings] = useState(false)
  const [showUserSettings, setShowUserSettings] = useState(false)

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', id: 'dashboard' },
    { path: '/deviations', icon: FiAlertCircle, label: 'Deviations', id: 'deviations' },
    { path: '/investigations', icon: FiSearch, label: 'Investigations', id: 'investigations' },
    { path: '/rca', icon: FiCpu, label: 'RCA Analysis', id: 'rca' },
    { path: '/capa', icon: FiTarget, label: 'CAPA Board', id: 'capa' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendar', id: 'calendar' },
    { path: '/files', icon: FiFolder, label: 'Files', id: 'files' },
    { path: '/reports', icon: FiFileText, label: 'Reports', id: 'reports' },
    { path: '/analytics', icon: FiBarChart3, label: 'AI Analytics', id: 'analytics' },
    { path: '/deviation-analytics', icon: FiTrendingUp, label: 'Deviation Analytics', id: 'deviation-analytics' },
    { path: '/ai-cost-tracking', icon: FiDollarSign, label: 'AI Cost Tracking', id: 'ai-cost-tracking' }
  ]

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-30 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiTarget} className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">QualiWrite™</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">FDA Compliant</p>
                </div>
              </motion.div>
            )}
            {collapsed && (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                <SafeIcon icon={FiTarget} className="text-white text-xl" />
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <SafeIcon icon={collapsed ? FiChevronRight : FiChevronLeft} className="text-slate-400 dark:text-slate-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.id} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <SafeIcon
                    icon={item.icon}
                    className={`text-lg ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Theme Toggle & User Profile */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          {/* Theme Toggle */}
          {!collapsed && (
            <div className="mb-4">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="text-lg text-slate-500 dark:text-slate-400" />
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          )}

          {collapsed && (
            <div className="mb-4">
              <button
                onClick={toggleDarkMode}
                className="w-full p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="text-slate-400 dark:text-slate-500" />
              </button>
            </div>
          )}

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                    {user?.full_name || 'Demo User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">
                    {user?.role?.replace('_', ' ') || 'QA Investigator'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowUserSettings(true)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="text-xs" />
                  <span className="text-slate-600 dark:text-slate-300">Profile</span>
                </button>
                <button
                  onClick={() => setShowSystemSettings(true)}
                  className="flex items-center justify-center px-3 py-2 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="text-xs text-slate-600 dark:text-slate-300" />
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center px-3 py-2 text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="text-xs" />
                </button>
              </div>
            </motion.div>
          )}

          {collapsed && (
            <div className="space-y-2">
              <button
                onClick={() => setShowUserSettings(true)}
                className="w-full p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiUser} className="text-slate-400 dark:text-slate-500" />
              </button>
              <button
                onClick={() => setShowSystemSettings(true)}
                className="w-full p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiSettings} className="text-slate-400 dark:text-slate-500" />
              </button>
              <button
                onClick={onLogout}
                className="w-full p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiLogOut} />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Settings Modals */}
      <SystemSettings
        isOpen={showSystemSettings}
        onClose={() => setShowSystemSettings(false)}
      />
      <UserSettings
        isOpen={showUserSettings}
        onClose={() => setShowUserSettings(false)}
        user={user}
      />
    </>
  )
}

export default Sidebar