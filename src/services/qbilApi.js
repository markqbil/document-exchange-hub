/**
 * Qbil Trade API Service
 *
 * This service layer handles all communication with the Qbil Trade API.
 * Currently using mock data for sandbox environment.
 *
 * To connect to real API:
 * 1. Set REACT_APP_QBIL_API_URL in .env file
 * 2. Set REACT_APP_QBIL_API_TOKEN in .env file
 * 3. Set REACT_APP_USE_MOCK_API=false to use real API
 */

const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API !== 'false';
const API_BASE_URL = process.env.REACT_APP_QBIL_API_URL || 'https://api.qbiltrade.com/api/v1';
const API_TOKEN = process.env.REACT_APP_QBIL_API_TOKEN || '';

// Mock data for sandbox environment
const mockOrders = [
  {
    id: 'ORD-2024-001',
    type: 'Sales Order',
    orderNumber: 'SC-2024-001',
    status: 'confirmed',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    supplier: { id: 1, name: 'Global Ingredients Co.', code: 'GIC001' },
    customer: { id: 100, name: 'Your Company', code: 'YC001' },
    items: [
      {
        id: 1,
        product: 'Vanilla Extract',
        productCode: 'VAN-EXT-001',
        quantity: 100,
        unit: 'kg',
        price: 250,
        internalProductCode: null
      },
      {
        id: 2,
        product: 'Cinnamon Powder',
        productCode: 'CIN-PWD-050',
        quantity: 50,
        unit: 'kg',
        price: 180,
        internalProductCode: null
      }
    ],
    priority: 'high',
    totalAmount: 34000
  },
  {
    id: 'ORD-2024-002',
    type: 'Purchase Order',
    orderNumber: 'PO-2024-002',
    status: 'pending',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-14T15:45:00Z',
    supplier: { id: 2, name: 'Premium Foods Ltd.', code: 'PFL002' },
    customer: { id: 100, name: 'Your Company', code: 'YC001' },
    items: [
      {
        id: 3,
        product: 'Organic Sugar',
        productCode: 'ORG-SUG-100',
        quantity: 200,
        unit: 'kg',
        price: 120,
        internalProductCode: null
      }
    ],
    priority: 'normal',
    totalAmount: 24000
  },
  {
    id: 'ORD-2024-003',
    type: 'Sales Order',
    orderNumber: 'SC-2024-003',
    status: 'confirmed',
    createdAt: '2024-03-13T09:20:00Z',
    updatedAt: '2024-03-13T09:20:00Z',
    supplier: { id: 3, name: 'Natural Spices Inc.', code: 'NSI003' },
    customer: { id: 100, name: 'Your Company', code: 'YC001' },
    items: [
      {
        id: 4,
        product: 'Black Pepper',
        productCode: 'BLK-PEP-001',
        quantity: 75,
        unit: 'kg',
        price: 300,
        internalProductCode: null
      },
      {
        id: 5,
        product: 'Turmeric Powder',
        productCode: 'TUR-PWD-025',
        quantity: 60,
        unit: 'kg',
        price: 150,
        internalProductCode: null
      }
    ],
    priority: 'normal',
    totalAmount: 31500
  }
];

const mockAddresses = [
  {
    id: 1,
    name: 'Global Ingredients Co.',
    code: 'GIC001',
    status: 'active',
    email: 'contact@globalingredients.com',
    phone: '+1-555-0100',
    country: 'United States'
  },
  {
    id: 2,
    name: 'Premium Foods Ltd.',
    code: 'PFL002',
    status: 'active',
    email: 'info@premiumfoods.com',
    phone: '+44-20-1234-5678',
    country: 'United Kingdom'
  },
  {
    id: 3,
    name: 'Natural Spices Inc.',
    code: 'NSI003',
    status: 'active',
    email: 'sales@naturalspices.com',
    phone: '+91-11-2345-6789',
    country: 'India'
  },
  {
    id: 4,
    name: 'Fresh Produce Partners',
    code: 'FPP004',
    status: 'active',
    email: 'orders@freshproduce.com',
    phone: '+31-20-123-4567',
    country: 'Netherlands'
  }
];

