import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiCpu, FiShield, FiBarChart, FiAlertTriangle, FiCheckCircle, FiArrowRight, FiSettings, FiFileText } = FiIcons;

const ProcessFlow = () => {
  const [selectedStep, setSelectedStep] = useState(null);

  const swimlanes = [
    { id: 'investigator', name: 'QA Investigator', icon: FiUser, color: 'bg-blue-50 border-blue-200' },
    { id: 'system', name: 'QualiWrite™ Engine', icon: FiCpu, color: 'bg-green-50 border-green-200' },
    { id: 'capa', name: 'CAPA Manager', icon: FiShield, color: 'bg-purple-50 border-purple-200' },
    { id: 'compliance', name: 'Compliance Officer', icon: FiBarChart, color: 'bg-orange-50 border-orange-200' }
  ];

  const processSteps = [
    {
      id: 1,
      title: 'Deviation Entry',
      swimlane: 'investigator',
      description: 'User inputs context (batch, equipment, attachments) via configurable forms',
      complianceNote: 'FDA 21 CFR 210.192 - Documentation requirements',
      gateway: { condition: 'Complete?', action: 'Validation per ICH Q9' }
    },
    {
      id: 2,
      title: 'Auto Problem Statement',
      swimlane: 'system',
      description: 'AI generates clear incident summary from structured input data',
      complianceNote: 'Eliminates ambiguous problem definitions',
      gateway: null
    },
    {
      id: 3,
      title: 'Immediate Actions',
      swimlane: 'investigator',
      description: 'Timestamped containment steps recorded with Part 11 audit trail',
      complianceNote: '21 CFR Part 11 - Electronic records',
      gateway: null
    },
    {
      id: 4,
      title: 'Classification & Triage',
      swimlane: 'system',
      description: 'Severity auto-assigned using RPN thresholds & investigation depth set',
      complianceNote: 'ICH Q9 Quality Risk Management principles',
      gateway: { condition: 'Critical?', action: 'Auto-notify Compliance Officer' }
    },
    {
      id: 5,
      title: 'RCA Wizard',
      swimlane: 'investigator',
      description: 'Guided Fishbone/5 Whys/Fault-Tree with enforced depth before "human error"',
      complianceNote: 'Prevents superficial root-cause identification',
      gateway: { condition: 'Human Error?', action: 'Block until system checks complete' }
    },
    {
      id: 6,
      title: 'CAPA Planning',
      swimlane: 'capa',
      description: 'Pre-populated templates, owner assignment, due-date scheduling',
      complianceNote: 'CAPA effectiveness tracking per FDA requirements',
      gateway: null
    },
    {
      id: 7,
      title: 'Effectiveness Verification',
      swimlane: 'capa',
      description: 'Follow-up audits/tests confirm true root cause resolution',
      complianceNote: 'Validates SISPQ continuous improvement',
      gateway: null
    },
    {
      id: 8,
      title: 'Reporting & Export',
      swimlane: 'system',
      description: 'One-click audit-ready Word/PDF with Part-11 e-signatures',
      complianceNote: '21 CFR Part 11 compliant documentation',
      gateway: null
    },
    {
      id: 9,
      title: 'Trend Analysis',
      swimlane: 'compliance',
      description: 'Quality Score tracking, backlog reduction, repeat event monitoring',
      complianceNote: 'Continuous improvement metrics for SISPQ',
      gateway: null
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Process Flow Diagram</h1>
          <p className="text-slate-600 mb-4">End-to-end deviation lifecycle with FDA 21 CFR 210/211 and ICH Q9 compliance checkpoints</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Business Objective</h3>
            <p className="text-blue-700 text-sm">Reduce deviation-investigation cycle time by 50% while eliminating false-positive root-cause calls and ensuring audit readiness</p>
          </div>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Swimlane Process Map - Key Personas</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {swimlanes.map((lane) => (
                <div key={lane.id} className={`p-4 rounded-lg border-2 ${lane.color}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={lane.icon} className="text-lg" />
                    <span className="font-medium text-sm">{lane.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {swimlanes.map((lane) => (
                <div key={lane.id} className="space-y-4">
                  {processSteps
                    .filter(step => step.swimlane === lane.id)
                    .map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: step.id * 0.1 }}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedStep === step.id 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : `${lane.color} hover:shadow-md`
                        }`}
                        onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500">STEP {step.id}</span>
                          {step.gateway && (
                            <SafeIcon icon={FiAlertTriangle} className="text-amber-500 text-sm" />
                          )}
                          <SafeIcon icon={FiSettings} className="text-slate-400 text-xs" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm mb-1">{step.title}</h3>
                        <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                        
                        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <SafeIcon icon={FiFileText} className="inline mr-1" />
                          {step.complianceNote}
                        </div>
                        
                        {step.gateway && (
                          <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-200">
                            <div className="flex items-center space-x-1 mb-1">
                              <SafeIcon icon={FiAlertTriangle} className="text-amber-600 text-xs" />
                              <span className="text-xs font-medium text-amber-700">Gateway</span>
                            </div>
                            <p className="text-xs text-amber-600">{step.gateway.condition}</p>
                            <p className="text-xs text-amber-500">→ {step.gateway.action}</p>
                          </div>
                        )}

                        {index < processSteps.filter(s => s.swimlane === lane.id).length - 1 && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <SafeIcon icon={FiArrowRight} className="text-slate-400 rotate-90" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiCheckCircle} className="text-blue-600 text-xl" />
              <h3 className="text-xl font-semibold text-slate-800">
                Step {selectedStep}: {processSteps.find(s => s.id === selectedStep)?.title}
              </h3>
            </div>
            <p className="text-slate-600 mb-4">
              {processSteps.find(s => s.id === selectedStep)?.description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">System Features</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Configurable workflow rules</li>
                  <li>• Automated validation checks</li>
                  <li>• Real-time notifications</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Compliance Controls</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• 21 CFR Part 11 audit trails</li>
                  <li>• Electronic signatures</li>
                  <li>• Data integrity validation</li>
                  <li>• SISPQ documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Performance Impact</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Reduces cycle time</li>
                  <li>• Improves root-cause accuracy</li>
                  <li>• Enhances audit readiness</li>
                  <li>• Tracks quality metrics</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProcessFlow;