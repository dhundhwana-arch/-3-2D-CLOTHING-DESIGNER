// Types for Design Configuration Schema (Phase 10)
export interface FabricRecord {
  fabric_id: string
  fabric_name: string
  fabric_type: string
  color_name?: string
  color_hex?: string
  image_url?: string
  availability: boolean
}

export interface DesignConfiguration {
  design_id: string
  schema_version: string
  product_type: 'shirt'
  fabric: {
    fabric_id: string
  }
  components: {
    color_hex: string
    collar: {
      style: 'classic' | 'spread' | 'button_down' | 'mandarin'
    }
    sleeves: {
      style: 'full' | 'half'
    }
    cuffs: {
      style: 'standard' | 'button' | 'other'
    }
    pockets: {
      style: 'none' | 'single' | 'double'
      flap_style: 'none' | 'standard' | 'button'
    }
    buttons: {
      button_id: string | null
      style: 'basic' | 'designer' | 'premium'
      placement: 'standard' | 'custom'
    }
    thread: {
      color_hex: string
    }
    fit: {
      type: 'regular' | 'slim'
    }
  }
  metadata: {
    current_view: 'front' | 'back' | 'side'
    created_at: string | null
    updated_at: string | null
  }
}

// Component identifiers for SVG rendering (Phase 6.3)
export const SVG_IDENTIFIERS = {
  BODY: 'shirt-body',
  LEFT_SLEEVE: 'shirt-left-sleeve',
  RIGHT_SLEEVE: 'shirt-right-sleeve',
  COLLAR: 'shirt-collar',
  LEFT_CUFF: 'shirt-left-cuff',
  RIGHT_CUFF: 'shirt-right-cuff',
  LEFT_POCKET: 'shirt-left-pocket',
  RIGHT_POCKET: 'shirt-right-pocket',
  BUTTONS: 'shirt-buttons',
  STITCHING: 'shirt-stitching',
} as const

// View types
export type ViewType = 'front' | 'back' | 'side'