// Mock products from your root data (internal products)
const mockProducts = [
  { id: 1, code: 'WPC80', description: 'Whey Powder Concentrate 80%', category: 'Dairy', unit: 'kg', active: true },
  { id: 2, code: 'VE-100', description: 'Vanilla Extract 100%', category: 'Flavoring', unit: 'kg', active: true },
  { id: 3, code: 'CP-FINE', description: 'Cinnamon Powder (Fine Grade)', category: 'Spices', unit: 'kg', active: true },
  { id: 4, code: 'BP-WHOLE', description: 'Black Pepper (Whole)', category: 'Spices', unit: 'kg', active: true },
  { id: 5, code: 'SUG-ORG', description: 'Sugar Organic', category: 'Sweeteners', unit: 'kg', active: true },
  { id: 6, code: 'TUR-PWD', description: 'Turmeric Powder', category: 'Spices', unit: 'kg', active: true },
  { id: 7, code: 'WPI90', description: 'Whey Protein Isolate 90%', category: 'Dairy', unit: 'kg', active: true },
  { id: 8, code: 'COCO-OIL', description: 'Coconut Oil Virgin', category: 'Oils', unit: 'L', active: true },
];

// Mock units of measure from root data
const mockUnits = [
  { id: 1, code: 'KG', description: 'Kilogram', active: true },
  { id: 2, code: 'L', description: 'Liter', active: true },
  { id: 3, code: 'PCS', description: 'Pieces', active: true },
  { id: 4, code: 'BOX', description: 'Box', active: true },
  { id: 5, code: 'PALLET', description: 'Pallet', active: true },
];

// Mock packaging types from root data
const mockPackaging = [
  { id: 1, code: 'BAG', description: 'Bag', active: true },
  { id: 2, code: 'BOX', description: 'Box', active: true },
  { id: 3, code: 'DRUM', description: 'Drum', active: true },
  { id: 4, code: 'PALLET', description: 'Pallet', active: true },
  { id: 5, code: 'CONTAINER', description: 'Container', active: true },
];

// Mock payment terms from root data
const mockPaymentTerms = [
  { id: 1, code: 'NET30', description: '30 days net', active: true },
  { id: 2, code: 'NET60', description: '60 days net', active: true },
  { id: 3, code: 'COD', description: 'Cash on delivery', active: true },
  { id: 4, code: 'PREPAY', description: 'Prepayment', active: true },
];

// Mock delivery terms (Incoterms) from root data
const mockDeliveryTerms = [
  { id: 1, code: 'EXW', description: 'Ex Works', active: true },
  { id: 2, code: 'FOB', description: 'Free On Board', active: true },
  { id: 3, code: 'CIF', description: 'Cost, Insurance and Freight', active: true },
  { id: 4, code: 'DDP', description: 'Delivered Duty Paid', active: true },
];

