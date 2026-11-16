import React from 'react'
import { useDesignStore } from '../../engine/configuration/designStore'
// import { getFabricAdapter } from '../../adapters/fabricCatalogAdapter' // Removed unused import

export const DesignerToolbar: React.FC = () => {
  const design = useDesignStore((state) => state.design)
  const save = useDesignStore((state) => state.save)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-gray-900">2D Clothing Designer</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Design ID: {design.design_id}
        </span>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Design
        </button>
        <button
          onClick={() => console.log('Module 01 integration ready')}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Module 01 Integration
        </button>
      </div>
    </header>
  )
}