import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGrid, FiPlus, FiSearch, FiFilter, FiBarChart3, FiSettings, FiUser, FiBell, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock, FiTarget, FiTrendingDown } = FiIcons;

const Wireframes = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const screens = [
    { id: 'dashboard', name: 'Performance Dashboard', icon: FiGrid },
    { id: 'deviation-list', name: 'Deviation Management', icon: FiSearch },
    { id: 'deviation-entry', name: 'Configurable Entry', icon: FiPlus },
    { id: 'rca-workspace', name: 'RCA Wizard', icon: FiBarChart3 },
    { id: 'capa-board', name: 'CAPA Kanban', icon: FiCheckCircle },
    { id: 'reports', name: 'Audit Reports', icon: FiTrendingUp }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Performance Dashboard</h2>
          <p className="text-slate-600">Life-science KPI tracking with drill-down capabilities</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Quality Score: 8.7/10
          </div>
          <SafeIcon icon={FiBell} className="text-slate-400" />
          <SafeIcon icon={FiUser} className="text-slate-400" />
        </div>
      </div>

      {/* Business Objective KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiClock} className="text-2xl" />
            <span className="text-blue-100 text-sm">Days</span>
          </div>
          <div className="text-3xl font-bold mb-1">3.2</div>
          <div className="text-blue-100 text-sm">Avg. Time-to-Investigation</div>
          <div className="text-xs text-blue-200 mt-1">Target: 50% reduction</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiCheckCircle} className="text-2xl" />
            <span className="text-green-100 text-sm">%</span>
          </div>
          <div className="text-3xl font-bold mb-1">87</div>
          <div className="text-green-100 text-sm">CAPA Closure Rate</div>
          <div className="text-xs text-green-200 mt-1">Target: 95%+</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiTarget} className="text-2xl" />
            <span className="text-purple-100 text-sm">Rate</span>
          </div>
          <div className="text-3xl font-bold mb-1">92%</div>
          <div className="text-purple-100 text-sm">True Root-Cause ID</div>
          <div className="text-xs text-purple-200 mt-1">Eliminates false positives</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiTrendingDown} className="text-2xl" />
            <span className="text-orange-100 text-sm">Items</span>
          </div>
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-orange-100 text-sm">Deviation Backlog</div>
          <div className="text-xs text-orange-200 mt-1">Down from 45 last month</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Deviations by Severity (ICH Q9)</h3>
          <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <span className="text-slate-400">Risk-Based Classification Chart</span>
              <p className="text-xs text-slate-500 mt-2">Minor/Major/Critical trending with RPN scores</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">SLA Breach Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <SafeIcon icon={FiAlertCircle} className="text-red-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">3 critical deviations</p>
                <p className="text-xs text-slate-500">&gt; 7 days open (FDA escalation required)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <SafeIcon icon={FiClock} className="text-amber-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">5 CAPA effectiveness checks</p>
                <p className="text-xs text-slate-500">Due this week per SISPQ requirements</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <SafeIcon icon={FiTarget} className="text-blue-500" />
              <div>
                <p className="text-sm font-medium text-slate-800">Quality Score trending up</p>
                <p className="text-xs text-slate-500">+12% improvement in continuous metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Recurring Deviation Pattern Analysis</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-sm text-slate-600">Equipment-Related</div>
            <div className="text-xs text-slate-500">Requires system CAPA</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">3</div>
            <div className="text-sm text-slate-600">Process-Related</div>
            <div className="text-xs text-slate-500">SOP updates needed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-slate-600">Training-Related</div>
            <div className="text-xs text-slate-500">Validated root cause</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeviationList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Deviation Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <SafeIcon icon={FiPlus} />
          <span>New Deviation (Configurable Form)</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by batch, equipment, RPN score..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg">
              <SafeIcon icon={FiFilter} />
              <span>Filter by Severity</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <SafeIcon icon={FiSettings} />
              <span>Configure Workflow</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Deviation ID</th>
                <th className="text-left p-4 font-medium text-slate-700">Batch/Equipment</th>
                <th className="text-left p-4 font-medium text-slate-700">RPN Score</th>
                <th className="text-left p-4 font-medium text-slate-700">Classification</th>
                <th className="text-left p-4 font-medium text-slate-700">Investigation Status</th>
                <th className="text-left p-4 font-medium text-slate-700">Days Open</th>
                <th className="text-left p-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'DEV-2024-001', batch: 'Batch-2024-A45', equipment: 'Tablet Press #3', rpn: 125, severity: 'Critical', status: 'RCA In Progress', days: 8 },
                { id: 'DEV-2024-002', batch: 'Batch-2024-A46', equipment: 'Coating Pan #1', rpn: 64, severity: 'Major', status: 'CAPA Planning', days: 3 },
                { id: 'DEV-2024-003', batch: 'Batch-2024-A47', equipment: 'Blender #2', rpn: 27, severity: 'Minor', status: 'Effectiveness Check', days: 12 },
                { id: 'DEV-2024-004', batch: 'Batch-2024-A48', equipment: 'Packaging Line #4', rpn: 98, severity: 'Major', status: 'Investigation', days: 2 }
              ].map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="p-4 font-mono text-sm">{row.id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-slate-800">{row.batch}</div>
                      <div className="text-xs text-slate-500">{row.equipment}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      row.rpn > 100 ? 'bg-red-100 text-red-700' : 
                      row.rpn > 50 ? 'bg-amber-100 text-amber-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {row.rpn}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                      row.severity === 'Major' ? 'bg-amber-100 text-amber-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${row.days > 7 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                      {row.days} days
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Open RCA</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return renderDashboard();
      case 'deviation-list':
        return renderDeviationList();
      case 'deviation-entry':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Configurable Deviation Entry</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">No-Code Form Builder</h3>
              <p className="text-blue-700 text-sm">Fields, validation rules, and classification logic configured per organizational requirements</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Deviation ID</label>
                    <input type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Auto-generated (DEV-2024-xxx)" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Batch Number *</label>
                    <input type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Batch-2024-xxx (LIMS integration)" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Equipment ID</label>
                    <select className="w-full p-3 border border-slate-300 rounded-lg">
                      <option>Select from ERP integration...</option>
                      <option>Tablet Press #3 (TP-003)</option>
                      <option>Coating Pan #1 (CP-001)</option>
                      <option>Blender #2 (BL-002)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Discovered</label>
                    <input type="datetime-local" className="w-full p-3 border border-slate-300 rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deviation Description *</label>
                  <textarea className="w-full p-3 border border-slate-300 rounded-lg h-24" placeholder="Describe the deviation in detail..."></textarea>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">AI-Generated Problem Statement</h4>
                  <p className="text-green-700 text-sm">Based on batch Batch-2024-A45 and equipment Tablet Press #3, this appears to be a compression force deviation affecting tablet hardness specifications. Initial RPN assessment: 125 (Critical).</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-xs bg-white border border-green-300 px-2 py-1 rounded">Accept</button>
                    <button className="text-xs bg-white border border-green-300 px-2 py-1 rounded">Edit</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Immediate Actions Taken</label>
                    <textarea className="w-full p-3 border border-slate-300 rounded-lg h-20" placeholder="Document containment steps..."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                      <p className="text-slate-500 text-sm">Drag batch records, photos, or documents here</p>
                      <button className="mt-2 text-blue-600 text-sm">Browse Files</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'rca-workspace':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">RCA Wizard - Enhanced Analysis</h2>
              <div className="bg-red-50 border border-red-200 px-3 py-1 rounded text-red-700 text-sm">
                "Human Error" Block Active
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Prevents Superficial Root-Cause Classification</h3>
              <p className="text-amber-700 text-sm">System enforces deeper inquiry before allowing "human error" classification - validates against FDA expectations for thoroughness</p>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800 mb-4">RCA Methods</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium">5 Whys</div>
                    <div className="text-xs text-slate-500">Current method</div>
                  </button>
                  <button className="w-full text-left p-3 border border-slate-200 rounded-lg">Fishbone Diagram</button>
                  <button className="w-full text-left p-3 border border-slate-200 rounded-lg">Fault Tree Analysis</button>
                </div>
              </div>
              
              <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">5 Whys Analysis - Equipment Failure</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="font-medium text-slate-800">Why 1: Why did tablet hardness fail?</div>
                    <div className="text-sm text-slate-600 mt-1">Compression force was insufficient during manufacturing</div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="font-medium text-slate-800">Why 2: Why was compression force insufficient?</div>
                    <div className="text-sm text-slate-600 mt-1">Tablet press pressure settings were below specification</div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <div className="font-medium text-slate-800">Why 3: Why were pressure settings incorrect?</div>
                    <div className="text-sm text-slate-600 mt-1">Last calibration showed drift in pressure sensor readings</div>
                  </div>
                  <div className="p-3 border-2 border-red-200 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800">System Block: Human Error Check</div>
                    <div className="text-sm text-red-600 mt-1">Before concluding operator error, verify: calibration records, maintenance logs, training documentation</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800 mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">Check calibration records</p>
                    <p className="text-xs text-green-600">Last calibration: 45 days ago</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 font-medium">Review maintenance logs</p>
                    <p className="text-xs text-blue-600">Pressure sensor replacement due</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700 font-medium">Verify operator training</p>
                    <p className="text-xs text-purple-600">Current certification valid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'capa-board':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">CAPA Kanban Board - Effectiveness Tracking</h2>
            <div className="grid grid-cols-4 gap-6">
              {['Open', 'In Progress', 'Effectiveness Check', 'Closed/Verified'].map((status) => (
                <div key={status} className="bg-white rounded-xl border border-slate-200">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">{status}</h3>
                    <span className="text-sm text-slate-500">
                      {status === 'Open' ? '4 items' : status === 'In Progress' ? '6 items' : status === 'Effectiveness Check' ? '3 items' : '12 items'}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm font-medium text-slate-800">CAPA-2024-{item.toString().padStart(3, '0')}</p>
                        <p className="text-xs text-slate-600">
                          {status === 'Open' ? 'Replace pressure sensor' : 
                           status === 'In Progress' ? 'Update calibration SOP' :
                           status === 'Effectiveness Check' ? 'Verify sensor accuracy' :
                           'Training effectiveness confirmed'}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">
                            Due: Jan {15 + item}
                            {status === 'Effectiveness Check' && <span className="text-red-500 ml-1">(Overdue)</span>}
                          </span>
                          <SafeIcon icon={FiUser} className="text-slate-400 text-xs" />
                        </div>
                        {status === 'Effectiveness Check' && (
                          <div className="mt-2 text-xs">
                            <div className="bg-amber-50 border border-amber-200 p-2 rounded text-amber-700">
                              Follow-up verification required per SISPQ
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Audit-Ready Reports & Export</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">One-Click Report Builder</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Report Template</label>
                    <select className="w-full p-3 border border-slate-300 rounded-lg">
                      <option>FDA Deviation Summary (21 CFR 210.192)</option>
                      <option>CAPA Effectiveness Report</option>
                      <option>Quality Score Trend Analysis</option>
                      <option>Root Cause Investigation Summary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" className="p-3 border border-slate-300 rounded-lg" />
                      <input type="date" className="p-3 border border-slate-300 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Include Sections</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Executive Summary</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Root Cause Analysis Details</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">CAPA Action Plans</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Audit Trail & E-Signatures</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Generate Report</button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Report Preview - FDA Compliant</h3>
                <div className="h-64 bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="text-sm space-y-2">
                    <div className="font-bold">DEVIATION INVESTIGATION REPORT</div>
                    <div className="text-xs text-slate-600">21 CFR Part 210.192 Compliant</div>
                    <hr className="my-2" />
                    <div><strong>Deviation ID:</strong> DEV-2024-001</div>
                    <div><strong>Batch:</strong> Batch-2024-A45</div>
                    <div><strong>Product:</strong> Tablet XY-123</div>
                    <div><strong>Classification:</strong> Critical (RPN: 125)</div>
                    <hr className="my-2" />
                    <div className="font-medium">ROOT CAUSE ANALYSIS</div>
                    <div className="text-xs">Equipment failure due to sensor drift...</div>
                    <div className="font-medium mt-2">CAPA ACTIONS</div>
                    <div className="text-xs">1. Replace pressure sensor</div>
                    <div className="text-xs">2. Update calibration frequency</div>
                    <hr className="my-2" />
                    <div className="text-xs text-slate-500">E-Signature: QA Manager (21 CFR Part 11)</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="bg-green-600 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-1">
                    <SafeIcon icon={FiCheckCircle} />
                    <span>Export PDF</span>
                  </button>
                  <button className="bg-blue-600 text-white py-2 rounded-lg text-sm">Export Word</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">B2B SaaS UI Wireframes</h1>
          <p className="text-slate-600">Life-science focused interfaces with performance dashboards and compliance controls</p>
        </motion.div>

        <div className="flex space-x-6">
          <div className="w-64 bg-white rounded-2xl shadow-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-4">Screen Navigation</h3>
            <div className="space-y-2">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    activeScreen === screen.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <SafeIcon icon={screen.icon} className="text-lg" />
                  <span className="text-sm font-medium">{screen.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-50 rounded-2xl p-8 min-h-[600px]"
            >
              {renderScreen()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wireframes;