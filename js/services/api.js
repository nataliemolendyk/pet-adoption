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
          'Content-Type': 'application/vnd.api+json',
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

      // Build views for the URL based on species filter
      // RescueGroups API uses views like: available/dogs, available/cats, etc.
      const speciesViews = {
        dog: 'dogs',
        cat: 'cats',
        rabbit: 'rabbits',
        bird: 'birds',
        horse: 'horses',
      };

      // Determine if we need client-side filtering for non-species filters
      const hasClientFilters = filters.age || filters.gender || filters.size || filters.search;
      const hasSpeciesFilter = filters.species && speciesViews[filters.species];

      // When client-side filtering is needed, fetch more items (up to API limit)
      const limit = hasClientFilters ? 250 : CONFIG.ITEMS_PER_PAGE;

      let viewPath = '';
      // Use 'available' view for getting adoptable pets
      if (hasSpeciesFilter) {
        viewPath = `available/${speciesViews[filters.species]}/`;
      } else {
        viewPath = 'available/';
      }

      const queryParams = new URLSearchParams({
        limit: limit,
        page: hasClientFilters ? 1 : page,
        include: 'species,pictures,orgs,statuses',
        sort: '-animals.updatedDate',
      });

      // Fetch data using views for species filtering
      const response = await this.request(`/public/animals/search/${viewPath}?${queryParams}`);

      let results = response.data || [];
      const included = response.included || [];

      // Apply client-side filtering for non-species filters
      if (filters.age) {
        results = results.filter(a => a.attributes?.ageGroup?.toLowerCase() === filters.age.toLowerCase());
      }
      if (filters.gender) {
        results = results.filter(a => a.attributes?.sex?.toLowerCase() === filters.gender.toLowerCase());
      }
      if (filters.size) {
        results = results.filter(a => a.attributes?.sizeGroup?.toLowerCase() === filters.size.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        results = results.filter(a => {
          const attrs = a.attributes || {};
          return (attrs.name && attrs.name.toLowerCase().includes(q)) ||
                 (attrs.breedPrimary && attrs.breedPrimary.toLowerCase().includes(q));
        });
      }

      // When client-side filters were applied, `results` holds up to 250 matching
      // items and needs to be paginated locally. Otherwise, the server already
      // returned the correct page (limit + page were sent in the request), and
      // the true total comes from the API's own meta.count.
      let totalCount;
      let pagedResults;

      if (hasClientFilters) {
        totalCount = results.length;
        const start = (page - 1) * CONFIG.ITEMS_PER_PAGE;
        pagedResults = results.slice(start, start + CONFIG.ITEMS_PER_PAGE);
      } else {
        totalCount = response.meta?.count ?? results.length;
        pagedResults = results;
      }

      const totalPages = Math.ceil(totalCount / CONFIG.ITEMS_PER_PAGE) || 1;

      return {
        data: pagedResults,
        included: included,
        meta: {
          totalResultCount: totalCount,
          countReturned: pagedResults.length,
          pageReturned: page,
          limit: CONFIG.ITEMS_PER_PAGE,
          pages: totalPages,
        },
      };
    },

  async getAnimalById(id) {
    // Demo mode: return sample data
    if (!this.isConfigured()) {
      return DEMO.getAnimalById(id);
    }

    const response = await this.request(`/public/animals/${id}?include=species,pictures,orgs,statuses`);
    return {
      data: response.data?.[0] || null,
      included: response.included || [],
    };
  },

  /**
   * Fetch shelter/rescue organizations (uses demo data when not configured)
   * @param {number} limit - Max number of orgs to return
   * @returns {Promise<object>} - Org data
   */
  async getOrgs(limit = 6) {
    if (!this.isConfigured()) {
      return DEMO.getOrgs(limit);
    }

    const queryParams = new URLSearchParams({ limit });
    const response = await this.request(`/public/orgs/?${queryParams}`);

    return {
      data: response.data || [],
      included: response.included || [],
    };
  },
  async request(endpoint, options = {}) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': CONFIG.RESCUE_GROUPS_API_KEY,
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(url, { ...options, headers, signal: controller.signal });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },
};