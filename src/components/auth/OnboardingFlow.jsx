import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { 
  FiUser, FiShield, FiTarget, FiChevronRight, FiChevronLeft, FiCheck, 
  FiPlay, FiBookOpen, FiSettings, FiBarChart3, FiAlertTriangle, 
  FiCheckCircle, FiCpu
} = FiIcons

const OnboardingFlow = ({ user, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userPreferences, setUserPreferences] = useState({
    role: user?.role || 'qa_investigator',
    notifications: true,
    dashboardLayout: 'default',
    completedTour: false
  })

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to QualiWrite™',
      subtitle: 'Accelerating Quality through Intelligent Compliance',
      component: WelcomeStep
    },
    {
      id: 'role',
      title: 'Your Role & Responsibilities',
      subtitle: 'Understanding your access and capabilities',
      component: RoleStep
    },
    {
      id: 'features',
      title: 'Key Features Overview',
      subtitle: 'Discover powerful quality management tools',
      component: FeaturesStep
    },
    {
      id: 'preferences',
      title: 'Customize Your Experience',
      subtitle: 'Set up your workspace preferences',
      component: PreferencesStep
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      subtitle: 'Ready to start managing quality',
      component: CompleteStep
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Save user preferences
    const updatedUser = {
      ...user,
      onboardingCompleted: true,
      preferences: userPreferences
    }
    onComplete(updatedUser)
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="bg-slate-50 dark:bg-slate-700 px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent 
                user={user}
                preferences={userPreferences}
                setPreferences={setUserPreferences}
                onNext={handleNext}
                onComplete={handleComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="bg-slate-50 dark:bg-slate-700 px-8 py-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiChevronLeft} />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep
                    ? 'bg-blue-600'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <SafeIcon icon={currentStep === steps.length - 1 ? FiPlay : FiChevronRight} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Individual Step Components

const WelcomeStep = ({ user }) => (
  <div className="text-center space-y-6">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
      <SafeIcon icon={FiShield} className="text-white text-4xl" />
    </div>
    
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
        Welcome, {user?.full_name || 'User'}!
      </h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        You're about to experience the next generation of quality management. QualiWrite™ combines 
        intelligent automation with regulatory compliance to help you work smarter, not harder.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <SafeIcon icon={FiCpu} className="text-2xl text-blue-600 dark:text-blue-400 mb-2 mx-auto" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">AI-Powered</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Intelligent analysis and recommendations</p>
      </div>
      
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <SafeIcon icon={FiShield} className="text-2xl text-green-600 dark:text-green-400 mb-2 mx-auto" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Compliant</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Built for regulatory requirements</p>
      </div>
      
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <SafeIcon icon={FiTarget} className="text-2xl text-purple-600 dark:text-purple-400 mb-2 mx-auto" />
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Efficient</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Streamlined quality workflows</p>
      </div>
    </div>
  </div>
)

const RoleStep = ({ user }) => {
  const roleInfo = {
    qa_investigator: {
      name: 'QA Investigator',
      description: 'You create and investigate deviations, perform root cause analysis, and ensure quality standards.',
      capabilities: [
        'Create and manage deviation records',
        'Conduct root cause analysis',
        'Generate investigation reports',
        'Track CAPA effectiveness'
      ],
      color: 'blue'
    },
    capa_manager: {
      name: 'CAPA Manager',
      description: 'You manage corrective and preventive actions, verify effectiveness, and oversee quality improvements.',
      capabilities: [
        'Manage CAPA action plans',
        'Verify effectiveness of actions',
        'Approve quality improvements',
        'Monitor compliance metrics'
      ],
      color: 'green'
    },
    compliance_officer: {
      name: 'Compliance Officer',
      description: 'You oversee regulatory compliance, approve critical reports, and manage system administration.',
      capabilities: [
        'Review compliance status',
        'Approve investigation reports',
        'Manage system settings',
        'Oversee audit activities'
      ],
      color: 'purple'
    },
    system_admin: {
      name: 'System Administrator',
      description: 'You have full system access to manage users, configure settings, and maintain the platform.',
      capabilities: [
        'Manage user accounts and roles',
        'Configure system settings',
        'Monitor system performance',
        'Manage integrations'
      ],
      color: 'red'
    }
  }

  const currentRole = roleInfo[user?.role] || roleInfo.qa_investigator

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl bg-${currentRole.color}-50 dark:bg-${currentRole.color}-900/20 border border-${currentRole.color}-200 dark:border-${currentRole.color}-800`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 bg-${currentRole.color}-100 dark:bg-${currentRole.color}-900/40 rounded-full flex items-center justify-center`}>
            <SafeIcon icon={FiUser} className={`text-2xl text-${currentRole.color}-600 dark:text-${currentRole.color}-400`} />
          </div>
          <div>
            <h3 className={`text-xl font-semibold text-${currentRole.color}-800 dark:text-${currentRole.color}-200`}>
              {currentRole.name}
            </h3>
            <p className={`text-${currentRole.color}-600 dark:text-${currentRole.color}-300 text-sm`}>
              {currentRole.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Your Key Capabilities:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentRole.capabilities.map((capability, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 text-sm">{capability}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Note:</strong> Your role determines your access permissions. If you need additional access, 
          contact your system administrator.
        </p>
      </div>
    </div>
  )
}

const FeaturesStep = () => {
  const features = [
    {
      icon: FiAlertTriangle,
      title: 'Deviation Management',
      description: 'Create, track, and resolve quality deviations with intelligent workflows',
      color: 'red'
    },
    {
      icon: FiCpu,
      title: 'AI-Powered RCA',
      description: 'Advanced root cause analysis with intelligent recommendations',
      color: 'purple'
    },
    {
      icon: FiTarget,
      title: 'CAPA Tracking',
      description: 'Manage corrective actions with effectiveness verification',
      color: 'green'
    },
    {
      icon: FiBarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights and performance metrics',
      color: 'blue'
    },
    {
      icon: FiBookOpen,
      title: 'Audit Reports',
      description: 'Generate compliant documentation instantly',
      color: 'orange'
    },
    {
      icon: FiShield,
      title: 'Compliance Tracking',
      description: 'Monitor regulatory compliance across all processes',
      color: 'cyan'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover the powerful features that will transform your quality management workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 bg-${feature.color}-50 dark:bg-${feature.color}-900/20 border border-${feature.color}-200 dark:border-${feature.color}-800 rounded-lg hover:shadow-md transition-shadow`}
          >
            <SafeIcon icon={feature.icon} className={`text-2xl text-${feature.color}-600 dark:text-${feature.color}-400 mb-3`} />
            <h4 className={`font-semibold text-${feature.color}-800 dark:text-${feature.color}-200 mb-2`}>
              {feature.title}
            </h4>
            <p className={`text-${feature.color}-600 dark:text-${feature.color}-300 text-sm`}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <SafeIcon icon={FiPlay} className="text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-blue-800 dark:text-blue-200">Quick Start Tip</span>
        </div>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          After onboarding, try creating your first deviation to see the intelligent workflow in action.
        </p>
      </div>
    </div>
  )
}

const PreferencesStep = ({ preferences, setPreferences }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Customize QualiWrite™ to match your working style and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100">Dashboard Layout</h4>
          <div className="space-y-2">
            {[
              { id: 'default', name: 'Default', description: 'Standard layout with all widgets' },
              { id: 'compact', name: 'Compact', description: 'Condensed view for smaller screens' },
              { id: 'detailed', name: 'Detailed', description: 'Extended metrics and charts' }
            ].map(layout => (
              <label key={layout.id} className="flex items-center space-x-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="dashboardLayout"
                  value={layout.id}
                  checked={preferences.dashboardLayout === layout.id}
                  onChange={(e) => setPreferences(prev => ({ ...prev, dashboardLayout: e.target.value }))}
                  className="text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{layout.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{layout.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100">Notification Preferences</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
                className="rounded border-slate-300 text-blue-600"
              />
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-100">Enable Notifications</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Get alerts for important events</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <input
                type="checkbox"
                checked={preferences.completedTour}
                onChange={(e) => setPreferences(prev => ({ ...prev, completedTour: e.target.checked }))}
                className="rounded border-slate-300 text-blue-600"
              />
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-100">Feature Tour</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Show guided tour on first login</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <SafeIcon icon={FiSettings} className="text-green-600 dark:text-green-400" />
          <span className="font-semibold text-green-800 dark:text-green-200">Customization</span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm">
          You can always change these preferences later in your user settings.
        </p>
      </div>
    </div>
  )
}

const CompleteStep = ({ user, onComplete }) => {
  const quickActions = [
    {
      icon: FiAlertTriangle,
      title: 'Create Your First Deviation',
      description: 'Start with a deviation entry to see the workflow',
      action: 'Create Deviation'
    },
    {
      icon: FiBarChart3,
      title: 'Explore Analytics',
      description: 'View quality metrics and performance data',
      action: 'View Dashboard'
    },
    {
      icon: FiBookOpen,
      title: 'Access Help Center',
      description: 'Learn more with guides and tutorials',
      action: 'Get Help'
    }
  ]

  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
        <SafeIcon icon={FiCheckCircle} className="text-3xl text-green-600 dark:text-green-400" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Welcome aboard, {user?.full_name}!
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your account is set up and ready to go. You now have access to all the quality management 
          tools you need to accelerate compliance and drive continuous improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {quickActions.map((action, index) => (
          <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <SafeIcon icon={action.icon} className="text-2xl text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{action.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{action.description}</p>
            <button className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
              {action.action}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          <strong>Need help?</strong> Access our comprehensive help center anytime by clicking the 
          help icon in the top navigation bar.
        </p>
      </div>
    </div>
  )
}

export default OnboardingFlow