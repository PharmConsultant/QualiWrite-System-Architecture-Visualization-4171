import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiLayers, FiHome, FiAlertCircle, FiCpu, FiTarget, FiFileText, FiSettings, FiUser, FiLogOut } = FiIcons

const Navigation = ({ user, onLogout }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', id: 'dashboard' },
    { path: '/deviations', icon: FiAlertCircle, label: 'Deviations', id: 'deviations' },
    { path: '/rca', icon: FiCpu, label: 'RCA Workspace', id: 'rca' },
    { path: '/capa', icon: FiTarget, label: 'CAPA Board', id: 'capa' },
    { path: '/reports', icon: FiFileText, label: 'Reports', id: 'reports' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiLayers} className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">QualiWrite™</h1>
              <p className="text-xs text-slate-500">FDA Compliant Deviation Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-slate-100"
              >
                <div className="flex items-center space-x-2">
                  <SafeIcon
                    icon={item.icon}
                    className={`text-sm ${
                      location.pathname === item.path ? 'text-blue-600' : 'text-slate-600'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      location.pathname === item.path ? 'text-blue-600' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 border border-blue-200 rounded-lg"
                    style={{ zIndex: -1 }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-lg">
              <SafeIcon icon={FiUser} className="text-slate-600 text-sm" />
              <span className="text-sm text-slate-700">{user?.full_name}</span>
              <span className="text-xs text-slate-500 capitalize">
                ({user?.role?.replace('_', ' ')})
              </span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2">
              <SafeIcon icon={FiSettings} className="text-lg" />
            </button>
            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-slate-600 p-2"
            >
              <SafeIcon icon={FiLogOut} className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation