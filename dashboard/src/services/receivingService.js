// Receiving Service
// Central service for managing sample receiving operations

import metrcService from './metrcService';
import confidentCannabisService from './confidentCannabisService';

class ReceivingService {
  constructor() {
    this.pendingManifests = new Map();
  }

  // Process a complete manifest
  async processManifest(manifestId, samples, options = {}) {
    try {
      // Validate manifest
      if (!metrcService.validateManifestId(manifestId)) {
        throw new Error('Invalid manifest ID format');
      }

      // Validate all samples
      const validationErrors = this.validateSamples(samples);
      if (validationErrors.length > 0) {
        return {
          success: false,
          errors: validationErrors
        };
      }

      // Generate order number
      const orderNumber = confidentCannabisService.generateOrderNumber();

      // Assign sample numbers
      const processedSamples = samples.map((sample, index) => ({
        ...sample,
        sampleNumber: confidentCannabisService.generateSampleNumber(orderNumber, index),
        receivedDate: new Date(),
        status: 'received'
      }));

      // Store in pending manifests (in production, save to database)
      this.pendingManifests.set(manifestId, {
        manifestId,
        orderNumber,
        samples: processedSamples,
        processedAt: new Date(),
        processedBy: 'Jess Bowersox', // In production, get from auth context
        ...options
      });

      // If Confident Cannabis integration is enabled
      if (options.createCCOrder) {
        const ccOrder = await this.createConfidentCannabisOrder(
          orderNumber,
          processedSamples,
          options.clientId
        );
        
        if (ccOrder.error) {
          console.error('CC order creation failed:', ccOrder.error);
        }
      }

      return {
        success: true,
        data: {
          manifestId,
          orderNumber,
          sampleCount: processedSamples.length,
          samples: processedSamples
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Validate samples
  validateSamples(samples) {
    const errors = [];

    samples.forEach((sample, index) => {
      // Validate METRC tag
      if (!metrcService.validateMetrcTag(sample.metrcTag)) {
        errors.push({
          sampleIndex: index,
          field: 'metrcTag',
          message: 'Invalid METRC tag format'
        });
      }

      // Validate test category
      if (!sample.testCategory) {
        errors.push({
          sampleIndex: index,
          field: 'testCategory',
          message: 'Test category is required'
        });
      }

      // Validate enhanced sample type
      if (!sample.enhancedType) {
        errors.push({
          sampleIndex: index,
          field: 'enhancedType',
          message: 'Sample type is required'
        });
      }

      // Validate weight or unit count
      if (sample.grossWeight <= 0 && sample.unitCount <= 0) {
        errors.push({
          sampleIndex: index,
          field: 'quantity',
          message: 'Either weight or unit count must be provided'
        });
      }

      // Validate cannabinoid targets if required
      if (sample.requiresAllTests && !sample.cannabinoidTargets) {
        // This is a warning, not an error
        console.warn(`Sample ${index} requires cannabinoid targets but none set`);
      }
    });

    return errors;
  }

  // Create Confident Cannabis order
  async createConfidentCannabisOrder(orderNumber, samples, clientId) {
    const ccSamples = samples.map(sample => ({
      sample_number: sample.sampleNumber,
      metrc_tag: sample.metrcTag,
      sample_type: confidentCannabisService.mapSampleType(sample.enhancedType),
      tests_requested: this.getRequestedTests(sample),
      strain: sample.strain,
      weight: sample.grossWeight || null,
      unit_count: sample.unitCount || null
    }));

    const orderData = {
      order_number: orderNumber,
      client_id: clientId,
      samples: ccSamples
    };

    return await confidentCannabisService.createOrder(orderData);
  }

  // Get requested tests based on sample configuration
  getRequestedTests(sample) {
    const tests = [];

    // Base tests from test category
    if (sample.requiresAllTests) {
      tests.push('cannabinoids', 'pesticides', 'microbials', 'mycotoxins');
    } else {
      // Minimal testing based on category
      switch (sample.testCategory) {
        case 'PPPT':
          tests.push('cannabinoids');
          break;
        case 'PPM':
          tests.push('pesticides', 'mycotoxins');
          break;
        default:
          tests.push('cannabinoids');
      }
    }

    // Additional tests
    if (sample.additionalTests) {
      tests.push(...sample.additionalTests);
    }

    // Remove duplicates
    return [...new Set(tests)];
  }

  // Calculate turnaround times
  calculateTurnaroundTimes(sample) {
    const baseTime = 3; // Business days
    let totalTime = baseTime;

    // Rush samples
    if (sample.isRush) {
      totalTime = Math.max(1, totalTime - 2);
    }

    // Additional tests add time
    if (sample.additionalTests?.includes('terpenes')) {
      totalTime += 1;
    }

    // Confirmations take longer
    if (sample.needsConfirmation) {
      totalTime += 2;
    }

    return {
      standard: totalTime,
      rush: Math.max(1, totalTime - 2),
      goalDate: this.addBusinessDays(new Date(), totalTime - 1),
      reportingDueDate: this.addBusinessDays(new Date(), totalTime)
    };
  }

  // Add business days to a date
  addBusinessDays(date, days) {
    const result = new Date(date);
    let daysAdded = 0;

    while (daysAdded < days) {
      result.setDate(result.getDate() + 1);
      
      // Skip weekends
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        daysAdded++;
      }
    }

    return result;
  }

  // Get pending manifests
  getPendingManifests() {
    return Array.from(this.pendingManifests.values());
  }

  // Clear processed manifest
  clearManifest(manifestId) {
    this.pendingManifests.delete(manifestId);
  }

  // Get manifest by ID
  getManifest(manifestId) {
    return this.pendingManifests.get(manifestId);
  }
}

// Export singleton instance
export default new ReceivingService();