import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiFileText, FiDownload, FiPrinter, FiCheckCircle, FiCalendar, FiFilter } = FiIcons

const ReportsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('fda_deviation')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [includeSections, setIncludeSections] = useState({
    executive_summary: true,
    rca_details: true,
    capa_plans: true,
    audit_trail: true,
    attachments: false
  })

  const reportTemplates = [
    {
      id: 'fda_deviation',
      name: 'FDA Deviation Summary (21 CFR 210.192)',
      description: 'Complete deviation investigation report with FDA compliance'
    },
    {
      id: 'capa_effectiveness',
      name: 'CAPA Effectiveness Report',
      description: 'Corrective action effectiveness verification documentation'
    },
    {
      id: 'quality_trend',
      name: 'Quality Score Trend Analysis',
      description: 'Performance metrics and continuous improvement tracking'
    },
    {
      id: 'rca_investigation',
      name: 'Root Cause Investigation Summary',
      description: 'Detailed root cause analysis with supporting evidence'
    }
  ]

  const sampleReportData = {
    deviation_id: 'DEV-2024-001',
    batch_number: 'Batch-2024-A45',
    product: 'Tablet XY-123',
    classification: 'Critical (RPN: 125)',
    investigation_summary: 'Equipment failure due to sensor drift...',
    root_cause: 'Pressure sensor calibration drift exceeded acceptable limits',
    capa_actions: [
      '1. Replace pressure sensor',
      '2. Update calibration frequency'
    ],
    effectiveness_status: 'Verified - 30 day follow-up completed'
  }

  const handleGenerateReport = () => {
    // Simulate report generation
    const reportBlob = new Blob(['Sample report content'], { type: 'application/pdf' })
    const url = URL.createObjectURL(reportBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedTemplate}_${new Date().toISOString().split('T')[0]}.pdf`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Audit-Ready Reports</h1>
          <p className="text-slate-600">Generate FDA compliant documentation with electronic signatures</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Builder */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">One-Click Report Builder</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Report Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {reportTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                {reportTemplates.find(t => t.id === selectedTemplate)?.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Include Sections</label>
              <div className="space-y-2">
                {Object.entries(includeSections).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setIncludeSections(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm capitalize">
                      {key.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiFileText} />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Report Preview - FDA Compliant</h3>
          
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 min-h-[400px]">
            <div className="text-sm space-y-3">
              <div className="text-center border-b border-slate-300 pb-3">
                <div className="font-bold text-lg">DEVIATION INVESTIGATION REPORT</div>
                <div className="text-xs text-slate-600">21 CFR Part 210.192 Compliant</div>
                <div className="text-xs text-slate-500 mt-1">
                  Generated: {new Date().toLocaleDateString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <strong>Deviation ID:</strong> {sampleReportData.deviation_id}
                </div>
                <div>
                  <strong>Batch:</strong> {sampleReportData.batch_number}
                </div>
                <div>
                  <strong>Product:</strong> {sampleReportData.product}
                </div>
                <div>
                  <strong>Classification:</strong> {sampleReportData.classification}
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div>
                <div className="font-medium mb-2">INVESTIGATION SUMMARY</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded">
                  {sampleReportData.investigation_summary}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2">ROOT CAUSE ANALYSIS</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded">
                  {sampleReportData.root_cause}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2">CAPA ACTIONS</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded">
                  {sampleReportData.capa_actions.map((action, idx) => (
                    <div key={idx}>{action}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-2">EFFECTIVENESS VERIFICATION</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded">
                  {sampleReportData.effectiveness_status}
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div className="text-xs text-slate-500 space-y-1">
                <div>E-Signature: QA Manager (21 CFR Part 11)</div>
                <div>Approved: {new Date().toLocaleDateString()}</div>
                <div>Document ID: RPT-{Date.now()}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={handleGenerateReport}
              className="bg-green-600 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:bg-green-700"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleGenerateReport}
              className="bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:bg-blue-700"
            >
              <SafeIcon icon={FiPrinter} />
              <span>Export Word</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Recent Reports</h3>
        
        <div className="space-y-3">
          {[
            { name: 'FDA Deviation Summary - December 2024', date: '2024-12-19', status: 'completed', size: '2.4 MB' },
            { name: 'CAPA Effectiveness Report - Q4 2024', date: '2024-12-15', status: 'completed', size: '1.8 MB' },
            { name: 'Quality Trend Analysis - November 2024', date: '2024-12-01', status: 'completed', size: '3.1 MB' }
          ].map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiFileText} className="text-blue-600" />
                <div>
                  <div className="font-medium text-slate-800">{report.name}</div>
                  <div className="text-xs text-slate-500">
                    Generated: {report.date} • {report.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  {report.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <SafeIcon icon={FiDownload} className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReportsPage