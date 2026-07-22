// ==========================================
// Imports
// ==========================================
import { API } from './services/api.js';
import { UI } from './utils/ui.js';
import { Browse } from './pages/browse.js';
import { PetDetail } from './pages/pet-detail.js';
import { Contact } from './pages/contact.js';

// ==========================================
// 4. Shared Initialization (Nav, Accordion, etc.)
// ==========================================
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

  // --- Page-Specific Initialization ---
  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (path === 'browse.html') {
    Browse.init();
  } else if (path === 'pet-detail.html') {
    PetDetail.init();
  } else if (path === 'index.html' || path === '') {
    HomePage.init();
  } else if (path === 'contact.html') {
    Contact.init();
  }
});


// ==========================================
// 7. Home Page Logic
// ==========================================
const HomePage = {
  /**
   * Load featured pets for the home page
   */
  async init() {
    const featuredContainer = document.querySelector('#featured-pets');
    if (!featuredContainer) return;

    UI.showLoading(featuredContainer);

    try {
      const data = await API.getAnimals({}, 1);
      this.renderFeatured(featuredContainer, data);
    } catch (error) {
      console.error('Failed to load featured pets:', error);
      // Don't show error on home page, just leave placeholders
    }
  },

  /**
   * Render featured pets from API data
   */
  renderFeatured(container, data) {
    const animals = (data.data || []).slice(0, 3);
    const included = data.included || [];
    if (animals.length === 0) return;

    container.innerHTML = '';
    animals.forEach(animal => {
      const card = UI.createPetCard(animal, included);
      container.appendChild(card);
    });
  },
};
