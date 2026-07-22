// ==========================================
// UI Utilities
// ==========================================

/**
 * Utility: Debounce function for performance optimization
 * Delays execution until after a specified wait period,
 * preventing excessive calls during rapid events like typing.
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const UI = {
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
       * Create a detailed shelter contact card (address, phone, email, website)
   * from API org data — used on the Get in Touch page.
   * @param {object} org - Org data object from API
   * @returns {HTMLElement}
   */
  createShelterContactCard(org) {
    const attrs = org.attributes || {};
    const name = attrs.name || 'Unknown Shelter';
    const phone = attrs.phone || '';
    const email = attrs.email || '';
    const url = attrs.url || '';
    const street = attrs.street || attrs.address || '';
    const city = attrs.city || '';
    const state = attrs.state || '';
    const hours = attrs.hours || '';
    const about = attrs.about || attrs.services || '';

    const card = document.createElement('div');
        card.className = 'card';
        card.style.cssText = 'padding: var(--space-xl); display: flex; flex-direction: column; height: 100%;';

        let html = `<h3>${name}</h3>`;
        html += `<div style="margin: var(--space-md) 0; flex: 1;">`;

    const row = (label, value) => `
      <p style="display: flex; align-items: flex-start; gap: var(--space-sm); margin-bottom: var(--space-sm);">
        <span style="color: var(--forest-green); font-weight: bold; min-width: 80px;">${label}:</span>
        <span>${value}</span>
      </p>`;

    if (street || (city && state)) {
      const addressLine = [street, [city, state].filter(Boolean).join(', ')].filter(Boolean).join(', ');
      html += row('Address', addressLine);
    }
    if (phone) html += row('Phone', phone);
    if (email) html += row('Email', `<a href="mailto:${email}">${email}</a>`);
    if (url) html += row('Website', `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
    if (hours) html += row('Hours', hours);

    html += `</div>`;
        if (about) {
                  html += `<p style="color: var(--medium-gray); margin-top: auto; padding-top: var(--space-md);">${about}</p>`;
                }

        card.innerHTML = html;
        return card;
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
   * Create a pet card element from API animal data
   * @param {object} animal - Animal data object from API
   * @param {Array} [included] - Optional included data (pictures, etc.) from API response
   * @returns {HTMLElement} - Pet card anchor element
   */
  createPetCard(animal, included = []) {
    const id = animal.id;
    const attributes = animal.attributes || {};
    const pictureIds = animal.relationships?.pictures?.data || [];
    const name = attributes.name || 'Unknown Pet';
    const breed = attributes.breedPrimary || 'Mixed Breed';
    const ageGroup = attributes.ageGroup || '';
    const sex = attributes.sex || '';
    const sizeGroup = attributes.sizeGroup || '';
    const status = attributes.status || 'available';

    // Format age for display
    const ageDisplay = ageGroup ? ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1) : '';
    const genderDisplay = sex ? sex.charAt(0).toUpperCase() + sex.slice(1) : '';
    const sizeDisplay = sizeGroup ? sizeGroup.charAt(0).toUpperCase() + sizeGroup.slice(1) : '';

    const card = document.createElement('a');
    card.className = 'pet-card';
    card.href = `pet-detail.html?id=${id}`;
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';

    // Primary image - try getting URL from included pictures or attributes
    let imgUrl = '';
    if (pictureIds.length > 0) {
      const pictureData = included.find(item => item.type === 'pictures' && item.id === pictureIds[0].id);
      if (pictureData?.attributes) {
        const picAttrs = pictureData.attributes;
        imgUrl = picAttrs.large?.url || picAttrs.small?.url || picAttrs.publicUrl || picAttrs.url || picAttrs.original?.url;
      }
    }
    // Fallback to thumbnail URL from attributes
    if (!imgUrl && attributes.pictureThumbnailUrl) {
      imgUrl = attributes.pictureThumbnailUrl;
    }

    if (imgUrl) {
      const img = document.createElement('img');
      img.className = 'pet-card-img';
      img.src = imgUrl;
      img.alt = name;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 600;
            img.height = 280;
      img.onerror = function() {
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'flex';
      };
      card.appendChild(img);
    }

    // Placeholder for missing images
    const placeholder = document.createElement('div');
    placeholder.className = 'pet-card-img-placeholder';
    placeholder.textContent = '🐾';
    if (pictureIds.length > 0) placeholder.style.display = 'none';
    card.appendChild(placeholder);

    // Card body
    const body = document.createElement('div');
    body.className = 'pet-card-body';

    const nameEl = document.createElement('h3');
    nameEl.textContent = name;
    body.appendChild(nameEl);

    const breedEl = document.createElement('p');
    breedEl.className = 'pet-breed';
    breedEl.textContent = breed;
    body.appendChild(breedEl);

    // Meta tags
    const meta = document.createElement('div');
    meta.className = 'pet-card-meta';

    if (ageDisplay) {
      const tag = document.createElement('span');
      tag.className = 'pet-card-tag';
      tag.textContent = ageDisplay;
      meta.appendChild(tag);
    }

    if (genderDisplay) {
      const tag = document.createElement('span');
      tag.className = 'pet-card-tag';
      tag.textContent = genderDisplay;
      meta.appendChild(tag);
    }

    if (sizeDisplay) {
      const tag = document.createElement('span');
      tag.className = 'pet-card-tag gold';
      tag.textContent = sizeDisplay;
      meta.appendChild(tag);
    }

    if (status && status !== 'available') {
      const tag = document.createElement('span');
      tag.className = 'pet-card-tag';
      tag.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      meta.appendChild(tag);
    }

    body.appendChild(meta);

    const viewBtn = document.createElement('span');
    viewBtn.className = 'btn btn-primary';
    viewBtn.textContent = 'View Details';
    body.appendChild(viewBtn);

    card.appendChild(body);
    return card;
  },
};