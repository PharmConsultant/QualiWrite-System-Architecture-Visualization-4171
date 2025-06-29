import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiFile, FiFolder, FiUpload, FiDownload, FiSearch, FiFilter, FiMoreVertical, FiEye, FiEdit3, FiTrash2, FiFileText, FiImage, FiVideo, FiMusic } = FiIcons

const FilesPage = () => {
  const [currentFolder, setCurrentFolder] = useState('root')
  const [viewMode, setViewMode] = useState('grid') // grid, list
  const [searchTerm, setSearchTerm] = useState('')

  const folders = [
    { id: 'deviations', name: 'Deviation Records', count: 24, icon: FiFolder },
    { id: 'sops', name: 'Standard Operating Procedures', count: 12, icon: FiFolder },
    { id: 'reports', name: 'Quality Reports', count: 18, icon: FiFolder },
    { id: 'training', name: 'Training Materials', count: 8, icon: FiFolder },
    { id: 'equipment', name: 'Equipment Documentation', count: 15, icon: FiFolder },
    { id: 'audits', name: 'Audit Documents', count: 6, icon: FiFolder }
  ]

  const files = [
    {
      id: 1,
      name: 'DEV-2024-001-Investigation-Report.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2024-12-19',
      owner: 'John Smith',
      folder: 'deviations'
    },
    {
      id: 2,
      name: 'Tablet-Press-SOP-v2.1.docx',
      type: 'document',
      size: '1.8 MB',
      modified: '2024-12-18',
      owner: 'Sarah Johnson',
      folder: 'sops'
    },
    {
      id: 3,
      name: 'Quality-Metrics-Q4-2024.xlsx',
      type: 'spreadsheet',
      size: '892 KB',
      modified: '2024-12-17',
      owner: 'Mike Chen',
      folder: 'reports'
    },
    {
      id: 4,
      name: 'Equipment-Calibration-Photo.jpg',
      type: 'image',
      size: '3.2 MB',
      modified: '2024-12-16',
      owner: 'Lisa Rodriguez',
      folder: 'equipment'
    },
    {
      id: 5,
      name: 'Training-Video-GMP.mp4',
      type: 'video',
      size: '45.6 MB',
      modified: '2024-12-15',
      owner: 'Training Team',
      folder: 'training'
    },
    {
      id: 6,
      name: 'Audit-Checklist-2024.pdf',
      type: 'pdf',
      size: '1.2 MB',
      modified: '2024-12-14',
      owner: 'Compliance Team',
      folder: 'audits'
    }
  ]

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return FiFileText
      case 'image':
        return FiImage
      case 'video':
        return FiVideo
      case 'audio':
        return FiMusic
      default:
        return FiFile
    }
  }

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 dark:text-red-400'
      case 'document':
        return 'text-blue-600 dark:text-blue-400'
      case 'spreadsheet':
        return 'text-green-600 dark:text-green-400'
      case 'image':
        return 'text-purple-600 dark:text-purple-400'
      case 'video':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Document Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Organize and manage quality documentation with 21 CFR Part 11 compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <SafeIcon icon={FiUpload} />
            <span>Upload Files</span>
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <SafeIcon icon={FiFilter} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
        <button
          onClick={() => setCurrentFolder('root')}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Home
        </button>
        {currentFolder !== 'root' && (
          <>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200">
              {folders.find(f => f.id === currentFolder)?.name}
            </span>
          </>
        )}
      </div>

      {/* Folders */}
      {currentFolder === 'root' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Folders</h3>
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}>
            {folders.map((folder) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() => setCurrentFolder(folder.id)}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={folder.icon} className="text-2xl text-blue-600 dark:text-blue-400" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-100 truncate">{folder.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{folder.count} files</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {currentFolder === 'root' ? 'Recent Files' : 'Files'}
          </h3>
          {currentFolder !== 'root' && (
            <button
              onClick={() => setCurrentFolder('root')}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              ← Back to folders
            </button>
          )}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <SafeIcon icon={getFileIcon(file.type)} className={`text-3xl ${getFileColor(file.type)}`} />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                      <SafeIcon icon={FiMoreVertical} className="text-slate-400" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100 text-sm mb-1 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{file.size}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Modified {file.modified}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">by {file.owner}</p>
                </div>
                <div className="mt-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 py-1 px-2 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30">
                    <SafeIcon icon={FiEye} className="inline mr-1" />
                    View
                  </button>
                  <button className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                    <SafeIcon icon={FiDownload} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Name</th>
                  <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Size</th>
                  <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Modified</th>
                  <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Owner</th>
                  <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={getFileIcon(file.type)} className={`text-lg ${getFileColor(file.type)}`} />
                        <span className="font-medium text-slate-800 dark:text-slate-100">{file.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{file.size}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{file.modified}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{file.owner}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                          <SafeIcon icon={FiEdit3} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Storage Usage */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Storage Usage</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Used: 2.4 GB of 10 GB</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">24%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">156</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">24</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Folders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">12</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Shared</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">8</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Recent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilesPage