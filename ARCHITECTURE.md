# CUSTOM SHIRT STUDIO — MODULE 03 ARCHITECTURE DESIGN

## 1. Technology Selection (Phase 5.1)
- **Framework:** React 18.3.0 + Vite 5.4.0 (TypeScript)
- **State Management:** Zustand 4.5.0 (with persist middleware)
- **Rendering:** SVG-based component system
- **Styling:** Tailwind CSS 3.4.4
- **Testing:** Vitest 2.0.5
- **Validation:** Custom TypeScript schema validation
- **Persistence:** LocalStorage (development) / Adapter-based (production)
- **Export:** JSON (native) / PNG (SVG-to-canvas conversion)

## 2. Recommended Architecture (Phase 5.2)
```
2d-clothing-designer/
│
├── src/
│   ├── components/
│   │   ├── designer/
│   │   │   ├── DesignerWorkspace.tsx     # Main preview area
│   │   │   ├── DesignerToolbar.tsx       # Header and global actions
│   │   │   ├── DesignControls.tsx        # Customization panel
│   │   │   └── ViewSelector.tsx          # Front/Back/Side view switcher
│   │   │
│   │   ├── shirt/
│   │   │   └── ShirtRenderer.tsx         # SVG component system
│   │   │
│   │   └── controls/                     # Individual control components (integrated in DesignControls)
│   │
│   ├── engine/
│   │   ├── rendering/                    # SVG rendering logic (integrated in ShirtRenderer)
│   │   ├── configuration/
│   │   │   └── designStore.ts            # Zustand store with history, persistence, export
│   │   ├── validation/
│   │   │   └── designValidator.ts        # Schema validation engine
│   │   ├── history/                      # Integrated in designStore
│   │   └── export/
│   │       └── exportEngine.ts           # JSON/PNG export logic
│   │
│   ├── adapters/
│   │   ├── fabricCatalogAdapter.ts       # Module 02 integration (mock/production)
│   │   ├── module01Integration.tsx       # Module 01 embeddable component
│   │   └── module04Integration.ts        # Module 04 handoff contract
│   │
│   ├── hooks/                            # Custom hooks (future expansion)
│   ├── types/
│   │   └── design.ts                     # Canonical schema and types
│   ├── utils/                            # Utility functions
│   └── styles/
│       └── index.css                     # Tailwind base styles
│
├── docs/                                 # Documentation (Phase 17)
├── tests/                                # Automated tests (Phase 16)
├── public/                               # Static assets
├── README.md                             # Project overview
├── ARCHITECTURE.md                       # This document
├── DESIGN_SCHEMA.md                      # Schema documentation
├── INTEGRATION.md                        # Integration contracts
├── TESTING.md                            # Test documentation
├── CHANGELOG.md                          # Version history
├── CONTRIBUTING.md                       # Contribution guide
├── LICENSE                               # MIT License
└── package.json                          # Dependencies and scripts
```

## 3. Separation of Concerns (Phase 5.3)
1. **Rendering:** `ShirtRenderer.tsx` (SVG components with stable IDs)
2. **Design State:** `designStore.ts` (Zustand with history, persistence, export)
3. **Customization Controls:** `DesignControls.tsx` (Fabric, Color, Collar, etc.)
4. **Configuration Validation:** `designValidator.ts` (Schema validation)
5. **Fabric Integration:** `fabricCatalogAdapter.ts` (Module 02 adapter)
6. **Persistence:** `designStore.ts` (LocalStorage/Adapter)
7. **Export:** `exportEngine.ts` (JSON/PNG)
8. **External Integration:** `module01Integration.tsx`, `module04Integration.ts`

## 4. Implementation Status (Phase 21)
- **Phase 01 (Audit):** ✅ Completed (AUDIT_REPORT.md)
- **Phase 02 (Architecture):** ✅ Completed (this document)
- **Phase 03 (SVG System):** ✅ Completed (ShirtRenderer.tsx)
- **Phase 04 (Controls):** ✅ Completed (DesignControls.tsx)
- **Phase 05 (State):** ✅ Completed (designStore.ts)
- **Phase 06 (Fabric):** ✅ Completed (fabricCatalogAdapter.ts)
- **Phase 07 (Schema):** ✅ Completed (design.ts, designValidator.ts)
- **Phase 08 (Persistence):** ✅ Completed (designStore.ts)
- **Phase 09 (History):** ✅ Completed (designStore.ts)
- **Phase 10 (Export):** ✅ Completed (exportEngine.ts)
- **Phase 11 (Integration):** ✅ Completed (module01Integration.tsx, module04Integration.ts)
- **Phase 12 (Testing):** ⏳ In progress
- **Phase 13 (Documentation):** ⏳ In progress
- **Phase 14 (GitHub):** ⏳ In progress
- **Phase 15 (Handoff):** ⏳ In progress

## 5. Key Architectural Decisions
- **SVG Identifiers:** Stable IDs (shirt-body, shirt-left-sleeve, etc.) per Phase 6.3
- **Schema Versioning:** 1.0.0 with explicit validation (Phase 10)
- **History Management:** Immutable state updates with undo/redo/reset (Phase 8.1)
- **Fabric Adapter:** Mock development implementation with production placeholder (Phase 9)
- **Module Integration:** Documented contracts for Modules 01, 02, 04 (Phase 13-14)
