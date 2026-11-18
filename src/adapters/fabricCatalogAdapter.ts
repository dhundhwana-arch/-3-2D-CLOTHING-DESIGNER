// Fabric Catalog Adapter (Phase 9)
// Development mock implementation (Phase 9.3)
import { FabricRecord } from '../types/design'

export interface FabricCatalogAdapter {
  listFabrics(): Promise<FabricRecord[]>
  getFabricById(fabricId: string): Promise<FabricRecord | null>
}

// Development-only mock adapter
export class MockFabricAdapter implements FabricCatalogAdapter {
  private mockFabrics: FabricRecord[] = [
    {
      fabric_id: 'FAB-001',
      fabric_name: 'Cotton Poplin',
      fabric_type: 'cotton',
      color_name: 'Navy Blue',
      color_hex: '#000080',
      image_url: 'https://example.com/images/cotton-poplin-navy.jpg',
      availability: true,
    },
    {
      fabric_id: 'FAB-002',
      fabric_name: 'Linen Blend',
      fabric_type: 'linen',
      color_name: 'White',
      color_hex: '#FFFFFF',
      image_url: 'https://example.com/images/linen-blend-white.jpg',
      availability: true,
    },
    {
      fabric_id: 'FAB-003',
      fabric_name: 'Silk Satin',
      fabric_type: 'silk',
      color_name: 'Emerald Green',
      color_hex: '#50C878',
      image_url: 'https://example.com/images/silk-satin-emerald.jpg',
      availability: false, // Unavailable fabric example
    },
    {
      fabric_id: 'FAB-004',
      fabric_name: 'Polyester Blend',
      fabric_type: 'synthetic',
      color_name: 'Charcoal',
      color_hex: '#36454F',
      image_url: 'https://example.com/images/polyester-charcoal.jpg',
      availability: true,
    },
  ]

  async listFabrics(): Promise<FabricRecord[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.mockFabrics
  }

  async getFabricById(fabricId: string): Promise<FabricRecord | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.mockFabrics.find(f => f.fabric_id === fabricId) || null
  }
}

// Production adapter placeholder (Phase 9.2)
export class ProductionFabricAdapter implements FabricCatalogAdapter {
  // Removed unused apiUrl: string (Phase 3 cleanup)

  constructor() {
    // Default production API URL handled by environment config
  }

  async listFabrics(): Promise<FabricRecord[]> {
    // TODO: Implement actual API call to Module 02
    throw new Error('Production adapter not yet implemented')
  }

  async getFabricById(_fabricId: string): Promise<FabricRecord | null> {
    // TODO: Implement actual API call to Module 02
    // Removed unused fabricId parameter warning (Phase 3 cleanup)
    throw new Error('Production adapter not yet implemented')
  }
}

// Factory function to get appropriate adapter
export function getFabricAdapter(isProduction: boolean = false): FabricCatalogAdapter {
  return isProduction ? new ProductionFabricAdapter() : new MockFabricAdapter()
}