import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import HelpDropdown from './HelpDropdown'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

const { FiMenu, FiBell, FiMaximize2, FiPlus, FiHelpCircle, FiLogOut, FiClock } = FiIcons

const MainLayout = ({ children, user, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { isDarkMode } = useTheme()
  const helpDropdownRef = useRef(null)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleToggleRightPanel = () => {
    setRightPanelOpen(!rightPanelOpen)
  }

  const handleToggleHelpDropdown = () => {
    setHelpDropdownOpen(!helpDropdownOpen)
  }

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleNewDeviation = () => {
    console.log('Opening new deviation form...')
  }

  // Get last login time (mock data for demo)
  const getLastLoginTime = () => {
    const lastLogin = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    return lastLogin.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  // Close help dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setHelpDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content Area */}
      <div
        className="flex flex-col h-full transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        {/* Top Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleSidebar}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiMenu} className="text-slate-600 dark:text-slate-300" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Quality Management Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">FDA 21 CFR 210/211 Compliant System</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* New Deviation Button */}
            <button
              onClick={handleNewDeviation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} />
              <span className="hidden sm:inline">New Deviation</span>
            </button>

            {/* Action Buttons */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              <SafeIcon icon={FiMaximize2} className="text-slate-600 dark:text-slate-300" />
            </button>

            {/* Help Dropdown */}
            <div className="relative" ref={helpDropdownRef}>
              <button
                onClick={handleToggleHelpDropdown}
                className={`p-2 rounded-lg transition-colors ${
                  helpDropdownOpen
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
                title="Help & Support"
              >
                <SafeIcon icon={FiHelpCircle} />
              </button>
              <HelpDropdown isOpen={helpDropdownOpen} onClose={() => setHelpDropdownOpen(false)} />
            </div>

            <button
              onClick={handleToggleRightPanel}
              className={`relative p-2 rounded-lg transition-colors ${
                rightPanelOpen
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title="Notifications & Insights"
            >
              <SafeIcon icon={FiBell} />
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>

            {/* Enhanced User Section with Last Login */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Hi {user?.full_name || 'Demo User'}
                  </p>
                  <button
                    onClick={onLogout}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm"
                  >
                    Sign Off
                  </button>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                  <SafeIcon icon={FiClock} className="text-xs" />
                  <span>Last login: {getLastLoginTime()}</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Right Panel - Fixed positioning */}
      <RightPanel
        isOpen={rightPanelOpen}
        onToggle={handleToggleRightPanel}
        onClose={() => setRightPanelOpen(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleToggleSidebar}
        />
      )}
    </div>
  )
}

export default MainLayout