// ==========================================
// Browse Page Logic
// ==========================================
import { API } from '../services/api.js';
import { UI } from '../utils/ui.js';

// US state abbreviation to full name mapping
const STATE_NAMES = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
  'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
  'WI': 'Wisconsin', 'WY': 'Wyoming',
};

export const Browse = {
  currentPage: 1,
  totalResults: 0,
  totalPages: 0,
  activeFilters: {},

  init() {
      this.petGrid = document.querySelector('.pet-grid');
      this.speciesFilter = document.querySelector('#filter-species');
      this.ageFilter = document.querySelector('#filter-age');
      this.genderFilter = document.querySelector('#filter-gender');
      this.sizeFilter = document.querySelector('#filter-size');
      this.stateFilter = document.querySelector('#filter-state');
      this.applyBtn = document.querySelector('#filter-apply');
      this.resetBtn = document.querySelector('#filter-reset');

    if (!this.petGrid) return;

        // Populate the state dropdown from shelter/org data
        this.populateStateDropdown();

        this.loadPets();

        if (this.applyBtn) {
      this.applyBtn.addEventListener('click', () => this.applyFilters());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetFilters());
    }
  },

  applyFilters() {
      this.currentPage = 1;
      this.activeFilters = {
        species: this.speciesFilter?.value || '',
        age: this.ageFilter?.value || '',
        gender: this.genderFilter?.value || '',
        size: this.sizeFilter?.value || '',
        state: this.stateFilter?.value || '',
      };
      this.loadPets();
    },

    resetFilters() {
      this.currentPage = 1;
      this.activeFilters = {};
      [this.speciesFilter, this.ageFilter, this.genderFilter, this.sizeFilter, this.stateFilter].forEach(select => {
        if (select) select.selectedIndex = 0;
      });
      this.loadPets();
          },

        /**
         * Populate the state filter dropdown with states from shelter/org data.
         * Falls back to extracting states from the demo data if the API is unavailable.
         */
        async populateStateDropdown() {
          if (!this.stateFilter) return;

          try {
            // Try to get orgs from the API (includes demo data fallback)
            const orgsData = await API.getOrgs(50);
            const states = new Set();

            (orgsData.data || []).forEach(org => {
              const state = org.attributes?.state;
              if (state) states.add(state.toUpperCase());
            });

            if (states.size > 0) {
              this.updateStateOptions([...states]);
              return;
            }
          } catch (e) {
            console.warn('Could not load orgs for state dropdown:', e);
          }

          // Fallback: extract states from demo pets data
          try {
            const { DEMO } = await import('../services/demo.js');
            const states = new Set();
            DEMO.pets.forEach(pet => {
              if (pet.state) states.add(pet.state.toUpperCase());
            });
            if (states.size > 0) {
              this.updateStateOptions([...states]);
            }
          } catch (e) {
            console.warn('Could not extract states from demo data:', e);
          }
        },

        /**
         * Update the state dropdown options with the given state codes.
         * @param {string[]} stateCodes - Array of state abbreviation codes
         */
        updateStateOptions(stateCodes) {
          const select = this.stateFilter;
          // Preserve the currently selected value if any
          const currentValue = select.value;

          // Keep only the "All States" option
          select.innerHTML = '<option value="">All States</option>';

          // Sort alphabetically by full state name
          stateCodes.sort((a, b) => {
            const nameA = STATE_NAMES[a] || a;
            const nameB = STATE_NAMES[b] || b;
            return nameA.localeCompare(nameB);
          });

          stateCodes.forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = STATE_NAMES[code] || code;
            select.appendChild(option);
          });

          // Restore previously selected value if it still exists
          if (currentValue) {
            select.value = currentValue;
          }
        },

        async loadPets() {
    if (!this.petGrid) return;
    UI.showLoading(this.petGrid);

    try {
          const filters = {};
          const v = this.activeFilters;
          if (v.species) filters.species = v.species;
          if (v.age) filters.age = v.age;
          if (v.gender) filters.gender = v.gender;
          if (v.size) filters.size = v.size;
          if (v.state) filters.state = v.state;

      const data = await API.getAnimals(filters, this.currentPage);
      this.renderData(data);
    } catch (error) {
      console.error('Failed to load pets:', error);
      UI.showError(this.petGrid, 'Failed to load pets. Please try again later.');
    }
  },

  renderData(data) {
    const animals = data.data || [];
    const meta = data.meta || {};
    this.totalResults = meta.totalResultCount || animals.length;
    this.totalPages = Math.ceil(this.totalResults / 12) || 1;

    if (animals.length === 0) {
      UI.showEmpty(this.petGrid, 'No pets found matching your filters. Try adjusting your search criteria.');
      this.removePagination();
      return;
    }

    this.petGrid.innerHTML = '';
        animals.forEach(animal => {
          this.petGrid.appendChild(UI.createPetCard(animal, data.included || []));
        });

    this.renderPagination();
  },

  renderPagination() {
    this.removePagination();
    if (this.totalPages <= 1) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'pagination';

    const prev = document.createElement('button');
    prev.textContent = '← Previous';
    prev.disabled = this.currentPage <= 1;
    prev.addEventListener('click', () => {
      if (this.currentPage > 1) { this.currentPage--; this.loadPets(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
    wrapper.appendChild(prev);

        // Compact page range: show first, last, and pages around current
    const range = 2;
    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(this.totalPages, this.currentPage + range);

    if (start > 1) {
      this._addPageBtn(wrapper, 1);
      if (start > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        wrapper.appendChild(ellipsis);
      }
    }

    for (let i = start; i <= end; i++) {
      this._addPageBtn(wrapper, i);
    }

    if (end < this.totalPages) {
      if (end < this.totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        wrapper.appendChild(ellipsis);
      }
      this._addPageBtn(wrapper, this.totalPages);
    }

    const info = document.createElement('span');
    info.className = 'page-info';
    info.textContent = `Page ${this.currentPage} of ${this.totalPages} (${this.totalResults} pets)`;
    wrapper.appendChild(info);

    const next = document.createElement('button');
    next.textContent = 'Next →';
    next.disabled = this.currentPage >= this.totalPages;
    next.addEventListener('click', () => {
      if (this.currentPage < this.totalPages) { this.currentPage++; this.loadPets(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
    wrapper.appendChild(next);

    this.petGrid.parentNode.appendChild(wrapper);
  },

  removePagination() {
      const el = document.querySelector('.pagination');
      if (el) el.remove();
    },

    _addPageBtn(wrapper, pageNum) {
      const btn = document.createElement('button');
      btn.textContent = pageNum;
      if (pageNum === this.currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        if (pageNum !== this.currentPage) { this.currentPage = pageNum; this.loadPets(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      });
      wrapper.appendChild(btn);
    },
  };