// Generic mappings structure - supports all root data types
// Each mapping is relationship-specific (tied to a trading partner)
const mockMappings = [
  // Product mappings
  {
    id: 1,
    mappingType: 'product',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: 'VAN-EXT-001',
    theirDescription: 'Vanilla Extract Premium',
    ourRootDataId: 2,
    ourCode: 'VE-100',
    ourDescription: 'Vanilla Extract 100%',
    confidence: 95,
    usage: 12,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z'
  },
  {
    id: 2,
    mappingType: 'product',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: 'CIN-PWD-050',
    theirDescription: 'Cinnamon Powder Fine',
    ourRootDataId: 3,
    ourCode: 'CP-FINE',
    ourDescription: 'Cinnamon Powder (Fine Grade)',
    confidence: 88,
    usage: 8,
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-03-08T09:15:00Z'
  },
  {
    id: 3,
    mappingType: 'product',
    partnerId: 3,
    partnerName: 'Natural Spices Inc.',
    partnerCode: 'NSI003',
    theirCode: 'BLK-PEP-001',
    theirDescription: 'Black Pepper Whole',
    ourRootDataId: 4,
    ourCode: 'BP-WHOLE',
    ourDescription: 'Black Pepper (Whole)',
    confidence: 92,
    usage: 15,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-03-12T16:45:00Z'
  },
  {
    id: 4,
    mappingType: 'product',
    partnerId: 2,
    partnerName: 'Premium Foods Ltd.',
    partnerCode: 'PFL002',
    theirCode: 'WPC80',
    theirDescription: 'Whey Powder Concentrate 80',
    ourRootDataId: 1,
    ourCode: 'WPC80',
    ourDescription: 'Whey Powder Concentrate 80%',
    confidence: 100,
    usage: 25,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 5,
    mappingType: 'product',
    partnerId: 2,
    partnerName: 'Premium Foods Ltd.',
    partnerCode: 'PFL002',
    theirCode: 'WP 80',
    theirDescription: 'Whey Powder 80',
    ourRootDataId: 1,
    ourCode: 'WPC80',
    ourDescription: 'Whey Powder Concentrate 80%',
    confidence: 85,
    usage: 3,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-03-01T11:30:00Z'
  },
  // Unit mappings
  {
    id: 6,
    mappingType: 'unit',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: 'kg',
    theirDescription: 'kilogram',
    ourRootDataId: 1,
    ourCode: 'KG',
    ourDescription: 'Kilogram',
    confidence: 100,
    usage: 45,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 7,
    mappingType: 'unit',
    partnerId: 2,
    partnerName: 'Premium Foods Ltd.',
    partnerCode: 'PFL002',
    theirCode: 'KGS',
    theirDescription: 'Kilograms',
    ourRootDataId: 1,
    ourCode: 'KG',
    ourDescription: 'Kilogram',
    confidence: 90,
    usage: 20,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-10T11:00:00Z'
  },
  // Packaging mappings
  {
    id: 8,
    mappingType: 'packaging',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: 'BAGS',
    theirDescription: 'Bags',
    ourRootDataId: 1,
    ourCode: 'BAG',
    ourDescription: 'Bag',
    confidence: 95,
    usage: 30,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-12T14:00:00Z'
  },
  {
    id: 9,
    mappingType: 'packaging',
    partnerId: 3,
    partnerName: 'Natural Spices Inc.',
    partnerCode: 'NSI003',
    theirCode: 'DRM',
    theirDescription: 'Drums',
    ourRootDataId: 3,
    ourCode: 'DRUM',
    ourDescription: 'Drum',
    confidence: 88,
    usage: 10,
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-03-08T09:00:00Z'
  },
  // Payment terms mappings
  {
    id: 10,
    mappingType: 'paymentTerms',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: '30_DAYS',
    theirDescription: '30 days payment',
    ourRootDataId: 1,
    ourCode: 'NET30',
    ourDescription: '30 days net',
    confidence: 92,
    usage: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-10T14:00:00Z'
  },
  {
    id: 11,
    mappingType: 'paymentTerms',
    partnerId: 2,
    partnerName: 'Premium Foods Ltd.',
    partnerCode: 'PFL002',
    theirCode: 'CASH_ON_DELIVERY',
    theirDescription: 'COD Payment',
    ourRootDataId: 3,
    ourCode: 'COD',
    ourDescription: 'Cash on delivery',
    confidence: 98,
    usage: 8,
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z'
  },
  // Delivery terms mappings
  {
    id: 12,
    mappingType: 'deliveryTerms',
    partnerId: 1,
    partnerName: 'Global Ingredients Co.',
    partnerCode: 'GIC001',
    theirCode: 'FOB',
    theirDescription: 'Free on Board',
    ourRootDataId: 2,
    ourCode: 'FOB',
    ourDescription: 'Free On Board',
    confidence: 100,
    usage: 25,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 13,
    mappingType: 'deliveryTerms',
    partnerId: 3,
    partnerName: 'Natural Spices Inc.',
    partnerCode: 'NSI003',
    theirCode: 'CIF_TERMS',
    theirDescription: 'Cost Insurance Freight',
    ourRootDataId: 3,
    ourCode: 'CIF',
    ourDescription: 'Cost, Insurance and Freight',
    confidence: 95,
    usage: 12,
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-03-08T11:00:00Z'
  }
];

/**
 * Helper function to simulate API delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, options = {}) {
  if (USE_MOCK_API) {
    // Simulate network delay for realistic behavior
    await delay(300 + Math.random() * 500);
    return null; // Mock implementation returns data directly from functions
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * Orders API
 */
