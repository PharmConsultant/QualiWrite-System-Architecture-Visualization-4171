import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGitBranch, FiMonitor, FiCpu, FiArrowRight, FiTarget, FiTrendingDown, FiShield, FiClock } = FiIcons;

const VisionWall = () => {
  const businessMetrics = [
    { metric: 'Investigation Cycle Time', target: '50% Reduction', icon: FiClock, color: 'text-blue-600' },
    { metric: 'CAPA Closure Rate', target: '95%+', icon: FiTrendingDown, color: 'text-green-600' },
    { metric: 'Audit Readiness', target: 'Out-of-Box', icon: FiShield, color: 'text-purple-600' }
  ];

  const sections = [
    {
      title: 'Process Flow',
      subtitle: '9-Step Workflow Engine',
      description: 'End-to-end deviation lifecycle with FDA 21 CFR 210/211 compliance checkpoints',
      icon: FiGitBranch,
      color: 'from-green-500 to-emerald-600',
      link: '/process-flow',
      features: ['Configurable Workflows', 'Auto Classification', 'SISPQ Compliance']
    },
    {
      title: 'UI Wireframes',
      subtitle: 'B2B SaaS Interface',
      description: 'Life-science focused dashboards with KPI tracking and audit-ready exports',
      icon: FiMonitor,
      color: 'from-blue-500 to-cyan-600',
      link: '/wireframes',
      features: ['Performance Dashboards', 'RCA Wizard', 'CAPA Kanban Board']
    },
    {
      title: 'Technical Architecture',
      subtitle: 'Enterprise Integration',
      description: 'Python microservices with LIMS/ERP connectors and 21 CFR Part 11 security',
      icon: FiCpu,
      color: 'from-purple-500 to-violet-600',
      link: '/architecture',
      features: ['Django Microservices', 'Deep Integrations', 'Part 11 Compliance']
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <SafeIcon icon={FiTarget} className="text-blue-600" />
            <span className="text-blue-700 font-medium">B2B SaaS for Life Sciences</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            QualiWrite™ v1 Business Blueprint
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            FDA 21 CFR 210/211 and ICH Q9 compliant deviation management platform that drives down cycle times, 
            eliminates superficial fixes, and ensures SISPQ compliance
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {businessMetrics.map((item, index) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={item.icon} className={`text-2xl ${item.color}`} />
                  <h3 className="font-semibold text-slate-800">{item.metric}</h3>
                </div>
                <p className={`text-2xl font-bold ${item.color}`}>{item.target}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={section.link} className="block group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <SafeIcon icon={section.icon} className="text-3xl" />
                      <SafeIcon 
                        icon={FiArrowRight} 
                        className="text-xl opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{section.title}</h3>
                    <p className="text-white/80 text-sm">{section.subtitle}</p>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-slate-600 mb-4">{section.description}</p>
                    <div className="space-y-2">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-slate-500">
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">v1 Core Modules</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-3">Configurable Workflows</h3>
              <p className="text-sm text-slate-600 mb-4">No-code form/flow builder with classification rules and RPN thresholds</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Dynamic field configuration</li>
                <li>• Minor/Major/Critical rules</li>
                <li>• Supplier escalation branching</li>
              </ul>
            </div>
            
            <div className="p-6 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-3">Deep Integrations</h3>
              <p className="text-sm text-slate-600 mb-4">Pre-built connectors to LIMS, ERP, calibration databases</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• REST/OData endpoints</li>
                <li>• E-batch record sync</li>
                <li>• BI tool APIs (Power BI/Tableau)</li>
              </ul>
            </div>
            
            <div className="p-6 border border-slate-200 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-3">Performance Dashboards</h3>
              <p className="text-sm text-slate-600 mb-4">KPI widgets with drill-down charts and automated alerts</p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Time-to-investigation tracking</li>
                <li>• CAPA closure monitoring</li>
                <li>• SLA breach notifications</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Key Personas & Success Metrics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Primary Users</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm"><strong>QA Investigator:</strong> Logs deviations, drives RCA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm"><strong>CAPA Manager:</strong> Reviews findings, tracks effectiveness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm"><strong>Compliance Officer:</strong> Monitors dashboards, audit readiness</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Success Metrics</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>• Deviation closure rate</div>
                <div>• Quality Score trends</div>
                <div>• CAPA effectiveness</div>
                <div>• Recurring deviation rate</div>
                <div>• User satisfaction (NPS)</div>
                <div>• Compliance gap reduction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionWall;