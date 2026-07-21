// ==========================================
// API Service
// ==========================================
import { CONFIG } from '../config.js';
import { DEMO } from './demo.js';

export const API = {
  /**
   * Generic fetch wrapper for RescueGroups API
   * @param {string} endpoint - API endpoint path
   * @param {object} options - Additional fetch options
   * @returns {Promise<object>} - JSON response
   */
  async request(endpoint, options = {}) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': CONFIG.RESCUE_GROUPS_API_KEY,
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  },

  /**
   * Check if API key is configured
   * @returns {boolean}
   */
  isConfigured() {
    return CONFIG.RESCUE_GROUPS_API_KEY && CONFIG.RESCUE_GROUPS_API_KEY !== 'YOUR_API_KEY_HERE';
  },

  /**
   * Fetch animals with optional filters (uses demo data when not configured)
   * @param {object} filters - Filter criteria
   * @param {number} page - Page number
   * @returns {Promise<object>} - Animal data
   */
  async getAnimals(filters = {}, page = 1) {
    // Demo mode: return sample data when no API key is configured
    if (!this.isConfigured()) {
      return DEMO.getAnimals(filters, page);
    }

    const queryParams = new URLSearchParams({
      limit: CONFIG.ITEMS_PER_PAGE,
      page: page,
      include: 'pictures',
      sort: '-updatedDate',
    });

    // Build filter query
    const filterConditions = [];
    if (filters.species) filterConditions.push({ fieldName: 'species', operation: 'equals', criteria: filters.species });
    if (filters.breed) filterConditions.push({ fieldName: 'breedPrimary', operation: 'contains', criteria: filters.breed });
    if (filters.age) filterConditions.push({ fieldName: 'ageGroup', operation: 'equals', criteria: filters.age });
    if (filters.gender) filterConditions.push({ fieldName: 'sex', operation: 'equals', criteria: filters.gender });
    if (filters.size) filterConditions.push({ fieldName: 'sizeGroup', operation: 'equals', criteria: filters.size });
    if (filters.search) filterConditions.push({ fieldName: 'name', operation: 'contains', criteria: filters.search });

    const body = filterConditions.length > 0
      ? { data: { filterProcessing: 'and', filterCriteria: filterConditions } }
      : undefined;

    return this.request(`/public/animals?${queryParams}`, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * Fetch a single animal by ID (uses demo data when not configured)
   * @param {string|number} id - Animal ID
   * @returns {Promise<object>} - Animal data
   */
  async getAnimalById(id) {
    // Demo mode: return sample data
    if (!this.isConfigured()) {
      return DEMO.getAnimalById(id);
    }

    return this.request(`/public/animals/${id}?include=pictures,org`);
  },
};