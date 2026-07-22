// ==========================================
// API Service
// ==========================================
import { CONFIG } from '../config.js';
import { DEMO } from './demo.js';

/**
 * Determine the base URL for the Vercel proxy.
 * Works from local dev, Vercel deployment, and GitHub Pages.
 */
function getProxyBase() {
  const host = window.location.hostname;
  // If on GitHub Pages, use the Vercel deployment URL
  if (host.includes('github.io') || host.includes('nataliemolendyk.github.io')) {
    // Your Vercel project URL
        return 'https://pet-adoption-one-pi.vercel.app';
  }
  // Local dev or Vercel — use relative path
  return '';
}

export const API = {
  /**
   * Generic fetch wrapper that proxies through the Vercel serverless function
   * @param {string} endpoint - API endpoint path (e.g., /public/animals/search/available/)
   * @param {object} options - Additional fetch options
   * @returns {Promise<object>} - JSON response
   */
  async request(endpoint, options = {}) {
    const baseUrl = getProxyBase();
    const proxyUrl = `${baseUrl}${CONFIG.API_PROXY_PATH}?path=${encodeURIComponent(endpoint)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(proxyUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Proxy Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  /**
     * Fetch animals with optional filters (uses demo data when not configured)
     * @param {object} filters - Filter criteria
     * @param {number} page - Page number
     * @returns {Promise<object>} - Animal data
     */
    async getAnimals(filters = {}, page = 1) {
        try {
          // Build views for the URL based on species filter
          const speciesViews = {
            dog: 'dogs',
            cat: 'cats',
            rabbit: 'rabbits',
            bird: 'birds',
            horse: 'horses',
          };

          const hasClientFilters = filters.age || filters.gender || filters.size || filters.search;
          const hasSpeciesFilter = filters.species && speciesViews[filters.species];

          const limit = hasClientFilters ? 250 : CONFIG.ITEMS_PER_PAGE;

          let viewPath = '';
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

          const endpoint = `/public/animals/search/${viewPath}?${queryParams}`;
          const response = await this.request(endpoint);

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
        } catch (error) {
          console.warn('Proxy unavailable, falling back to demo data:', error.message);
          return DEMO.getAnimals(filters, page);
        }
      },

  async getAnimalById(id) {
      try {
        const endpoint = `/public/animals/${id}?include=species,pictures,orgs,statuses`;
        const response = await this.request(endpoint);
        return {
          data: response.data?.[0] || null,
          included: response.included || [],
        };
      } catch (error) {
        console.warn('Proxy unavailable, falling back to demo data:', error.message);
        return DEMO.getAnimalById(id);
      }
    },

    /**
     * Fetch shelter/rescue organizations (uses demo data when proxy is unavailable)
     * @param {number} limit - Max number of orgs to return
     * @returns {Promise<object>} - Org data
     */
    async getOrgs(limit = 6) {
      try {
        const queryParams = new URLSearchParams({ limit });
        const endpoint = `/public/orgs/?${queryParams}`;
        const response = await this.request(endpoint);
        return {
          data: response.data || [],
          included: response.included || [],
        };
      } catch (error) {
        console.warn('Proxy unavailable, falling back to demo data:', error.message);
        return DEMO.getOrgs(limit);
      }
    },
  };