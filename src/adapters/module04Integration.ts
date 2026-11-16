// Module 04 Integration Contract (Phase 13)
// Handoff document for 3D Clothing Preview

export interface Module04Handoff {
  design_id: string
  schema_version: string
  product_type: 'shirt'
  
  // Shared properties (Phase 13.1)
  fabric: {
    fabric_id: string
  }
  
  components: {
    collar: { style: string }
    sleeves: { style: string }
    cuffs: { style: string }
    pockets: { style: string; flap_style?: string }
    buttons: { button_id: string | null; style: string; placement: string }
    thread: { color_hex: string }
    fit: { type: string }
  }
  
  // Visual handoff (Phase 13.2)
  visual_metadata: {
    component_identifiers: {
      body: string
      left_sleeve: string
      right_sleeve: string
      collar: string
      left_cuff: string
      right_cuff: string
      left_pocket: string
      right_pocket: string
      buttons: string
      stitching: string
    }
    front_back_mapping: {
      front: string
      back: string
    }
    color_mapping: {
      base_color: string
      thread_color: string
    }
  }
  
  // Compatibility status
  compatibility: {
    supported: boolean
    limitations: string[]
    version: string
  }
}

export const generateHandoff = (design: any): Module04Handoff => {
  return {
    design_id: design.design_id,
    schema_version: design.schema_version,
    product_type: design.product_type,
    fabric: design.fabric,
    components: design.components,
    visual_metadata: {
      component_identifiers: {
        body: 'shirt-body',
        left_sleeve: 'shirt-left-sleeve',
        right_sleeve: 'shirt-right-sleeve',
        collar: 'shirt-collar',
        left_cuff: 'shirt-left-cuff',
        right_cuff: 'shirt-right-cuff',
        left_pocket: 'shirt-left-pocket',
        right_pocket: 'shirt-right-pocket',
        buttons: 'shirt-buttons',
        stitching: 'shirt-stitching',
      },
      front_back_mapping: {
        front: 'front_view',
        back: 'back_view',
      },
      color_mapping: {
        base_color: design.components.color_hex,
        thread_color: design.components.thread.color_hex,
      },
    },
    compatibility: {
      supported: true,
      limitations: [
        'SVG-based 2D preview does not include 3D geometry',
        'Fabric texture mapping requires Module 02 integration',
        'Side view implementation is limited',
      ],
      version: '1.0.0',
    },
  }
}