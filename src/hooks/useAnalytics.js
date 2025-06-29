import { useState, useEffect } from 'react'

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock historical data for trending calculations
  const generateHistoricalData = () => {
    const currentYear = new Date().getFullYear()
    const lastYear = currentYear - 1
    
    return {
      // Current period data
      current: {
        avgDaysToClose: 18.5,
        totalBacklog: 24,
        closedOnTarget: 78.5,
        projectedOnTarget: 82.3,
        backlogBreakdown: {
          under30: 12,
          days31to60: 8,
          days61to90: 3,
          over90: 1
        }
      },
      // Same period last year for comparison
      lastYear: {
        avgDaysToClose: 21.2, // Higher = worse (improvement when lower)
        totalBacklog: 37,     // Higher = worse (improvement when lower)
        closedOnTarget: 72.1, // Lower = worse (improvement when higher)
        projectedOnTarget: 78.1, // Lower = worse (improvement when higher)
        backlogBreakdown: {
          under30: 14,
          days31to60: 13,
          days61to90: 7,
          over90: 3
        }
      },
      // Monthly trends for the past 12 months
      monthlyTrends: [
        { month: 'Jan', year: currentYear, avgDays: 22.1, backlog: 31, closureRate: 71.2 },
        { month: 'Feb', year: currentYear, avgDays: 21.8, backlog: 29, closureRate: 72.5 },
        { month: 'Mar', year: currentYear, avgDays: 20.9, backlog: 28, closureRate: 74.1 },
        { month: 'Apr', year: currentYear, avgDays: 20.2, backlog: 26, closureRate: 75.8 },
        { month: 'May', year: currentYear, avgDays: 19.8, backlog: 25, closureRate: 76.9 },
        { month: 'Jun', year: currentYear, avgDays: 19.4, backlog: 24, closureRate: 77.2 },
        { month: 'Jul', year: currentYear, avgDays: 19.1, backlog: 23, closureRate: 77.8 },
        { month: 'Aug', year: currentYear, avgDays: 18.9, backlog: 23, closureRate: 78.1 },
        { month: 'Sep', year: currentYear, avgDays: 18.7, backlog: 24, closureRate: 78.3 },
        { month: 'Oct', year: currentYear, avgDays: 18.6, backlog: 24, closureRate: 78.4 },
        { month: 'Nov', year: currentYear, avgDays: 18.5, backlog: 24, closureRate: 78.5 },
        { month: 'Dec', year: currentYear, avgDays: 18.5, backlog: 24, closureRate: 78.5 }
      ],
      // Backlog aging trends
      backlogTrends: {
        thisWeek: { under30: 12, days31to60: 8, days61to90: 3, over90: 1 },
        lastWeek: { under30: 11, days31to60: 9, days61to90: 3, over90: 1 },
        thisMonth: { under30: 12, days31to60: 8, days61to90: 3, over90: 1 },
        lastMonth: { under30: 10, days31to60: 9, days61to90: 4, over90: 2 },
        thisQuarter: { under30: 12, days31to60: 8, days61to90: 3, over90: 1 },
        lastQuarter: { under30: 9, days31to60: 11, days61to90: 5, over90: 2 },
        thisYear: { under30: 12, days31to60: 8, days61to90: 3, over90: 1 },
        lastYear: { under30: 14, days31to60: 13, days61to90: 7, over90: 3 }
      }
    }
  }

  // Calculate trend percentages
  const calculateTrend = (current, previous, isLowerBetter = false) => {
    if (previous === 0) return { change: 0, isImprovement: false, direction: 'neutral' }
    
    const percentChange = ((current - previous) / previous) * 100
    const isImprovement = isLowerBetter ? percentChange < 0 : percentChange > 0
    
    return {
      change: Math.abs(percentChange).toFixed(1),
      isImprovement,
      direction: percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'neutral'
    }
  }

  // Calculate backlog aging comparison
  const calculateBacklogComparison = (current, previous) => {
    const comparisons = {}
    
    Object.keys(current).forEach(period => {
      if (previous[period] !== undefined) {
        const trend = calculateTrend(current[period], previous[period], true) // Lower is better for backlog
        comparisons[period] = {
          current: current[period],
          previous: previous[period],
          trend
        }
      }
    })
    
    return comparisons
  }

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true)
      
      // In real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const historicalData = generateHistoricalData()
      
      // Calculate trends
      const trends = {
        avgDaysToClose: calculateTrend(
          historicalData.current.avgDaysToClose, 
          historicalData.lastYear.avgDaysToClose, 
          true // Lower is better
        ),
        totalBacklog: calculateTrend(
          historicalData.current.totalBacklog, 
          historicalData.lastYear.totalBacklog, 
          true // Lower is better
        ),
        closedOnTarget: calculateTrend(
          historicalData.current.closedOnTarget, 
          historicalData.lastYear.closedOnTarget, 
          false // Higher is better
        ),
        projectedOnTarget: calculateTrend(
          historicalData.current.projectedOnTarget, 
          historicalData.lastYear.projectedOnTarget, 
          false // Higher is better
        )
      }

      // Calculate backlog comparisons for different time periods
      const backlogComparisons = {
        weekOverWeek: calculateBacklogComparison(
          historicalData.backlogTrends.thisWeek,
          historicalData.backlogTrends.lastWeek
        ),
        monthOverMonth: calculateBacklogComparison(
          historicalData.backlogTrends.thisMonth,
          historicalData.backlogTrends.lastMonth
        ),
        quarterOverQuarter: calculateBacklogComparison(
          historicalData.backlogTrends.thisQuarter,
          historicalData.backlogTrends.lastQuarter
        ),
        yearOverYear: calculateBacklogComparison(
          historicalData.backlogTrends.thisYear,
          historicalData.backlogTrends.lastYear
        )
      }

      setAnalyticsData({
        ...historicalData,
        trends,
        backlogComparisons
      })
      
      setLoading(false)
    }

    loadData()
  }, [])

  // Method to get data for specific time range
  const getDataForTimeRange = (timeRange) => {
    if (!analyticsData) return null

    const comparisonMap = {
      'week': analyticsData.backlogComparisons.weekOverWeek,
      'month': analyticsData.backlogComparisons.monthOverMonth,
      'quarter': analyticsData.backlogComparisons.quarterOverQuarter,
      'year': analyticsData.backlogComparisons.yearOverYear
    }

    return {
      current: analyticsData.current,
      trends: analyticsData.trends,
      backlogComparison: comparisonMap[timeRange] || comparisonMap.month,
      monthlyTrends: analyticsData.monthlyTrends
    }
  }

  return {
    analyticsData,
    loading,
    getDataForTimeRange,
    calculateTrend,
    calculateBacklogComparison
  }
}