// Export Engine (Phase 12)
import { DesignConfiguration } from '../../types/design'
import { DesignValidator } from '../validation/designValidator'

export class ExportEngine {
  // JSON Export (Phase 12.1)
  static exportJSON(config: DesignConfiguration): string {
    const validation = DesignValidator.validate(config)
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
    }

    return JSON.stringify(config, null, 2)
  }

  // PNG Export (Phase 12.2)
  // Real implementation: SVG-to-canvas conversion
  static async exportPNG(
    svgElement: SVGElement | null = null,
    width: number = 800,
    height: number = 1200,
    filename: string = 'shirt-design-preview.png'
  ): Promise<Blob> {
    if (!svgElement) {
      throw new Error('SVG element required for PNG export')
    }

    // 1. Serialize SVG to XML
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    
    // 2. Create Blob from XML with proper SVG namespace
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    // 3. Create Image from Blob
    const img = new Image()
    
    // Return a Promise that resolves when image loads
    return new Promise<Blob>((resolve, reject) => {
      img.onload = () => {
        // 4. Draw Image to Canvas with correct proportions
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }

        // Fill background (transparent by default, or white)
        ctx.fillStyle = 'transparent' // Use transparent background
        ctx.fillRect(0, 0, width, height)

        // Calculate aspect ratio preservation
        const viewBoxStr = svgElement.getAttribute('viewBox')
        const svgRatio = viewBoxStr 
          ? parseFloat(viewBoxStr.split(' ')[3]) / parseFloat(viewBoxStr.split(' ')[2])
          : height / width
        
        const drawWidth = width
        const drawHeight = width * svgRatio
        const offsetY = (height - drawHeight) / 2

        // Draw SVG to canvas
        ctx.drawImage(img, 0, offsetY, drawWidth, drawHeight)

        // 5. Convert Canvas to Blob (PNG)
        canvas.toBlob(
          (blob: Blob | null) => {
            URL.revokeObjectURL(url)
            if (blob) {
              // Trigger download
              const downloadLink = document.createElement('a')
              downloadLink.href = URL.createObjectURL(blob)
              downloadLink.download = filename
              document.body.appendChild(downloadLink)
              downloadLink.click()
              document.body.removeChild(downloadLink)
              URL.revokeObjectURL(downloadLink.href)
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob from canvas'))
            }
          },
          'image/png'
        )
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load SVG image'))
      }
      
      img.src = url
    })
  }

  // Validate export compatibility (Phase 12.3)
  static validateExport(config: DesignConfiguration): boolean {
    const validation = DesignValidator.validate(config)
    return validation.isValid
  }
}