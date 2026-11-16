import React, { useState, useEffect } from 'react'
import { DesignerWorkspace } from './components/designer/DesignerWorkspace'
import { DesignerToolbar } from './components/designer/DesignerToolbar'
import { DesignControls } from './components/designer/DesignControls'
import { ViewSelector } from './components/designer/ViewSelector'
import { useDesignStore } from './engine/configuration/designStore'

export default function App() {
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'side'>('front')
  const designStore = useDesignStore()

  useEffect(() => {
    // Initialize with default design
    designStore.initializeDefaultDesign()
  }, [designStore])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <DesignerToolbar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Controls Panel */}
        <aside className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto p-4 controls-panel">
          <DesignControls />
        </aside>
        
        {/* Preview Panel */}
        <section className="flex-1 bg-gray-100 p-4 flex flex-col preview-panel">
          <ViewSelector 
            currentView={currentView} 
            onViewChange={setCurrentView} 
          />
          <DesignerWorkspace view={currentView} />
        </section>
      </main>
      
      {/* Footer Controls */}
      <footer className="bg-white border-t border-gray-200 p-3 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => designStore.undo()}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled={!designStore.canUndo}
          >
            Undo
          </button>
          <button 
            onClick={() => designStore.redo()}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled={!designStore.canRedo}
          >
            Redo
          </button>
          <button 
            onClick={() => designStore.reset()}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => designStore.exportJSON()}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export JSON
          </button>
          <button 
            onClick={() => designStore.exportPNG()}
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export PNG
          </button>
          <button 
            onClick={() => designStore.save()}
            className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </footer>
    </div>
  )
}