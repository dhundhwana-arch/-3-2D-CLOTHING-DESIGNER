// Module 01 Integration Interface (Phase 14)
// Embeddable React component for customer platform

import React from 'react'
import { DesignerWorkspace } from '../components/designer/DesignerWorkspace'
import { DesignerToolbar } from '../components/designer/DesignerToolbar'
import { DesignControls } from '../components/designer/DesignControls'
import { ViewSelector } from '../components/designer/ViewSelector'
import { useDesignStore } from '../engine/configuration/designStore'

export interface Module01IntegrationProps {
  initialDesign?: any
  onDesignComplete?: (design: any) => void
  onDesignSaved?: (designId: string) => void
  // fabricAdapter?: any // Removed unused prop
}

export const Module01Integration: React.FC<Module01IntegrationProps> = ({
  initialDesign,
  onDesignComplete,
  onDesignSaved,
  // fabricAdapter, // Removed unused prop
}) => {
  const designStore = useDesignStore()
  const [currentView, setCurrentView] = React.useState<'front' | 'back' | 'side'>('front')

  // Initialize with provided design
  React.useEffect(() => {
    if (initialDesign) {
      designStore.load(initialDesign)
    }
  }, [initialDesign, designStore])

  // Handle design completion
  const handleSave = async () => {
    await designStore.save()
    if (onDesignSaved) {
      onDesignSaved(designStore.design.design_id)
    }
    if (onDesignComplete) {
      onDesignComplete(designStore.design)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DesignerToolbar />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <DesignControls />
        </aside>
        <section className="flex-1 bg-gray-100 p-4 flex flex-col">
          <ViewSelector 
            currentView={currentView} 
            onViewChange={setCurrentView} 
          />
          <DesignerWorkspace view={currentView} />
        </section>
      </main>
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
            onClick={handleSave}
            className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Complete Design
          </button>
        </div>
      </footer>
    </div>
  )
}

// Export as named component for Module 01 consumption
export default Module01Integration