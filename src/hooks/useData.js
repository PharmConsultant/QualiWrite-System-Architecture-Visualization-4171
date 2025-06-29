import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useData = () => {
  const [deviations, setDeviations] = useState([])
  const [capaActions, setCapaActions] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for demo purposes
  const mockDeviations = [
    {
      id: '1',
      deviation_id: 'DEV-2024-001',
      batch_number: 'Batch-2024-A45',
      equipment_id: 'Tablet Press #3',
      product_name: 'Acetaminophen 500mg',
      date_discovered: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Tablet hardness below specification during routine testing. Multiple tablets from batch failed hardness requirements.',
      immediate_actions: 'Batch quarantined, equipment inspection initiated, production halted on affected line.',
      severity: 'critical',
      rpn_score: 125,
      status: 'rca_progress',
      days_open: 8,
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      deviation_id: 'DEV-2024-002',
      batch_number: 'Batch-2024-A46',
      equipment_id: 'Coating Pan #1',
      product_name: 'Ibuprofen 200mg',
      date_discovered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Coating thickness variation detected during in-process testing.',
      immediate_actions: 'Coating parameters adjusted, samples retained for analysis.',
      severity: 'major',
      rpn_score: 64,
      status: 'capa_planning',
      days_open: 3,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      deviation_id: 'DEV-2024-003',
      batch_number: 'Batch-2024-A47',
      equipment_id: 'Blender #2',
      product_name: 'Aspirin 325mg',
      date_discovered: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Blend uniformity out of specification for API content.',
      immediate_actions: 'Reblending performed, additional sampling conducted.',
      severity: 'minor',
      rpn_score: 27,
      status: 'effectiveness_check',
      days_open: 12,
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      deviation_id: 'DEV-2024-004',
      batch_number: 'Batch-2024-A48',
      equipment_id: 'Packaging Line #4',
      product_name: 'Vitamin D3 1000IU',
      date_discovered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Incorrect labeling detected during packaging inspection.',
      immediate_actions: 'Packaging line stopped, affected units segregated and quarantined.',
      severity: 'major',
      rpn_score: 98,
      status: 'investigation',
      days_open: 2,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const mockCapaActions = [
    {
      id: '1',
      capa_id: 'CAPA-2024-001',
      deviation_id: '1',
      title: 'Replace Pressure Sensor',
      description: 'Replace faulty pressure sensor on Tablet Press #3 and recalibrate equipment.',
      due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'open',
      owner: 'Sarah Johnson'
    },
    {
      id: '2',
      capa_id: 'CAPA-2024-002',
      deviation_id: '2',
      title: 'Update Calibration SOP',
      description: 'Revise calibration standard operating procedure to include monthly sensor checks.',
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'in_progress',
      owner: 'Mike Chen'
    },
    {
      id: '3',
      capa_id: 'CAPA-2024-003',
      deviation_id: '3',
      title: 'Verify Sensor Accuracy',
      description: 'Perform comprehensive accuracy verification on all blender sensors.',
      due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'effectiveness_check',
      owner: 'John Smith'
    },
    {
      id: '4',
      capa_id: 'CAPA-2024-004',
      deviation_id: '4',
      title: 'Training Effectiveness Confirmed',
      description: 'Operator retraining completed and effectiveness verified.',
      due_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'closed_verified',
      owner: 'Lisa Rodriguez'
    }
  ]

  const mockMetrics = {
    avg_investigation_time: 3.2,
    capa_closure_rate: 87.0,
    true_root_cause_rate: 92.0,
    deviation_backlog: 12,
    quality_score: 8.7
  }

  const mockUsers = [
    { id: '1', full_name: 'John Smith', role: 'qa_investigator', email: 'john.qa@pharma.com' },
    { id: '2', full_name: 'Sarah Johnson', role: 'capa_manager', email: 'sarah.capa@pharma.com' },
    { id: '3', full_name: 'Mike Chen', role: 'compliance_officer', email: 'mike.compliance@pharma.com' },
    { id: '4', full_name: 'Lisa Rodriguez', role: 'line_supervisor', email: 'lisa.supervisor@pharma.com' }
  ]

  useEffect(() => {
    // For demo, use mock data
    setDeviations(mockDeviations)
    setCapaActions(mockCapaActions)
    setMetrics(mockMetrics)
    setUsers(mockUsers)
    setLoading(false)
  }, [])

  const createDeviation = async (deviationData) => {
    // Mock creation
    const newDeviation = {
      id: Date.now().toString(),
      deviation_id: `DEV-2024-${String(deviations.length + 1).padStart(3, '0')}`,
      ...deviationData,
      created_at: new Date().toISOString(),
      days_open: 0
    }
    setDeviations(prev => [newDeviation, ...prev])
    return { data: newDeviation, error: null }
  }

  const updateDeviation = async (id, updates) => {
    setDeviations(prev => prev.map(dev => 
      dev.id === id ? { ...dev, ...updates } : dev
    ))
    return { error: null }
  }

  const createCapaAction = async (capaData) => {
    const newCapa = {
      id: Date.now().toString(),
      capa_id: `CAPA-2024-${String(capaActions.length + 1).padStart(3, '0')}`,
      ...capaData,
      created_at: new Date().toISOString()
    }
    setCapaActions(prev => [newCapa, ...prev])
    return { data: newCapa, error: null }
  }

  const updateCapaAction = async (id, updates) => {
    setCapaActions(prev => prev.map(capa => 
      capa.id === id ? { ...capa, ...updates } : capa
    ))
    return { error: null }
  }

  return {
    deviations,
    capaActions,
    metrics,
    users,
    loading,
    createDeviation,
    updateDeviation,
    createCapaAction,
    updateCapaAction
  }
}