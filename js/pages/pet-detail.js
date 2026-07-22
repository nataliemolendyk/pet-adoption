// ==========================================
// Pet Detail Page Logic
// ==========================================
import { API } from '../services/api.js';
import { UI } from '../utils/ui.js';

export const PetDetail = {
  /**
   * Initialize pet detail page
   */
  async init() {
    const params = new URLSearchParams(window.location.search);
    const petId = params.get('id');

    if (!petId) {
      document.querySelector('#pet-detail-container').innerHTML = `
        <div class="error-message">
          <p>No pet ID provided. Please go back to the <a href="browse.html">browse page</a>.</p>
        </div>
      `;
      return;
    }

    const container = document.querySelector('#pet-detail-container');
    UI.showLoading(container);

    try {
      const data = await API.getAnimalById(petId);
      this.renderPet(container, data);
    } catch (error) {
      console.error('Failed to load pet details:', error);
      UI.showError(container, 'Failed to load pet details. Please try again later.');
    }
  },

  /**
   * Render full pet details from API data
   */
  renderPet(container, data) {
    // Extract animal data from API response
    const included = data.included || [];
    const animalData = data.data;
    if (!animalData) {
      UI.showError(container, 'Pet data not found.');
      return;
    }

    const attributes = animalData.attributes || {};
    const name = attributes.name || 'Unknown Pet';
    const breed = attributes.breedPrimary || 'Mixed Breed';
    const breedSecondary = attributes.breedSecondary || '';
    const ageGroup = attributes.ageGroup || '';
    const ageString = attributes.ageString || '';
    const sex = attributes.sex || '';
    const sizeGroup = attributes.sizeGroup || '';
    const sizeString = attributes.sizeString || '';
    const descriptionHtml = attributes.descriptionHtml || attributes.descriptionText || 'No description available.';
    const color = attributes.colorPrimary || '';
    const colorSecondary = attributes.colorSecondary || '';
    const specialNeeds = attributes.isSpecialNeeds || false;
    const altered = attributes.isAltered || false;
    const declawed = attributes.isDeclawed || false;
    const housed = attributes.housedWith || '';
    const adoptionFee = attributes.adoptionFee || '';

    // Species from included data
    const speciesIds = animalData.relationships?.species?.data || [];
    const speciesData = speciesIds.length > 0 ? included.find(item => item.type === 'species' && item.id === speciesIds[0]) : null;
    const speciesName = speciesData?.attributes?.singular || attributes.species || 'Pet';

    // Status from included data
    const statusIds = animalData.relationships?.statuses?.data || [];
    const statusData = statusIds.length > 0 ? included.find(item => item.type === 'statuses' && item.id === statusIds[0]) : null;
    const status = statusData?.attributes?.name || attributes.status || 'available';

    // Pictures
    const pictureIds = animalData.relationships?.pictures?.data || [];
    const pictures = included.filter(item => item.type === 'pictures' && pictureIds.some(p => p.id === item.id));
    const allPictureUrls = pictures.map(p => {
      const picAttrs = p.attributes || {};
      return picAttrs.large?.url || picAttrs.small?.url || picAttrs.publicUrl || picAttrs.url || picAttrs.original?.url;
    }).filter(Boolean);

    // Organization (shelter) - API uses plural 'orgs'
    const orgIds = animalData.relationships?.orgs?.data || [];
    const orgId = Array.isArray(orgIds) ? orgIds[0]?.id : orgIds?.id;
    const orgData = orgId ? included.find(item => item.type === 'orgs' && item.id === orgId) : null;
    const orgAttrs = orgData?.attributes || {};
    const orgName = orgAttrs.name || 'Unknown Shelter';
    const orgPhone = orgAttrs.phone || '';
    const orgEmail = orgAttrs.email || '';
    const orgUrl = orgAttrs.url || '';
    const orgCity = orgAttrs.city || '';
    const orgState = orgAttrs.state || '';
    const orgAddress = orgAttrs.street || orgAttrs.address || '';

    // Age display
    const ageDisplay = ageString || (ageGroup ? ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1) : 'Unknown');
    const genderDisplay = sex ? sex.charAt(0).toUpperCase() + sex.slice(1) : 'Unknown';
    const sizeDisplay = sizeString || (sizeGroup ? sizeGroup.charAt(0).toUpperCase() + sizeGroup.slice(1) : 'Unknown');

    // Build colors string
    const colors = [color, colorSecondary].filter(Boolean).join(' / ') || 'Unknown';

    // Main hero image
    const heroUrl = allPictureUrls.length > 0 ? allPictureUrls[0] : null;

    // Build HTML
    let html = '';

    // Start pet-detail wrapper
    html += `<div class="pet-detail">`;

    // Hero image or placeholder
    if (heroUrl) {
      html += `<img class="pet-detail-hero" src="${heroUrl}" alt="${name}" width="800" height="400" decoding="async" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';">`;
      html += `<div class="pet-detail-hero-placeholder" style="display:none;">🐾</div>`;
    } else {
      html += `<div class="pet-detail-hero-placeholder">🐾</div>`;
    }

    // Body
    html += `<div class="pet-detail-body">`;

    // Name and breed
    html += `<h1 class="pet-name">${name}</h1>`;
    html += `<p class="pet-breed-large">${breed}${breedSecondary ? ' / ' + breedSecondary : ''}</p>`;

    // Info grid
    html += `<div class="pet-detail-info-grid">`;
    html += `<div class="pet-detail-info-item"><div class="label">Age</div><div class="value">${ageDisplay}</div></div>`;
    html += `<div class="pet-detail-info-item"><div class="label">Gender</div><div class="value">${genderDisplay}</div></div>`;
    html += `<div class="pet-detail-info-item"><div class="label">Size</div><div class="value">${sizeDisplay}</div></div>`;
    html += `<div class="pet-detail-info-item"><div class="label">Color</div><div class="value">${colors}</div></div>`;
    html += `<div class="pet-detail-info-item"><div class="label">Status</div><div class="value">${status.charAt(0).toUpperCase() + status.slice(1)}</div></div>`;

    if (adoptionFee) {
      html += `<div class="pet-detail-info-item"><div class="label">Adoption Fee</div><div class="value">${adoptionFee}</div></div>`;
    }

    html += `</div>`; // end info-grid

    // Description
    html += `<div class="pet-detail-description">`;
    html += `<h3>About ${name}</h3>`;
    html += `<div>${descriptionHtml}</div>`;
    html += `</div>`;

    // Additional attributes
    html += `<div class="pet-detail-description">`;
    html += `<h3>Additional Details</h3>`;
    html += `<ul style="list-style:disc; padding-left:1.5rem; margin-bottom:var(--space-md);">`;
    html += `<li><strong>Spayed/Neutered:</strong> ${altered ? 'Yes' : 'Not specified'}</li>`;
    if (specialNeeds) html += `<li><strong>Special Needs:</strong> Yes</li>`;
    if (declawed) html += `<li><strong>Declawed:</strong> Yes</li>`;
    if (housed) html += `<li><strong>Housed With:</strong> ${housed}</li>`;
    html += `</ul>`;
    html += `</div>`;

    // Photo gallery if multiple pictures
    if (allPictureUrls.length > 1) {
      html += `<div class="pet-detail-gallery">`;
      html += `<h3>Photo Gallery</h3>`;
      html += `<div class="pet-detail-gallery-grid">`;
      for (let i = 1; i < allPictureUrls.length && i < 8; i++) {
        html += `<img src="${allPictureUrls[i]}" alt="${name} photo ${i}" loading="lazy" decoding="async" width="600" height="400">`;
      }
      html += `</div></div>`;
    }

    // Shelter info
    html += `<div class="pet-detail-shelter">`;
    html += `<h3>Shelter Information</h3>`;
    html += `<p><strong>${orgName}</strong></p>`;
    if (orgAddress) html += `<p>${orgAddress}</p>`;
    if (orgCity && orgState) html += `<p>${orgCity}, ${orgState}</p>`;
    if (orgPhone) html += `<p><strong>Phone:</strong> ${orgPhone}</p>`;
    if (orgEmail) html += `<p><strong>Email:</strong> <a href="mailto:${orgEmail}">${orgEmail}</a></p>`;
    if (orgUrl) html += `<p><strong>Website:</strong> <a href="${orgUrl}" target="_blank" rel="noopener">${orgUrl}</a></p>`;
    html += `</div>`;

    // Action buttons
    html += `<div class="pet-detail-actions">`;
    html += `<a href="contact.html" class="btn btn-primary btn-lg">Contact Shelter</a>`;
    html += `<a href="browse.html" class="btn btn-outline btn-lg">Back to Browse</a>`;
    html += `</div>`;

    html += `</div>`; // end pet-detail-body
    html += `</div>`; // end pet-detail

    container.innerHTML = html;
  },
};