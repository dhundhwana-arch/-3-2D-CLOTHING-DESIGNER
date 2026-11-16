// SVG Shirt Component System (Phase 6)
import React from 'react'
import { DesignConfiguration, SVG_IDENTIFIERS } from '../../types/design'

interface ShirtRendererProps {
  design: DesignConfiguration
  view: 'front' | 'back' | 'side'
  width?: number
  height?: number
}

// Base SVG dimensions (proportional)
const VIEWBOX = '0 0 400 600'

export const ShirtRenderer: React.FC<ShirtRendererProps> = ({
  design,
  view,
  width = 400,
  height = 600,
}) => {
  const { components, fabric } = design

  // Helper to get color from fabric or component
  const getColor = (hex?: string) => hex || components.color_hex || '#0000FF'

  return (
    <svg
      viewBox={VIEWBOX}
      width={width}
      height={height}
      className="shirt-svg"
      aria-label={`2D Shirt Preview - ${view} view`}
      role="img"
    >
      <defs>
        {/* Fabric patterns and gradients could go here */}
        <pattern
          id="fabric-pattern"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill={getColor(fabric.fabric_id === 'FAB-DEFAULT' ? '#E5E7EB' : components.color_hex)} />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="white" />

      {/* Render components based on view */}
      {view === 'front' && (
        <g>
          {/* Body (Phase 6.2) */}
          <path
            id={SVG_IDENTIFIERS.BODY}
            d="M200,50 C200,50 150,100 150,150 L150,450 C150,500 200,550 200,550 C200,550 250,500 250,450 L250,150 C250,100 200,50 200,50 Z"
            fill={getColor(components.color_hex)}
            stroke="#333"
            strokeWidth="2"
            className="component-layer"
          />

          {/* Collar (Phase 6.2) */}
          {components.collar.style === 'classic' && (
            <path
              id={SVG_IDENTIFIERS.COLLAR}
              d="M170,100 L230,100 L200,70 Z"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="1"
              className="component-layer"
            />
          )}

          {/* Left Sleeve (Phase 6.2) */}
          {components.sleeves.style === 'full' && (
            <path
              id={SVG_IDENTIFIERS.LEFT_SLEEVE}
              d="M150,150 C150,150 100,250 100,350 L120,350 C120,250 150,150 150,150 Z"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="2"
              className="component-layer"
            />
          )}

          {/* Right Sleeve (Phase 6.2) */}
          {components.sleeves.style === 'full' && (
            <path
              id={SVG_IDENTIFIERS.RIGHT_SLEEVE}
              d="M250,150 C250,150 300,250 300,350 L280,350 C280,250 250,150 250,150 Z"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="2"
              className="component-layer"
            />
          )}

          {/* Left Cuff (Phase 6.2) */}
          {components.sleeves.style === 'full' && components.cuffs.style === 'standard' && (
            <rect
              id={SVG_IDENTIFIERS.LEFT_CUFF}
              x="90"
              y="350"
              width="30"
              height="30"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="1"
              className="component-layer"
            />
          )}

          {/* Right Cuff (Phase 6.2) */}
          {components.sleeves.style === 'full' && components.cuffs.style === 'standard' && (
            <rect
              id={SVG_IDENTIFIERS.RIGHT_CUFF}
              x="280"
              y="350"
              width="30"
              height="30"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="1"
              className="component-layer"
            />
          )}

          {/* Pockets (Phase 6.2) */}
          {components.pockets.style === 'single' && (
            <rect
              id={SVG_IDENTIFIERS.LEFT_POCKET}
              x="170"
              y="250"
              width="60"
              height="50"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="1"
              className="component-layer"
            />
          )}

          {components.pockets.style === 'double' && (
            <>
              <rect
                id={SVG_IDENTIFIERS.LEFT_POCKET}
                x="150"
                y="250"
                width="50"
                height="40"
                fill={getColor(components.color_hex)}
                stroke="#333"
                strokeWidth="1"
                className="component-layer"
              />
              <rect
                id={SVG_IDENTIFIERS.RIGHT_POCKET}
                x="200"
                y="250"
                width="50"
                height="40"
                fill={getColor(components.color_hex)}
                stroke="#333"
                strokeWidth="1"
                className="component-layer"
              />
            </>
          )}

          {/* Buttons (Phase 6.2) */}
          <g id={SVG_IDENTIFIERS.BUTTONS}>
            {[180, 230, 280, 330, 380].map((y, index) => (
              <circle
                key={index}
                cx="200"
                cy={y}
                r="5"
                fill="#333"
                className="component-layer"
              />
            ))}
          </g>

          {/* Stitching (Phase 6.2) */}
          <path
            id={SVG_IDENTIFIERS.STITCHING}
            d="M150,150 L250,150 M150,450 L250,450"
            stroke={components.thread.color_hex}
            strokeWidth="1"
            strokeDasharray="4 2"
            className="component-layer"
          />
        </g>
      )}

      {view === 'back' && (
        <g>
          {/* Back Body */}
          <path
            id={SVG_IDENTIFIERS.BODY}
            d="M200,50 C200,50 150,100 150,150 L150,450 C150,500 200,550 200,550 C200,550 250,500 250,450 L250,150 C250,100 200,50 200,50 Z"
            fill={getColor(components.color_hex)}
            stroke="#333"
            strokeWidth="2"
            className="component-layer"
          />
          
          {/* Back Stitching */}
          <path
            id={SVG_IDENTIFIERS.STITCHING}
            d="M150,150 L250,150 M150,450 L250,450"
            stroke={components.thread.color_hex}
            strokeWidth="1"
            strokeDasharray="4 2"
            className="component-layer"
          />
        </g>
      )}

      {view === 'side' && (
        <g>
          {/* Side Profile */}
          <path
            id={SVG_IDENTIFIERS.BODY}
            d="M200,50 C200,50 170,100 170,150 L170,450 C170,500 200,550 200,550 C200,550 230,500 230,450 L230,150 C230,100 200,50 200,50 Z"
            fill={getColor(components.color_hex)}
            stroke="#333"
            strokeWidth="2"
            className="component-layer"
          />
          
          {/* Side Sleeve */}
          {components.sleeves.style === 'full' && (
            <path
              id={SVG_IDENTIFIERS.LEFT_SLEEVE}
              d="M170,150 C170,150 140,250 140,350 L160,350 C160,250 170,150 170,150 Z"
              fill={getColor(components.color_hex)}
              stroke="#333"
              strokeWidth="2"
              className="component-layer"
            />
          )}
        </g>
      )}
    </svg>
  )
}