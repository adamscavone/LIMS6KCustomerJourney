// Confident Cannabis API Service
// This service will handle all Confident Cannabis API interactions

class ConfidentCannabisService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_CC_API_URL || '';
    this.apiKey = process.env.REACT_APP_CC_API_KEY || '';
  }

  // Create a new order
  async createOrder(orderData) {
    // In production: POST /api/v1/orders
    // Expected orderData structure:
    // {
    //   order_number: 'YYMM-NCTL-####',
    //   client_id: 'client_uuid',
    //   samples: [{
    //     sample_number: 'YYMM-NCTL-####.#####',
    //     metrc_tag: '24-character-tag',
    //     sample_type: 'flower',
    //     tests_requested: ['cannabinoids', 'terpenes'],
    //     ...
    //   }]
    // }
    return {
      data: {
        order_id: null,
        order_number: orderData.order_number,
        status: 'created'
      },
      error: null
    };
  }

  // Get order by ID
  async getOrderById(orderId) {
    // In production: GET /api/v1/orders/{orderId}
    return {
      data: null,
      error: null
    };
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    // In production: PATCH /api/v1/orders/{orderId}
    return {
      data: {
        order_id: orderId,
        status: status
      },
      error: null
    };
  }

  // Get client list with CC accounts
  async getClients() {
    // In production: GET /api/v1/clients
    return {
      data: [],
      error: null
    };
  }

  // Get sample types mapping
  async getSampleTypes() {
    // In production: GET /api/v1/sample-types
    return {
      data: [],
      error: null
    };
  }

  // Map internal sample type to CC sample type
  mapSampleType(internalType) {
    // This would be populated from the API in production
    const typeMapping = {
      'flower_indoor': 'flower',
      'flower_outdoor': 'flower',
      'flower_greenhouse': 'flower',
      'preroll_single': 'preroll',
      'preroll_multi': 'preroll',
      'concentrate_shatter': 'concentrate',
      'concentrate_wax': 'concentrate',
      'concentrate_oil': 'concentrate',
      'concentrate_rosin': 'concentrate',
      'edible_chocolate': 'edible',
      'edible_gummy': 'edible',
      'edible_beverage': 'edible',
      'topical_lotion': 'topical',
      'topical_balm': 'topical',
      'vape_cartridge': 'vape',
      'vape_disposable': 'vape'
    };
    
    return typeMapping[internalType] || 'other';
  }

  // Submit test results
  async submitTestResults(orderId, results) {
    // In production: POST /api/v1/orders/{orderId}/results
    return {
      success: true,
      error: null
    };
  }

  // Generate order number
  generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const sequence = Math.floor(Math.random() * 9000) + 1000; // In production, use database sequence
    
    return `${year}${month}-NCTL-${sequence}`;
  }

  // Generate sample number
  generateSampleNumber(orderNumber, sampleIndex) {
    return `${orderNumber}.${(sampleIndex + 1).toString().padStart(5, '0')}`;
  }

  // Validate order number format
  validateOrderNumber(orderNumber) {
    const pattern = /^\d{4}-NCTL-\d{4}$/;
    return pattern.test(orderNumber);
  }

  // Validate sample number format
  validateSampleNumber(sampleNumber) {
    const pattern = /^\d{4}-NCTL-\d{4}\.\d{5}$/;
    return pattern.test(sampleNumber);
  }

  // Format test results for CC API
  formatTestResults(results) {
    // Transform internal result format to CC API format
    return results.map(result => ({
      analyte: result.analyte,
      value: result.value,
      unit: result.unit,
      lod: result.lod,
      loq: result.loq,
      status: result.status
    }));
  }
}

// Export singleton instance
export default new ConfidentCannabisService();