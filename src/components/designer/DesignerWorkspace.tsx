import React from 'react'
import { ShirtRenderer } from '../shirt/ShirtRenderer'
import { useDesignStore } from '../../engine/configuration/designStore'

interface DesignerWorkspaceProps {
  view: 'front' | 'back' | 'side'
}

export const DesignerWorkspace: React.FC<DesignerWorkspaceProps> = ({ view }) => {
  const design = useDesignStore((state) => state.design)

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 shirt-canvas">
      <div className="w-full max-w-2xl aspect-[2/3] bg-white rounded-lg shadow-lg overflow-hidden">
        <ShirtRenderer design={design} view={view} />
      </div>
      
      {/* View indicator */}
      <div className="mt-4 text-sm text-gray-500">
        Current View: {view.charAt(0).toUpperCase() + view.slice(1)}
      </div>
    </div>
  )
}