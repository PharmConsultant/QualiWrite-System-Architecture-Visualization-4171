import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiUser, FiAlertTriangle, FiCheckCircle, FiPlus, FiChevronLeft, FiChevronRight } = FiIcons

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day

  const events = [
    {
      id: 1,
      title: 'CAPA Review Meeting',
      date: new Date(2024, 11, 20, 10, 0),
      type: 'meeting',
      attendees: ['John Smith', 'Sarah Johnson'],
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Deviation Investigation Due',
      date: new Date(2024, 11, 22, 9, 0),
      type: 'deadline',
      deviation: 'DEV-2024-001',
      status: 'overdue'
    },
    {
      id: 3,
      title: 'Equipment Calibration',
      date: new Date(2024, 11, 25, 14, 0),
      type: 'maintenance',
      equipment: 'Tablet Press #3',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Quality Review',
      date: new Date(2024, 11, 27, 11, 0),
      type: 'review',
      status: 'completed'
    }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const getEventColor = (event) => {
    switch (event.type) {
      case 'meeting': return 'bg-blue-100 border-blue-300 text-blue-700'
      case 'deadline': return event.status === 'overdue' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-amber-100 border-amber-300 text-amber-700'
      case 'maintenance': return 'bg-purple-100 border-purple-300 text-purple-700'
      case 'review': return 'bg-green-100 border-green-300 text-green-700'
      default: return 'bg-slate-100 border-slate-300 text-slate-700'
    }
  }

  const getEventIcon = (event) => {
    switch (event.type) {
      case 'meeting': return FiUser
      case 'deadline': return FiAlertTriangle
      case 'maintenance': return FiClock
      case 'review': return FiCheckCircle
      default: return FiCalendar
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Calendar</h1>
          <p className="text-slate-600 dark:text-slate-400">Schedule and track quality management activities</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <SafeIcon icon={FiPlus} />
          <span>New Event</span>
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <SafeIcon icon={FiChevronLeft} className="text-slate-600 dark:text-slate-300" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <SafeIcon icon={FiChevronRight} className="text-slate-600 dark:text-slate-300" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {['month', 'week', 'day'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 rounded-lg">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {getDaysInMonth(currentDate).map((date, index) => {
            const dayEvents = getEventsForDate(date)
            const isToday = date && date.toDateString() === new Date().toDateString()
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`min-h-[100px] p-2 border border-slate-200 dark:border-slate-600 rounded-lg ${
                  date 
                    ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700' 
                    : 'bg-slate-50 dark:bg-slate-900'
                } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getEventColor(event)} cursor-pointer hover:opacity-80`}
                          title={event.title}
                        >
                          <div className="flex items-center space-x-1">
                            <SafeIcon icon={getEventIcon(event)} className="text-xs" />
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter(event => event.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 5)
            .map((event) => (
              <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={getEventIcon(event)} />
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {event.deviation && (
                        <div className="text-xs opacity-75">Related: {event.deviation}</div>
                      )}
                      {event.equipment && (
                        <div className="text-xs opacity-75">Equipment: {event.equipment}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-medium capitalize">
                    {event.status}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage