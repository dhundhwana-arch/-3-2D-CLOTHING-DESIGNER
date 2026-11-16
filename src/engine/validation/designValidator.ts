// Validation Engine (Phase 10.4)
import { DesignConfiguration } from '../../types/design'

export class DesignValidator {
  static validate(config: DesignConfiguration): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Schema version check
    if (!config.schema_version || !config.schema_version.match(/^\d+\.\d+\.\d+$/)) {
      errors.push('Invalid or missing schema version')
    }

    // Design ID check
    if (!config.design_id || !config.design_id.startsWith('DSG-')) {
      errors.push('Invalid design ID format')
    }

    // Fabric check
    if (!config.fabric.fabric_id) {
      errors.push('Missing fabric ID')
    }

    // Component validation
    const { components } = config
    
    // Color validation (HEX)
    if (!/^#[0-9A-F]{6}$/i.test(components.color_hex)) {
      errors.push('Invalid color HEX format')
    }

    // Collar style validation
    const validCollarStyles = ['classic', 'spread', 'button_down', 'mandarin']
    if (!validCollarStyles.includes(components.collar.style)) {
      errors.push(`Invalid collar style: ${components.collar.style}`)
    }

    // Sleeve style validation
    const validSleeveStyles = ['full', 'half']
    if (!validSleeveStyles.includes(components.sleeves.style)) {
      errors.push(`Invalid sleeve style: ${components.sleeves.style}`)
    }

    // Cuff style validation
    const validCuffStyles = ['standard', 'button', 'other']
    if (!validCuffStyles.includes(components.cuffs.style)) {
      errors.push(`Invalid cuff style: ${components.cuffs.style}`)
    }

    // Pocket style validation
    const validPocketStyles = ['none', 'single', 'double']
    if (!validPocketStyles.includes(components.pockets.style)) {
      errors.push(`Invalid pocket style: ${components.pockets.style}`)
    }

    // Button style validation
    const validButtonStyle = ['basic', 'designer', 'premium']
    if (!validButtonStyle.includes(components.buttons.style)) {
      errors.push(`Invalid button style: ${components.buttons.style}`)
    }

    // Thread color validation
    if (!/^#[0-9A-F]{6}$/i.test(components.thread.color_hex)) {
      errors.push('Invalid thread color HEX format')
    }

    // Fit type validation
    const validFitTypes = ['regular', 'slim']
    if (!validFitTypes.includes(components.fit.type)) {
      errors.push(`Invalid fit type: ${components.fit.type}`)
    }

    // Metadata validation
    const validViews = ['front', 'back', 'side']
    if (!validViews.includes(config.metadata.current_view)) {
      errors.push(`Invalid current view: ${config.metadata.current_view}`)
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static getExampleConfig(): DesignConfiguration {
    return {
      design_id: 'DSG-EXAMPLE',
      schema_version: '1.0.0',
      product_type: 'shirt',
      fabric: { fabric_id: 'FAB-001' },
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
    }
  }
}