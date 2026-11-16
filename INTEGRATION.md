# INTEGRATION CONTRACTS — MODULE 03

## 1. Module 01 Integration (Customer Platform)
### Interface: `Module01Integration` component (Phase 14)
- **Purpose:** Embeddable 2D designer for customer platform
- **Inputs:**
  - `initialDesign`: Optional initial configuration
  - `onDesignComplete`: Callback for design completion
  - `onDesignSaved`: Callback for design save (returns design_id)
- **Outputs:**
  - Design configuration (JSON)
  - Design ID reference
  - Completion events
- **Implementation:** `src/adapters/module01Integration.tsx`
- **Status:** ✅ Implemented and tested (build successful)

## 2. Module 02 Integration (Fabric Catalog)
### Interface: `FabricCatalogAdapter` (Phase 9)
- **Purpose:** Consume verified fabric records
- **Methods:**
  - `listFabrics()`: Returns `FabricRecord[]`
  - `getFabricById(fabricId)`: Returns `FabricRecord | null`
- **Implementation:**
  - **Development:** `MockFabricAdapter` (synthetic test records)
  - **Production:** `ProductionFabricAdapter` (API contract placeholder)
- **FabricRecord Schema:**
  ```typescript
  interface FabricRecord {
    fabric_id: string
    fabric_name: string
    fabric_type: string
    color_name?: string
    color_hex?: string
    image_url?: string
    availability: boolean
  }
  ```
- **Status:** ✅ Implemented (mock) / Planned (production)

## 3. Module 04 Integration (3D Preview)
### Interface: `Module04Handoff` contract (Phase 13)
- **Purpose:** Supply structured design configuration and visual metadata
- **Shared Properties:**
  - Design ID, Schema version, Fabric ID
  - Color values, Collar style, Sleeve style, Cuff style
  - Pocket configuration, Button ID/placement, Thread color, Fit selection
- **Visual Handoff:**
  - Component identifiers (shirt-body, shirt-left-sleeve, etc.)
  - Front/back view semantics
  - Color mapping
  - Fabric texture references (via Module 02)
- **Implementation:** `src/adapters/module04Integration.ts`
- **Status:** ✅ Contract documented / Implementation ready

## 4. Module 05 Integration (Pricing Engine)
### Interface: Configuration attributes (Phase 13.1)
- **Shared Properties:** Fabric ID, Color, Collar, Sleeves, Cuffs, Pockets, Buttons, Thread, Fit
- **Status:** ✅ Compatible (attributes available for consumption)
- **Note:** Module 03 does not implement pricing authority (Phase 20.7)

## 5. Module 06 Integration (Measurement Guide)
### Interface: Compatibility (Phase 2)
- **Purpose:** Consume measurement-related information where necessary
- **Status:** ⏳ Planned (no direct implementation required in Phase 03)

## 6. Module 07 Integration (Order Manager)
### Interface: Design reference (Phase 11)
- **Purpose:** Supply finalized design configuration and reference
- **Shared Properties:** Design ID, Schema version, Configuration JSON
- **Status:** ✅ Compatible (export JSON available)

## 7. Module 08 Integration (Admin Dashboard)
### Interface: None (Phase 2)
- **Purpose:** Module 03 does not implement administrative functionality
- **Status:** ✅ Compliant (no administrative features)

## 8. Integration Readiness (Phase 13)
- **Module 01:** Development ready (component implemented)
- **Module 02:** Development ready (adapter implemented)
- **Module 04:** Integration ready (contract documented)
- **Module 05:** Compatibility ready (attributes available)
- **Module 07:** Compatibility ready (design reference available)
