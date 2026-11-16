import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignConfiguration } from '../../types/design'
import { v4 as uuidv4 } from 'uuid'

// Default design configuration (Phase 10.2)
const createDefaultDesign = (): DesignConfiguration => ({
  design_id: `DSG-${uuidv4().substring(0, 8).toUpperCase()}`,
  schema_version: '1.0.0',
  product_type: 'shirt',
  fabric: {
    fabric_id: 'FAB-DEFAULT',
  },
  components: {
    color_hex: '#0000FF',
    collar: { style: 'classic' },
    sleeves: { style: 'full' },
    cuffs: { style: 'standard' },
    pockets: { style: 'none', flap_style: 'none' },
    buttons: { button_id: null, style: 'basic', placement: 'standard' },
    thread: { color_hex: '#FFFFFF' },
    fit: { type: 'regular' },
  },
  metadata: {
    current_view: 'front',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
})

export interface DesignStoreState {
  // State
  past: DesignConfiguration[]
  present: DesignConfiguration
  future: DesignConfiguration[]
  
  // Core state
  design: DesignConfiguration
  
  // Actions
  initializeDefaultDesign: () => void
  updateComponent: (updates: Partial<DesignConfiguration['components']>) => void
  updateFabric: (fabricId: string) => void
  updateView: (view: 'front' | 'back' | 'side') => void
  
  // History management
  undo: () => void
  redo: () => void
  reset: () => void
  
  // Persistence
  save: () => Promise<void>
  load: (config: DesignConfiguration) => void
  
  // Export
  exportJSON: () => string
  exportPNG: () => Promise<void>
  
  // State checks
  canUndo: boolean
  canRedo: boolean
}

export const useDesignStore = create<DesignStoreState>()(
  persist(
    (set, get) => ({
      // State
      past: [],
      present: createDefaultDesign(),
      future: [],
      
      // Getters
      design: get().present,
      canUndo: get().past.length > 0,
      canRedo: get().future.length > 0,
      
      // Actions
      initializeDefaultDesign: () => {
        const defaultDesign = createDefaultDesign()
        set({ past: [], present: defaultDesign, future: [] })
      },
      
      updateComponent: (updates) => {
        const state = get()
        const newPast = [...state.past, state.present]
        
        // Create new design with updates
        const newDesign = {
          ...state.present,
          components: {
            ...state.present.components,
            ...updates,
          },
          metadata: {
            ...state.present.metadata,
            updated_at: new Date().toISOString(),
          },
        }
        
        set({
          past: newPast,
          present: newDesign,
          future: [], // Clear future on new action
        })
      },
      
      updateFabric: (fabricId) => {
        const state = get()
        const newPast = [...state.past, state.present]
        
        const newDesign = {
          ...state.present,
          fabric: { fabric_id: fabricId },
          metadata: {
            ...state.present.metadata,
            updated_at: new Date().toISOString(),
          },
        }
        
        set({
          past: newPast,
          present: newDesign,
          future: [],
        })
      },
      
      updateView: (view) => {
        const state = get()
        const newDesign = {
          ...state.present,
          metadata: {
            ...state.present.metadata,
            current_view: view,
            updated_at: new Date().toISOString(),
          },
        }
        
        set({ present: newDesign })
      },
      
      undo: () => {
        const state = get()
        if (state.past.length === 0) return
        
        const previous = state.past[state.past.length - 1]
        const newPast = state.past.slice(0, -1)
        const newFuture = [state.present, ...state.future]
        
        set({
          past: newPast,
          present: previous,
          future: newFuture,
        })
      },
      
      redo: () => {
        const state = get()
        if (state.future.length === 0) return
        
        const next = state.future[0]
        const newPast = [...state.past, state.present]
        const newFuture = state.future.slice(1)
        
        set({
          past: newPast,
          present: next,
          future: newFuture,
        })
      },
      
      reset: () => {
        const defaultDesign = createDefaultDesign()
        set({
          past: [],
          present: defaultDesign,
          future: [],
        })
      },
      
      save: async () => {
        const state = get()
        const design = state.present
        // Implementation for persistence (Phase 11)
        // For now, log to console and simulate save
        console.log('Saving design:', design)
        localStorage.setItem('shirt_design', JSON.stringify(design))
      },
      
      load: (config) => {
        set({
          past: [],
          present: config,
          future: [],
        })
      },
      
      exportJSON: () => {
        const state = get()
        const design = state.present
        const json = JSON.stringify(design, null, 2)
        
        // Trigger download
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `shirt-design-${design.design_id}.json`
        link.click()
        URL.revokeObjectURL(url)
        
        return json
      },
      
      exportPNG: async () => {
        // Implementation for PNG export (Phase 12.2)
        // Will use SVG to canvas conversion
        console.log('Exporting PNG...')
        // TODO: Implement SVG to PNG conversion
      },
    }),
    {
      name: 'shirt-design-storage',
      partialize: (state) => ({
        present: state.present,
        past: [], // Don't persist history to avoid bloat
        future: [],
      }),
    }
  )
)