export const ordersApi = {
  /**
   * Get all orders
   * @param {Object} params - Query parameters (page, limit, type, status)
   */
  async getOrders(params = {}) {
    if (USE_MOCK_API) {
      await delay(300);
      let filteredOrders = [...mockOrders];

      // Apply filters
      if (params.type) {
        filteredOrders = filteredOrders.filter(order =>
          order.type.toLowerCase().includes(params.type.toLowerCase())
        );
      }
      if (params.status) {
        filteredOrders = filteredOrders.filter(order => order.status === params.status);
      }

      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 40;
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        data: filteredOrders.slice(start, end),
        meta: {
          currentPage: page,
          totalPages: Math.ceil(filteredOrders.length / limit),
          totalItems: filteredOrders.length,
          itemsPerPage: limit
        }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/orders?${queryParams}`);
  },

  /**
   * Get a specific order by ID
   * @param {string} orderId - The order ID
   */
  async getOrder(orderId) {
    if (USE_MOCK_API) {
      await delay(200);
      const order = mockOrders.find(o => o.id === orderId);
      if (!order) throw new Error('Order not found');
      return order;
    }

    return await apiRequest(`/orders/${orderId}`);
  },

  /**
   * Get order documents
   * @param {string} orderId - The order ID
   */
  async getOrderDocuments(orderId) {
    if (USE_MOCK_API) {
      await delay(300);
      return {
        documents: [
          { type: 'invoice', reference: 'INV-001', url: '#' },
          { type: 'packing_list', reference: 'PL-001', url: '#' }
        ]
      };
    }

    return await apiRequest(`/orders/${orderId}/documents`);
  },

  /**
   * Download order document
   * @param {string} orderId - The order ID
   * @param {string} documentType - Document type
   * @param {string} documentReference - Document reference
   */
  async downloadDocument(orderId, documentType, documentReference) {
    if (USE_MOCK_API) {
      await delay(500);
      // Return mock blob URL
      return URL.createObjectURL(new Blob(['Mock PDF content'], { type: 'application/pdf' }));
    }

    const response = await fetch(
      `${API_BASE_URL}/orders/${orderId}/documents/${documentType}/${documentReference}`,
      {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
      }
    );

    if (!response.ok) throw new Error('Failed to download document');
    return URL.createObjectURL(await response.blob());
  }
};

/**
 * Addresses (Relations/Companies) API
 */
export const addressesApi = {
  /**
   * Get all addresses/companies
   * @param {Object} params - Query parameters
   */
  async getAddresses(params = {}) {
    if (USE_MOCK_API) {
      await delay(250);
      const filteredAddresses = [...mockAddresses];

      // Apply filters
      if (params.search) {
        const search = params.search.toLowerCase();
        return {
          data: filteredAddresses.filter(addr =>
            addr.name.toLowerCase().includes(search) ||
            addr.code.toLowerCase().includes(search)
          ),
          meta: { totalItems: filteredAddresses.length }
        };
      }

      return {
        data: filteredAddresses,
        meta: { totalItems: filteredAddresses.length }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/addresses?${queryParams}`);
  },

  /**
   * Get a specific address/company by ID
   */
  async getAddress(addressId) {
    if (USE_MOCK_API) {
      await delay(200);
      const address = mockAddresses.find(a => a.id === addressId);
      if (!address) throw new Error('Address not found');
      return address;
    }

    return await apiRequest(`/addresses/${addressId}`);
  }
};

/**
 * Products API (Root Data)
 * Get products from your internal product database
 */
export const productsApi = {
  /**
   * Get all products from root data
   * @param {Object} params - Query parameters (search, category)
   */
  async getProducts(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockProducts];

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.code.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }

      if (params.category) {
        filtered = filtered.filter(p => p.category === params.category);
      }

      if (params.active !== undefined) {
        filtered = filtered.filter(p => p.active === params.active);
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    // This would connect to Qbil API products endpoint
    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/products?${queryParams}`);
  },

  /**
   * Get a specific product by ID
   * @param {number} productId - The product ID
   */
  async getProduct(productId) {
    if (USE_MOCK_API) {
      await delay(150);
      const product = mockProducts.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      return product;
    }

    return await apiRequest(`/products/${productId}`);
  }
};

/**
 * Units API (Root Data)
 * Get units of measure from your internal database
 */
export const unitsApi = {
  /**
   * Get all units from root data
   * @param {Object} params - Query parameters (search, active)
   */
  async getUnits(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockUnits];

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(u =>
          u.code.toLowerCase().includes(search) ||
          u.description.toLowerCase().includes(search)
        );
      }

      if (params.active !== undefined) {
        filtered = filtered.filter(u => u.active === params.active);
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/units?${queryParams}`);
  }
};

/**
 * Packaging API (Root Data)
 * Get packaging types from your internal database
 */
