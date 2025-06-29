import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMonitor, FiServer, FiDatabase, FiCloud, FiShield, FiCpu, FiGitBranch, FiLayers, FiZap, FiLink, FiCode } = FiIcons;

const TechnicalArchitecture = () => {
  const [selectedLayer, setSelectedLayer] = useState(null);

  const architectureLayers = [
    {
      id: 'frontend',
      name: 'React SPA Frontend',
      icon: FiMonitor,
      color: 'from-blue-500 to-blue-600',
      components: [
        { name: 'Performance Dashboard', description: 'KPI widgets with drill-down trend charts' },
        { name: 'Configurable Forms', description: 'No-code form builder for deviation entry' },
        { name: 'RCA Wizard Interface', description: 'Interactive Fishbone/5 Whys/Fault-Tree tools' },
        { name: 'Kanban CAPA Board', description: 'Drag-and-drop CAPA management interface' }
      ]
    },
    {
      id: 'backend',
      name: 'Python Django Services',
      icon: FiServer,
      color: 'from-green-500 to-green-600',
      components: [
        { name: 'Workflow Engine', description: 'Configurable process flows with RPN thresholds' },
        { name: 'Rule Engine', description: 'Classification logic for minor/major/critical severity' },
        { name: 'Reporting Service', description: 'Audit-ready Word/PDF generation with templates' },
        { name: 'Notification Service', description: 'SLA breach alerts and escalation management' }
      ]
    },
    {
      id: 'ai',
      name: 'AI Analysis Module',
      icon: FiCpu,
      color: 'from-purple-500 to-purple-600',
      components: [
        { name: 'Problem Statement Generator', description: 'Auto-generates clear incident summaries' },
        { name: 'RCA Depth Enforcer', description: 'Prevents superficial "human error" classifications' },
        { name: 'Pattern Recognition', description: 'Identifies recurring deviation patterns' },
        { name: 'Risk Classifier', description: 'Automated severity assessment using ICH Q9' }
      ]
    },
    {
      id: 'data',
      name: 'PostgreSQL Data Layer',
      icon: FiDatabase,
      color: 'from-orange-500 to-orange-600',
      components: [
        { name: 'Primary Database', description: 'Deviations, RCA, CAPA, user management' },
        { name: 'Append-Only Audit Log', description: '21 CFR Part 11 compliant immutable records' },
        { name: 'Document Storage', description: 'Batch records, attachments, generated reports' },
        { name: 'Quality Score Cache', description: 'Performance metrics and trend calculations' }
      ]
    },
    {
      id: 'integration',
      name: 'Enterprise Integrations',
      icon: FiLink,
      color: 'from-teal-500 to-teal-600',
      components: [
        { name: 'LIMS Connector', description: 'Laboratory information management integration' },
        { name: 'ERP Integration', description: 'Enterprise resource planning sync via REST/OData' },
        { name: 'E-Batch Records', description: 'Electronic batch manufacturing record access' },
        { name: 'BI Tool APIs', description: 'Power BI/Tableau connector for external reporting' }
      ]
    },
    {
      id: 'security',
      name: '21 CFR Part 11 Security',
      icon: FiShield,
      color: 'from-red-500 to-red-600',
      components: [
        { name: 'OAuth/OIDC SSO', description: 'Single sign-on authentication integration' },
        { name: 'RBAC Engine', description: 'Role-based access for personas (QA, CAPA, Compliance)' },
        { name: 'E-Signature Service', description: 'FDA 21 CFR Part 11 compliant electronic signatures' },
        { name: 'Audit Trail System', description: 'Complete user action logging for compliance' }
      ]
    }
  ];

  const integrationFlow = [
    { from: 'LIMS', to: 'Backend', label: 'Lab Data Sync', type: 'REST/OData' },
    { from: 'ERP', to: 'Backend', label: 'Batch Records', type: 'Real-time' },
    { from: 'Calibration DB', to: 'Backend', label: 'Equipment Status', type: 'Scheduled' },
    { from: 'Backend', to: 'Power BI', label: 'KPI Export', type: 'Public API' },
    { from: 'Backend', to: 'Tableau', label: 'Analytics', type: 'Public API' }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Technical Architecture</h1>
          <p className="text-slate-600 mb-4">Python Django microservices with enterprise integrations and FDA compliance</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Technology Stack</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><strong>Frontend:</strong> React SPA with performance dashboards</div>
              <div><strong>Backend:</strong> Python Django microservices architecture</div>
              <div><strong>Database:</strong> PostgreSQL with append-only audit logging</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`cursor-pointer transition-all duration-300 ${
                selectedLayer === layer.id ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${layer.color} p-6 text-white`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <SafeIcon icon={layer.icon} className="text-2xl" />
                    <h3 className="text-lg font-bold">{layer.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{layer.components.length} components</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {layer.components.slice(0, 2).map((component, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-slate-300 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{component.name}</p>
                          <p className="text-xs text-slate-600">{component.description}</p>
                        </div>
                      </div>
                    ))}
                    {layer.components.length > 2 && (
                      <p className="text-xs text-slate-500 mt-2">
                        +{layer.components.length - 2} more components
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedLayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon 
                icon={architectureLayers.find(l => l.id === selectedLayer)?.icon} 
                className="text-2xl text-blue-600" 
              />
              <h3 className="text-2xl font-bold text-slate-800">
                {architectureLayers.find(l => l.id === selectedLayer)?.name}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {architectureLayers.find(l => l.id === selectedLayer)?.components.map((component, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">{component.name}</h4>
                  <p className="text-slate-600 text-sm">{component.description}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <SafeIcon icon={FiCode} className="text-green-500 text-sm" />
                    <span className="text-xs text-green-600">v1 Implementation Ready</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">Enterprise Integration Architecture</h3>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Deep Integration Connectors</h4>
              <div className="space-y-3">
                {integrationFlow.map((flow, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <SafeIcon icon={FiGitBranch} className="text-slate-400 rotate-90" />
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">{flow.label}</span>
                      <p className="text-xs text-slate-500">{flow.from} → {flow.to} ({flow.type})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">FDA Compliance Features</h4>
              <div className="space-y-3">
                {[
                  '21 CFR Part 11 electronic records',
                  'Audit trail for all operations',
                  'Electronic signatures validation',
                  'Data integrity controls',
                  'Role-based access control (RBAC)',
                  'SISPQ continuous improvement tracking'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <SafeIcon icon={FiShield} className="text-green-500" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Out-of-Scope for v1 (Deferred to v2+)</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-red-700">
              <div>• Mobile/offline incident capture</div>
              <div>• AI-driven symptom-vs-cause checks</div>
              <div>• In-app playbooks & contextual guidance</div>
              <div>• Built-in audit-ready report templates</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechnicalArchitecture;