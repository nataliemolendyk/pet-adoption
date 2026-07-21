// ==========================================
// Browse Page Logic
// ==========================================

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
    this.applyBtn = document.querySelector('#filter-apply');
    this.resetBtn = document.querySelector('#filter-reset');

    if (!this.petGrid) return;

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
    };
    this.loadPets();
  },

  resetFilters() {
    this.currentPage = 1;
    this.activeFilters = {};
    [this.speciesFilter, this.ageFilter, this.genderFilter, this.sizeFilter].forEach(select => {
      if (select) select.selectedIndex = 0;
    });
    this.loadPets();
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
      this.petGrid.appendChild(UI.createPetCard(animal));
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

    for (let i = 1; i <= this.totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === this.currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        if (i !== this.currentPage) { this.currentPage = i; this.loadPets(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      });
      wrapper.appendChild(btn);
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
};