// ==========================================
// 1. Configuration
// ==========================================
const CONFIG = {
  // RescueGroups.org v5 API
  // TODO: Replace with your actual API key from https://rescuegroups.org/services/adoptable-pet-data-api/
  API_KEY: 'YOUR_API_KEY_HERE',
  API_BASE_URL: 'https://api.rescuegroups.org/v5',

  // Pagination
  ITEMS_PER_PAGE: 12,

  // Pet types
  SPECIES: [
    { value: '', label: 'All Species' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'rabbit', label: 'Rabbits' },
    { value: 'bird', label: 'Birds' },
    { value: 'horse', label: 'Horses' },
    { value: 'small', label: 'Small Animals' },
  ],
};

// ==========================================
// 2. API Service
// ==========================================
const API = {
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
      'Authorization': CONFIG.API_KEY,
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
   * Fetch animals with optional filters
   * @param {object} filters - Filter criteria
   * @param {number} page - Page number
   * @returns {Promise<object>} - Animal data
   */
  async getAnimals(filters = {}, page = 1) {
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
   * Fetch a single animal by ID
   * @param {string|number} id - Animal ID
   * @returns {Promise<object>} - Animal data
   */
  async getAnimalById(id) {
    return this.request(`/public/animals/${id}?include=pictures,org`);
  },

  /**
   * Fetch organizations (shelters)
   * @param {object} filters - Optional filters
   * @returns {Promise<object>} - Organization data
   */
  async getOrganizations(filters = {}) {
    const queryParams = new URLSearchParams({
      limit: 50,
      include: 'animals',
    });

    return this.request(`/public/orgs?${queryParams}`);
  },

  /**
   * Check if API key is configured
   * @returns {boolean}
   */
  isConfigured() {
    return CONFIG.API_KEY && CONFIG.API_KEY !== 'YOUR_API_KEY_HERE';
  },
};

// ==========================================
// 3. UI Utilities
// ==========================================
const UI = {
  /**
   * Show a loading spinner
   * @param {HTMLElement} container - Container element
   */
  showLoading(container) {
    container.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
      </div>
    `;
  },

  /**
   * Show an error message
   * @param {HTMLElement} container - Container element
   * @param {string} message - Error message
   */
  showError(container, message = 'Something went wrong. Please try again later.') {
    container.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  },

  /**
   * Show an empty state
   * @param {HTMLElement} container - Container element
   * @param {string} message - Empty state message
   */
  showEmpty(container, message = 'No results found.') {
    container.innerHTML = `
      <div class="empty-state">
        <p>${message}</p>
      </div>
    `;
  },

  /**
   * Show an empty state
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Nav Toggle ---
  const toggleBtn = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.navbar-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Set Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Accordion (FAQ) ---
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
        });
      }

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// ==========================================
// 5. Pet Detail Page Logic
// ==========================================
const PetDetail = {
  /**
   * Initialize pet detail page
   */
  async init() {
    const params = new URLSearchParams(window.location.search);
    const petId = params.get('id');

    if (!petId) {
      document.querySelector('.page-content .container').innerHTML = `
        <div class="error-message">
          <p>No pet ID provided. Please go back to the <a href="/browse.html">browse page</a>.</p>
        </div>
      `;
      return;
    }

    const container = document.querySelector('.page-content .container');
    UI.showLoading(container);

    try {
      if (!API.isConfigured()) {
        // Demo mode — show placeholder
        this.renderPlaceholder(container, petId);
        return;
      }

      const data = await API.getAnimalById(petId);
      this.renderPet(container, data);
    } catch (error) {
      console.error('Failed to load pet details:', error);
      UI.showError(container, 'Failed to load pet details. Please try again later.');
    }
  },

  /**
   * Render pet details (placeholder for Phase 1)
   */
  renderPlaceholder(container, petId) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Pet Detail Page</h2>
        <p>Pet ID: ${petId}</p>
        <p class="mt-1">Full pet details will be displayed here once the API is connected.</p>
        <p>To get started, add your RescueGroups.org API key in <code>js/main.js</code>.</p>
        <a href="/browse.html" class="btn btn-primary mt-2">← Back to Browse</a>
      </div>
    `;
  },

  /**
   * Render full pet details (to be implemented in Phase 2)
   */
  renderPet(container, data) {
    // TODO: Phase 2 — full pet detail rendering
    container.innerHTML = `<p>Pet detail rendering coming in Phase 2.</p>`;
  },
};

// ==========================================
// 6. Browse Page Logic
// ==========================================
const Browse = {
  /**
   * Initialize browse page
   */
  async init() {
    const container = document.querySelector('.pet-grid');
    if (!container) return;

    UI.showLoading(container);

    try {
      if (!API.isConfigured()) {
        this.renderPlaceholder(container);
        return;
      }

      const data = await API.getAnimals();
      this.renderPets(container, data);
    } catch (error) {
      console.error('Failed to load pets:', error);
      UI.showError(container, 'Failed to load pets. Please try again later.');
    }
  },

  /**
   * Render placeholder pets for Phase 1
   */
  renderPlaceholder(container) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Pet Listings Coming Soon</h2>
        <p>Adoptable pets will be displayed here once the RescueGroups API is connected.</p>
        <p class="mt-1">To get started, add your API key in <code>js/main.js</code>.</p>
        <ol class="mt-2" style="max-width: 400px; margin: 0 auto; list-style: decimal; padding-left: 1.5rem; text-align: left;">
          <li>Get a free API key from <a href="https://rescuegroups.org/services/adoptable-pet-data-api/" target="_blank">RescueGroups.org</a></li>
          <li>Open <code>js/main.js</code></li>
          <li>Replace <code>YOUR_API_KEY_HERE</code> with your actual API key</li>
          <li>Refresh this page</li>
        </ol>
      </div>
    `;
  },

  /**
   * Render pets grid (to be implemented in Phase 2)
   */
  renderPets(container, data) {
    // TODO: Phase 2 — full pet rendering with filters
    container.innerHTML = `<p>Full pet rendering coming in Phase 2.</p>`;
  },
};

// ==========================================
// 7. Initialize Pages
// ==========================================
// Auto-initialize based on page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (path === 'browse.html') {
    Browse.init();
  }

  if (path === 'pet-detail.html') {
    PetDetail.init();
  }
});