import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { 
  FiBook, 
  FiVideo, 
  FiMessageCircle, 
  FiPhone, 
  FiMail, 
  FiDownload, 
  FiExternalLink, 
  FiShield,
  FiFileText,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiLifeBuoy,
  FiClock
} = FiIcons

const HelpDropdown = ({ isOpen, onClose }) => {
  const helpSections = [
    {
      title: 'Getting Started',
      items: [
        {
          icon: FiBook,
          label: 'User Guide',
          description: 'Complete FDA compliance documentation',
          action: () => console.log('Opening user guide'),
          badge: 'Updated'
        },
        {
          icon: FiVideo,
          label: 'Video Tutorials',
          description: 'Step-by-step walkthroughs',
          action: () => console.log('Opening video tutorials'),
          badge: 'New'
        },
        {
          icon: FiFileText,
          label: 'Quick Start Guide',
          description: '5-minute setup for new users',
          action: () => console.log('Opening quick start')
        }
      ]
    },
    {
      title: 'FDA Compliance',
      items: [
        {
          icon: FiShield,
          label: '21 CFR Part 11 Guide',
          description: 'Electronic records compliance',
          action: () => console.log('Opening CFR guide'),
          badge: 'Required'
        },
        {
          icon: FiFileText,
          label: 'SISPQ Documentation',
          description: 'Quality system requirements',
          action: () => console.log('Opening SISPQ docs')
        },
        {
          icon: FiDownload,
          label: 'Validation Package',
          description: 'System validation documents',
          action: () => console.log('Downloading validation package')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: FiMessageCircle,
          label: 'Live Chat',
          description: 'Chat with support team',
          action: () => console.log('Opening live chat'),
          status: 'Online'
        },
        {
          icon: FiPhone,
          label: 'Phone Support',
          description: '24/7 technical assistance',
          action: () => console.log('Calling support'),
          detail: '+1 (555) 123-4567'
        },
        {
          icon: FiMail,
          label: 'Email Support',
          description: 'Get help via email',
          action: () => console.log('Opening email'),
          detail: 'support@qualiwrite.com'
        }
      ]
    }
  ]

  const quickActions = [
    {
      icon: FiLifeBuoy,
      label: 'Submit Ticket',
      color: 'blue',
      action: () => console.log('Opening ticket form')
    },
    {
      icon: FiUsers,
      label: 'Community',
      color: 'green',
      action: () => console.log('Opening community')
    },
    {
      icon: FiSettings,
      label: 'System Status',
      color: 'amber',
      action: () => console.log('Opening system status')
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiHelpCircle} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">Help & Support</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              FDA compliant quality management assistance
            </p>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {helpSections.map((section, sectionIndex) => (
              <div key={section.title} className="p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <SafeIcon 
                          icon={item.icon} 
                          className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-0.5 flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                item.badge === 'New' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                item.badge === 'Updated' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                item.badge === 'Required' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                            {item.status && (
                              <div className="flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  item.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                }`}></div>
                                <span className="text-xs text-green-600 dark:text-green-400">{item.status}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.description}
                          </p>
                          {item.detail && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono">
                              {item.detail}
                            </p>
                          )}
                        </div>
                        <SafeIcon 
                          icon={FiExternalLink} 
                          className="text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs" 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-b-xl">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 transition-colors text-center group`}
                >
                  <SafeIcon 
                    icon={action.icon} 
                    className={`text-${action.color}-600 dark:text-${action.color}-400 mx-auto mb-1 group-hover:scale-110 transition-transform`} 
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 block font-medium">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <SafeIcon icon={FiClock} />
                <span>Support Hours: 24/7</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HelpDropdown