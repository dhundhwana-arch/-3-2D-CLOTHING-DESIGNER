import React from 'react'
import { useDesignStore } from '../../engine/configuration/designStore'

interface ViewSelectorProps {
  currentView: 'front' | 'back' | 'side'
  onViewChange: (view: 'front' | 'back' | 'side') => void
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views: Array<{ id: 'front' | 'back' | 'side'; label: string }> = [
    { id: 'front', label: 'Front' },
    { id: 'back', label: 'Back' },
    { id: 'side', label: 'Side' },
  ]

  return (
    <div className="flex justify-center space-x-2 mb-4">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`px-4 py-2 rounded transition-colors ${
            currentView === view.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {view.label} View
        </button>
      ))}
    </div>
  )
}