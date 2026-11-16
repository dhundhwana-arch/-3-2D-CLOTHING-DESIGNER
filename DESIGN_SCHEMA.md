# DESIGN CONFIGURATION SCHEMA — MODULE 03

## 1. Schema Version
- **Current Version:** 1.0.0
- **Format:** JSON
- **Validation:** TypeScript interface + DesignValidator class

## 2. Shared Design Identifier (Phase 10.1)
- **Format:** `DSG-{8-char-uppercase-uuid}`
- **Example:** `DSG-A1B2C3D4`
- **Generation:** UUID v4 substring (Phase 10.1)

## 3. Canonical Configuration (Phase 10.2)
```json
{
  "design_id": "DSG-EXAMPLE",
  "schema_version": "1.0.0",
  "product_type": "shirt",
  "fabric": {
    "fabric_id": "FAB-001"
  },
  "components": {
    "color_hex": "#0000FF",
    "collar": {
      "style": "classic"
    },
    "sleeves": {
      "style": "full"
    },
    "cuffs": {
      "style": "standard"
    },
    "pockets": {
      "style": "none",
      "flap_style": "none"
    },
    "buttons": {
      "button_id": null,
      "style": "basic",
      "placement": "standard"
    },
    "thread": {
      "color_hex": "#FFFFFF"
    },
    "fit": {
      "type": "regular"
    }
  },
  "metadata": {
    "current_view": "front",
    "created_at": "2026-11-16T04:37:00Z",
    "updated_at": "2026-11-16T04:37:00Z"
  }
}
```

## 4. Required Fields (Phase 10.3)
- `design_id`: String (DSG- prefix)
- `schema_version`: String (semantic version)
- `product_type`: 'shirt'
- `fabric.fabric_id`: String
- `components.color_hex`: HEX string (#RRGGBB)
- `components.collar.style`: 'classic' | 'spread' | 'button_down' | 'mandarin'
- `components.sleeves.style`: 'full' | 'half'
- `components.cuffs.style`: 'standard' | 'button' | 'other'
- `components.pockets.style`: 'none' | 'single' | 'double'
- `components.pockets.flap_style`: 'none' | 'standard' | 'button'
- `components.buttons.button_id`: String | null
- `components.buttons.style`: 'basic' | 'designer' | 'premium'
- `components.buttons.placement`: 'standard' | 'custom'
- `components.thread.color_hex`: HEX string (#RRGGBB)
- `components.fit.type`: 'regular' | 'slim'
- `metadata.current_view`: 'front' | 'back' | 'side'
- `metadata.created_at`: ISO string | null
- `metadata.updated_at`: ISO string | null

## 5. Optional Fields
- None (all fields required for validation)

## 6. Validation Method (Phase 10.4)
- **Tool:** `DesignValidator.validate(config)`
- **Returns:** `{ isValid: boolean; errors: string[] }`
- **Validation Rules:**
  - Schema version format (^\d+\.\d+\.\d+$)
  - Design ID format (DSG- prefix)
  - HEX color validation (^#[0-9A-F]{6}$)
  - Enum value validation (collar, sleeves, cuffs, pockets, buttons, thread, fit)
  - Metadata view validation (front/back/side)

## 7. Example Configuration
See `src/engine/validation/designValidator.ts` for `DesignValidator.getExampleConfig()`

## 8. Compatibility Status (Phase 10.3)
- **Module 01:** ✅ Compatible (embeddable component)
- **Module 02:** ✅ Compatible (fabric adapter)
- **Module 04:** ✅ Compatible (handoff contract)
- **Module 05:** ✅ Compatible (attribute consumption)
- **Module 07:** ✅ Compatible (design reference)
- **Schema Migration:** Planned for future versions (Phase 10.4)
