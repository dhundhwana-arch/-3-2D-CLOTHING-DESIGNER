import React, { useState, useEffect } from 'react'
import { useDesignStore } from '../../engine/configuration/designStore'
import { getFabricAdapter } from '../../adapters/fabricCatalogAdapter'
import { FabricRecord } from '../../types/design'

export const DesignControls: React.FC = () => {
  const design = useDesignStore((state) => state.design)
  const updateComponent = useDesignStore((state) => state.updateComponent)
  const updateFabric = useDesignStore((state) => state.updateFabric)
  
  const [fabrics, setFabrics] = useState<FabricRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFabrics = async () => {
      const adapter = getFabricAdapter(false) // Development mock
      const result = await adapter.listFabrics()
      setFabrics(result)
      setLoading(false)
    }
    loadFabrics()
  }, [])

  // Fabric Selection (Phase 7.1)
  const FabricSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Fabric Selection</h3>
      {loading ? (
        <div className="text-sm text-gray-500">Loading fabrics...</div>
      ) : (
        <select
          value={design.fabric.fabric_id}
          onChange={(e) => updateFabric(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        >
          {fabrics.map((fabric) => (
            <option key={fabric.fabric_id} value={fabric.fabric_id}>
              {fabric.fabric_name} - {fabric.color_name} ({fabric.availability ? 'Available' : 'Unavailable'})
            </option>
          ))}
        </select>
      )}
    </div>
  )

  // Color Selection (Phase 7.2)
  const ColorSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Color Selection</h3>
      <input
        type="color"
        value={design.components.color_hex}
        onChange={(e) => updateComponent({ color_hex: e.target.value })}
        className="w-full h-10 rounded cursor-pointer"
      />
    </div>
  )

  // Collar Selection (Phase 7.3)
  const CollarSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Collar Style</h3>
      <select
        value={design.components.collar.style}
        onChange={(e) => updateComponent({ collar: { style: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="classic">Classic</option>
        <option value="spread">Spread</option>
        <option value="button_down">Button-down</option>
        <option value="mandarin">Mandarin</option>
      </select>
    </div>
  )

  // Sleeve Selection (Phase 7.5)
  const SleeveSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Sleeve Style</h3>
      <select
        value={design.components.sleeves.style}
        onChange={(e) => updateComponent({ sleeves: { style: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="full">Full Sleeve</option>
        <option value="half">Half Sleeve</option>
      </select>
    </div>
  )

  // Cuff Selection (Phase 7.6)
  const CuffSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Cuff Style</h3>
      <select
        value={design.components.cuffs.style}
        onChange={(e) => updateComponent({ cuffs: { style: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="standard">Standard</option>
        <option value="button">Button</option>
        <option value="other">Other</option>
      </select>
    </div>
  )

  // Pocket Selection (Phase 7.4)
  const PocketSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Pocket Style</h3>
      <select
        value={design.components.pockets.style}
        onChange={(e) => updateComponent({ pockets: { ...design.components.pockets, style: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="none">None</option>
        <option value="single">Single Pocket</option>
        <option value="double">Double Pockets</option>
      </select>
    </div>
  )

  // Button Selection (Phase 7.7)
  const ButtonSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Button Style</h3>
      <select
        value={design.components.buttons.style}
        onChange={(e) => updateComponent({ buttons: { ...design.components.buttons, style: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="basic">Basic</option>
        <option value="designer">Designer</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  )

  // Thread Selection (Phase 7.9)
  const ThreadSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Thread Color</h3>
      <input
        type="color"
        value={design.components.thread.color_hex}
        onChange={(e) => updateComponent({ thread: { color_hex: e.target.value } })}
        className="w-full h-10 rounded cursor-pointer"
      />
    </div>
  )

  // Fit Selection (Phase 7.10)
  const FitSelector = () => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Fit Type</h3>
      <select
        value={design.components.fit.type}
        onChange={(e) => updateComponent({ fit: { type: e.target.value as any } })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="regular">Regular Fit</option>
        <option value="slim">Slim Fit</option>
      </select>
    </div>
  )

  return (
    <div className="space-y-6">
      <FabricSelector />
      <ColorSelector />
      <CollarSelector />
      <SleeveSelector />
      <CuffSelector />
      <PocketSelector />
      <ButtonSelector />
      <ThreadSelector />
      <FitSelector />
    </div>
  )
}