export const packagingApi = {
  /**
   * Get all packaging types from root data
   * @param {Object} params - Query parameters (search, active)
   */
  async getPackaging(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockPackaging];

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.code.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }

      if (params.active !== undefined) {
        filtered = filtered.filter(p => p.active === params.active);
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/packaging?${queryParams}`);
  }
};

/**
 * Payment Terms API (Root Data)
 * Get payment terms from your internal database
 */
export const paymentTermsApi = {
  /**
   * Get all payment terms from root data
   * @param {Object} params - Query parameters (search, active)
   */
  async getPaymentTerms(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockPaymentTerms];

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.code.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }

      if (params.active !== undefined) {
        filtered = filtered.filter(p => p.active === params.active);
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/payment-terms?${queryParams}`);
  }
};

/**
 * Delivery Terms API (Root Data)
 * Get delivery terms (Incoterms) from your internal database
 */
export const deliveryTermsApi = {
  /**
   * Get all delivery terms from root data
   * @param {Object} params - Query parameters (search, active)
   */
  async getDeliveryTerms(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockDeliveryTerms];

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(d =>
          d.code.toLowerCase().includes(search) ||
          d.description.toLowerCase().includes(search)
        );
      }

      if (params.active !== undefined) {
        filtered = filtered.filter(d => d.active === params.active);
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    const queryParams = new URLSearchParams(params).toString();
    return await apiRequest(`/delivery-terms?${queryParams}`);
  }
};

/**
 * Mappings API (Custom for Document Hub)
 * Note: This is not part of Qbil Trade API - it's for our Hub's AI mapping feature
 * Mappings are relationship-specific (tied to a trading partner)
 * Supports all root data types: products, units, packaging, payment terms, delivery terms
 */
export const mappingsApi = {
  /**
   * Get all mappings (all types or filtered by type)
   * @param {Object} params - Query parameters (search, partnerId, mappingType)
   */
  async getMappings(params = {}) {
    if (USE_MOCK_API) {
      await delay(200);
      let filtered = [...mockMappings];

      // Filter by mapping type if specified
      if (params.mappingType) {
        filtered = filtered.filter(m => m.mappingType === params.mappingType);
      }

      // Filter by partner if specified
      if (params.partnerId) {
        filtered = filtered.filter(m => m.partnerId === parseInt(params.partnerId));
      }

      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(m =>
          m.theirCode.toLowerCase().includes(search) ||
          m.theirDescription.toLowerCase().includes(search) ||
          m.ourCode.toLowerCase().includes(search) ||
          m.ourDescription.toLowerCase().includes(search) ||
          m.partnerName.toLowerCase().includes(search)
        );
      }

      return {
        data: filtered,
        meta: { totalItems: filtered.length }
      };
    }

    // This would connect to your custom Hub API endpoint
    return await apiRequest(`/hub/mappings?${new URLSearchParams(params)}`);
  },

  /**
   * Create or update a mapping (supports all types)
   * @param {Object} mapping - The mapping object with mappingType field
   */
  async saveMapping(mapping) {
    if (USE_MOCK_API) {
      await delay(300);
      console.log('Saving mapping:', mapping);
      return { success: true, data: mapping };
    }

    return await apiRequest('/hub/mappings', {
      method: 'POST',
      body: JSON.stringify(mapping)
    });
  },

  /**
   * Delete a mapping (supports all types)
   * @param {number} mappingId - The mapping ID to delete
   */
  async deleteMapping(mappingId) {
    if (USE_MOCK_API) {
      await delay(200);
      console.log('Deleting mapping:', mappingId);
      return { success: true };
    }

    return await apiRequest(`/hub/mappings/${mappingId}`, {
      method: 'DELETE'
    });
  }
};

/**
 * User Profile API
 */
export const userApi = {
  /**
   * Get current user profile
   */
  async getMe() {
    if (USE_MOCK_API) {
      await delay(200);
      return {
        id: 1,
        email: 'admin@yourcompany.com',
        name: 'Admin User',
        company: 'Your Company',
        scopes: ['read:orders', 'write:orders', 'read:addresses'],
        webhookTopics: ['order.created', 'order.updated']
      };
    }

    return await apiRequest('/me');
  }
};

/**
 * Utility function to check if we're using mock API
 */
export const isUsingMockApi = () => USE_MOCK_API;

export default {
  orders: ordersApi,
  addresses: addressesApi,
  products: productsApi,
  units: unitsApi,
  packaging: packagingApi,
  paymentTerms: paymentTermsApi,
  deliveryTerms: deliveryTermsApi,
  mappings: mappingsApi,
  user: userApi,
  isUsingMockApi
};
