// ==========================================
// 1. Configuration
// ==========================================
const CONFIG = {
  // RescueGroups.org v5 API
  // TODO: Replace with your actual API key from https://rescuegroups.org/services/adoptable-pet-data-api/
  RESCUE_GROUPS_API_KEY: 'YOUR_API_KEY_HERE',
  API_BASE_URL: 'https://api.rescuegroups.org/v5',

  // Pagination
  ITEMS_PER_PAGE: 12,
};

// ==========================================
// 2. Demo Data (used when no API key is configured)
// ==========================================
const DEMO = {
  pets: [
    { id: 1001, name: 'Buddy', species: 'dog', breedPrimary: 'Golden Retriever', breedSecondary: '', ageGroup: 'young', ageString: '1 Year', sex: 'male', sizeGroup: 'large', sizeString: 'Large', colorPrimary: 'Gold', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$150', descriptionHtml: '<p>Buddy is a friendly, energetic Golden Retriever who loves everyone he meets. He&#39;s great with kids and other dogs, and he&#39;s already trained in basic commands. Buddy enjoys long walks, playing fetch, and belly rubs. He&#39;d make a wonderful family companion.</p>' },
    { id: 1002, name: 'Luna', species: 'cat', breedPrimary: 'Domestic Shorthair', breedSecondary: '', ageGroup: 'adult', ageString: '3 Years', sex: 'female', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Black', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: 'Other cats', adoptionFee: '$75', descriptionHtml: '<p>Luna is a sweet, gentle cat who loves quiet evenings and cozy laps. She gets along well with other cats and would do best in a calm home. Luna is spayed, vaccinated, and ready to find her forever family.</p>' },
    { id: 1003, name: 'Max', species: 'dog', breedPrimary: 'German Shepherd', breedSecondary: 'Husky', ageGroup: 'baby', ageString: '4 Months', sex: 'male', sizeGroup: 'large', sizeString: 'Large (will be)', colorPrimary: 'Black', colorSecondary: 'Tan', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: '', adoptionFee: '$250', descriptionHtml: '<p>Max is a playful puppy with loads of energy and love to give. He&#39;s looking for an active family who can keep up with his adventures. Max will benefit from training classes and plenty of socialization. He&#39;s going to be a big, loyal companion!</p>' },
    { id: 1004, name: 'Bella', species: 'cat', breedPrimary: 'Tabby', breedSecondary: '', ageGroup: 'senior', ageString: '10 Years', sex: 'female', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Orange', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$50', descriptionHtml: '<p>Sweet Bella is looking for a quiet retirement home. She&#39;s calm, affectionate, and perfectly content to spend her days napping in sunny spots and getting gentle pets. Senior cats like Bella have so much love to give and make wonderful companions.</p>' },
    { id: 1005, name: 'Charlie', species: 'dog', breedPrimary: 'Beagle', breedSecondary: '', ageGroup: 'adult', ageString: '2 Years', sex: 'male', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Brown', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: 'Other dogs', adoptionFee: '$175', descriptionHtml: '<p>Charlie is a happy-go-lucky Beagle with a great sense of smell and an even better personality. He loves exploring, following scent trails, and playing with his doggy friends. Charlie would thrive in a home with a fenced yard.</p>' },
    { id: 1006, name: 'Daisy', species: 'cat', breedPrimary: 'Calico', breedSecondary: '', ageGroup: 'young', ageString: '8 Months', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Calico', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$100', descriptionHtml: '<p>Daisy is a curious and playful young cat with a beautiful calico coat. She loves feather toys, catnip mice, and climbing her cat tree. Daisy is full of kitten energy and would bring joy to any home.</p>' },
    { id: 1007, name: 'Rocky', species: 'dog', breedPrimary: 'Boxer', breedSecondary: '', ageGroup: 'adult', ageString: '3 Years', sex: 'male', sizeGroup: 'large', sizeString: 'Large', colorPrimary: 'Brindle', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$200', descriptionHtml: '<p>Rocky is a strong, loyal Boxer with a heart of gold. He&#39;s well-trained, housebroken, and loves being part of the family. Rocky is great with children and will be a devoted protector and playmate. He needs regular exercise to stay happy.</p>' },
    { id: 1008, name: 'Molly', species: 'rabbit', breedPrimary: 'Holland Lop', breedSecondary: '', ageGroup: 'young', ageString: '6 Months', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Gray', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$40', descriptionHtml: '<p>Molly is the softest, snuggliest bunny you&#39;ll ever meet. She loves gentle pets, fresh veggies, and exploring her playpen. Rabbits make wonderful indoor pets, and Molly is already litter box trained!</p>' },
    { id: 1009, name: 'Simba', species: 'cat', breedPrimary: 'Maine Coon', breedSecondary: '', ageGroup: 'adult', ageString: '4 Years', sex: 'male', sizeGroup: 'large', sizeString: 'Large', colorPrimary: 'Brown', colorSecondary: 'Black', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$125', descriptionHtml: '<p>Majestic Simba is a gentle giant. This Maine Coon loves people, gets along with other pets, and has the most luxurious coat. He&#39;s calm, affectionate, and enjoys being wherever his humans are. Simba is the perfect lap cat for a large lap!</p>' },
    { id: 1010, name: 'Coco', species: 'dog', breedPrimary: 'Poodle Miniature', breedSecondary: '', ageGroup: 'adult', ageString: '5 Years', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'White', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$180', descriptionHtml: '<p>Coco is an elegant and intelligent mini poodle who loves learning new tricks. She&#39;s hypoallergenic, fully house-trained, and walks beautifully on a leash. Coco would be perfect for apartment living or a quieter home.</p>' },
    { id: 1011, name: 'Oreo', species: 'rabbit', breedPrimary: 'Dutch Rabbit', breedSecondary: '', ageGroup: 'adult', ageString: '2 Years', sex: 'male', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Black', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$35', descriptionHtml: '<p>Oreo is a handsome Dutch rabbit with perfect markings. He&#39;s friendly, curious, and loves his daily exercise time. Oreo comes with his enclosure, food bowls, and favorite toys. He&#39;s a wonderful first pet for a responsible family.</p>' },
    { id: 1012, name: 'Milo', species: 'cat', breedPrimary: 'Siamese', breedSecondary: '', ageGroup: 'baby', ageString: '3 Months', sex: 'male', sizeGroup: 'small', sizeString: 'Small (kitten)', colorPrimary: 'Cream', colorSecondary: 'Brown', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: 'Other kittens', adoptionFee: '$150', descriptionHtml: '<p>Milo is a talkative Siamese kitten with striking blue eyes and a big personality. He&#39;s curious, playful, and loves to chat with his humans. Milo would love a home with another young cat to play with.</p>' },
    { id: 1013, name: 'Duke', species: 'dog', breedPrimary: 'Labrador Retriever', breedSecondary: '', ageGroup: 'senior', ageString: '8 Years', sex: 'male', sizeGroup: 'large', sizeString: 'Large', colorPrimary: 'Yellow', colorSecondary: '', status: 'available', isSpecialNeeds: true, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$0', descriptionHtml: '<p>Sweet Duke is looking for a loving home to spend his golden years. He&#39;s calm, gentle, and perfectly house-trained. Duke has some arthritis and needs joint supplements, but he still enjoys short walks and lots of affection. Senior dogs like Duke are true treasures.</p>' },
    { id: 1014, name: 'Pepper', species: 'cat', breedPrimary: 'Tuxedo', breedSecondary: '', ageGroup: 'adult', ageString: '2 Years', sex: 'female', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Black', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$85', descriptionHtml: '<p>Pepper is a sleek tuxedo cat with a playful personality. She loves wand toys, window perches, and supervising her humans. Pepper is independent enough to entertain herself but always ready for snuggles at bedtime.</p>' },
    { id: 1015, name: 'Toby', species: 'dog', breedPrimary: 'Corgi', breedSecondary: '', ageGroup: 'young', ageString: '1 Year', sex: 'male', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Tan', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: '', adoptionFee: '$225', descriptionHtml: '<p>Toby is a charming Corgi with short legs and a huge personality. He&#39;s smart, eager to please, and already knows several commands. Toby has lots of energy and would love an active family. He may try to herd small children — it&#39;s just his instinct!</p>' },
    { id: 1016, name: 'Chloe', species: 'bird', breedPrimary: 'Cockatiel', breedSecondary: '', ageGroup: 'adult', ageString: '3 Years', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Gray', colorSecondary: 'Yellow', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: '', adoptionFee: '$60', descriptionHtml: '<p>Chloe is a sweet Cockatiel who loves to whistle and chirp. She&#39;s hand-tamed and enjoys sitting on shoulders. Chloe needs daily out-of-cage time and plenty of toys to keep her busy. She&#39;ll fill your home with beautiful birdsong.</p>' },
    { id: 1017, name: 'Bear', species: 'dog', breedPrimary: 'Great Pyrenees', breedSecondary: '', ageGroup: 'adult', ageString: '3 Years', sex: 'male', sizeGroup: 'large', sizeString: 'Extra Large', colorPrimary: 'White', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$200', descriptionHtml: '<p>Bear is a magnificent Great Pyrenees with a calm and protective nature. He&#39;s great with children and other pets. Bear needs space to roam and a family that appreciates his independent guardian instincts. He&#39;s a gentle giant with a big heart.</p>' },
    { id: 1018, name: 'Nala', species: 'cat', breedPrimary: 'Bengal', breedSecondary: '', ageGroup: 'young', ageString: '1 Year', sex: 'female', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'Spotted Tabby', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$200', descriptionHtml: '<p>Nala is a stunning Bengal cat with a wild-looking spotted coat and an adventurous spirit. She&#39;s highly intelligent and needs plenty of enrichment, puzzle toys, and climbing opportunities. Nala is not your average lap cat — she&#39;s an explorer!</p>' },
    { id: 1019, name: 'Oliver', species: 'dog', breedPrimary: 'Dachshund', breedSecondary: '', ageGroup: 'adult', ageString: '4 Years', sex: 'male', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Red', colorSecondary: '', status: 'adopted', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$150', descriptionHtml: '<p>Oliver is a handsome Dachshund with a brave heart and a love for digging. He&#39;s loyal, sometimes stubborn, and always entertaining. Oliver would do best in a home without small pets (his prey drive is strong!) but he adores his humans.</p>' },
    { id: 1020, name: 'Willow', species: 'cat', breedPrimary: 'Persian', breedSecondary: '', ageGroup: 'adult', ageString: '5 Years', sex: 'female', sizeGroup: 'medium', sizeString: 'Medium', colorPrimary: 'White', colorSecondary: '', status: 'available', isSpecialNeeds: true, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$100', descriptionHtml: '<p>Beautiful Willow has the most gorgeous long white coat and the sweetest personality. She needs daily brushing to keep her fur mat-free. Willow has a minor eye condition that requires occasional drops, but she takes it like a champ. She&#39;s looking for a patient, loving home.</p>' },
    { id: 1021, name: 'Sunny', species: 'bird', breedPrimary: 'Budgie', breedSecondary: '', ageGroup: 'young', ageString: '6 Months', sex: 'male', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Blue', colorSecondary: 'Yellow', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: 'Other birds', adoptionFee: '$25', descriptionHtml: '<p>Sunny is a cheerful budgie who loves to chirp and play with his toys. He&#39;s hand-tamed and would love a home with plenty of interaction. Budgies are smart and can even learn to talk! Sunny comes with his cage and accessories.</p>' },
    { id: 1022, name: 'Lola', species: 'dog', breedPrimary: 'Shih Tzu', breedSecondary: '', ageGroup: 'senior', ageString: '9 Years', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'White', colorSecondary: 'Brown', status: 'available', isSpecialNeeds: false, isAltered: true, isDeclawed: false, housedWith: '', adoptionFee: '$75', descriptionHtml: '<p>Sweet Lola is a senior Shih Tzu who loves nothing more than sitting on a warm lap. She&#39;s calm, gentle, and perfectly house-trained. Lola would be an ideal companion for a senior or anyone looking for a low-key, affectionate friend.</p>' },
    { id: 1023, name: 'Gizmo', species: 'small', breedPrimary: 'Guinea Pig', breedSecondary: '', ageGroup: 'young', ageString: '5 Months', sex: 'male', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Brown', colorSecondary: 'White', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: 'Other guinea pigs', adoptionFee: '$20', descriptionHtml: '<p>Gizmo is an adorable guinea pig who loves fresh veggies, hay, and wheeking for treats. He&#39;s friendly and enjoys being held. Guinea pigs do best in pairs, so Gizmo would love to go home with a friend. He comes with his cage, bedding, and food.</p>' },
    { id: 1024, name: 'Mochi', species: 'small', breedPrimary: 'Hamster', breedSecondary: '', ageGroup: 'young', ageString: '4 Months', sex: 'female', sizeGroup: 'small', sizeString: 'Small', colorPrimary: 'Golden', colorSecondary: '', status: 'available', isSpecialNeeds: false, isAltered: false, isDeclawed: false, housedWith: '', adoptionFee: '$10', descriptionHtml: '<p>Mochi is a tiny golden hamster with a big personality. She loves running on her wheel, filling her cheeks with treats, and building cozy nests. Mochi is easy to care for and makes a wonderful first pet for a responsible child.</p>' },
  ],

  orgs: [
    { id: 'org-1', name: 'Happy Paws Rescue', phone: '(555) 123-4567', email: 'adopt@happypaws.org', url: 'https://happypaws.org', city: 'Portland', state: 'OR', address: '123 Main Street' },
    { id: 'org-2', name: 'Second Chance Animal Shelter', phone: '(555) 987-6543', email: 'info@secondchance.org', url: 'https://secondchance.org', city: 'Austin', state: 'TX', address: '456 Oak Avenue' },
    { id: 'org-3', name: 'Forever Friends Rescue', phone: '(555) 555-1212', email: 'hello@foreverfriends.org', url: 'https://foreverfriends.org', city: 'Denver', state: 'CO', address: '789 Pine Road' },
  ],

  // Get a consistent image URL for a pet
  getImageUrl(petId, name, index = 0) {
    const seed = `${name.toLowerCase().replace(/\s+/g, '-')}-${petId}-${index}`;
    const width = index === 0 ? 800 : 600;
    const height = index === 0 ? 600 : 400;
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  },

  // Build a full animal object in RescueGroups API format
  buildAnimal(pet, orgId) {
    const picCount = pet.id % 5 === 0 ? 4 : pet.id % 3 === 0 ? 2 : 1;
    const picIds = Array.from({ length: picCount }, (_, i) => `pic-${pet.id}-${i + 1}`);

    return {
      id: String(pet.id),
      type: 'animals',
      attributes: {
        name: pet.name,
        breedPrimary: pet.breedPrimary,
        breedSecondary: pet.breedSecondary || null,
        ageGroup: pet.ageGroup,
        ageString: pet.ageString,
        sex: pet.sex,
        sizeGroup: pet.sizeGroup,
        sizeString: pet.sizeString,
        descriptionHtml: pet.descriptionHtml,
        descriptionText: pet.descriptionHtml.replace(/<[^>]*>/g, ''),
        status: pet.status,
        colorPrimary: pet.colorPrimary,
        colorSecondary: pet.colorSecondary || null,
        isSpecialNeeds: pet.isSpecialNeeds,
        isAltered: pet.isAltered,
        isDeclawed: pet.isDeclawed,
        housedWith: pet.housedWith || null,
        adoptionFee: pet.adoptionFee || null,
        species: pet.species,
      },
      relationships: {
        pictures: {
          data: picIds.map(id => ({ id, type: 'pictures' })),
        },
        org: {
          data: { id: orgId, type: 'orgs' },
        },
      },
    };
  },

  // Build included pictures for an animal
  buildPictures(pet) {
    const picCount = pet.id % 5 === 0 ? 4 : pet.id % 3 === 0 ? 2 : 1;
    return Array.from({ length: picCount }, (_, i) => ({
      id: `pic-${pet.id}-${i + 1}`,
      type: 'pictures',
      attributes: {
        publicUrl: this.getImageUrl(pet.id, pet.name, i),
      },
    }));
  },

  // Build included org for a given org ID
  buildOrg(orgId) {
    const org = this.orgs.find(o => o.id === orgId) || this.orgs[0];
    return {
      id: org.id,
      type: 'orgs',
      attributes: { ...org },
    };
  },

  // Filter pets based on criteria
  filterPets(filters) {
    return this.pets.filter(pet => {
      if (filters.species && pet.species !== filters.species) return false;
      if (filters.age && pet.ageGroup !== filters.age) return false;
      if (filters.gender && pet.sex !== filters.gender) return false;
      if (filters.size && pet.sizeGroup !== filters.size) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!pet.name.toLowerCase().includes(q) && !pet.breedPrimary.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  },

  // Get filtered + paginated response (matches API.getAnimals format)
  getAnimals(filters = {}, page = 1) {
    const filtered = this.filterPets(filters);
    const start = (page - 1) * CONFIG.ITEMS_PER_PAGE;
    const pagePets = filtered.slice(start, start + CONFIG.ITEMS_PER_PAGE);

    const data = pagePets.map(pet => {
      const orgId = pet.id % 3 === 0 ? 'org-2' : pet.id % 3 === 1 ? 'org-3' : 'org-1';
      return this.buildAnimal(pet, orgId);
    });

    const allPictures = pagePets.flatMap(pet => this.buildPictures(pet));
    const allOrgs = [...new Set(data.map(a => a.relationships.org.data.id))].map(id => this.buildOrg(id));

    return {
      data,
      included: [...allPictures, ...allOrgs],
      meta: { totalResultCount: filtered.length },
    };
  },

  // Get single animal response (matches API.getAnimalById format)
  getAnimalById(id) {
    const pet = this.pets.find(p => p.id === Number(id));
    if (!pet) return { data: null, included: [] };

    const orgId = pet.id % 3 === 0 ? 'org-2' : pet.id % 3 === 1 ? 'org-3' : 'org-1';
    const animal = this.buildAnimal(pet, orgId);
    const pictures = this.buildPictures(pet);
    const org = this.buildOrg(orgId);

    return {
      data: animal,
      included: [...pictures, org],
    };
  },
};

// ==========================================
// 3. API Service
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

// ==========================================
// 4. UI Utilities
// ==========================================

/**
 * Utility: Debounce function for performance optimization
 * Delays execution until after a specified wait period,
 * preventing excessive calls during rapid events like typing.
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

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
   * Create a pet card element from API animal data
   * @param {object} animal - Animal data object from API
   * @returns {HTMLElement} - Pet card anchor element
   */
  createPetCard(animal) {
    const id = animal.id;
    const attributes = animal.attributes || {};
    const pictures = animal.relationships?.pictures?.data || [];
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

    // Primary image or placeholder
    if (pictures.length > 0) {
      const img = document.createElement('img');
      img.className = 'pet-card-img';
      img.src = pictures[0].url || pictures[0].publicUrl || '';
      img.alt = name;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 400;
      img.height = 240;
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
    if (pictures.length > 0) placeholder.style.display = 'none';
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
  }
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
    const status = attributes.status || 'available';
    const color = attributes.colorPrimary || '';
    const colorSecondary = attributes.colorSecondary || '';
    const specialNeeds = attributes.isSpecialNeeds || false;
    const altered = attributes.isAltered || false;
    const declawed = attributes.isDeclawed || false;
    const housed = attributes.housedWith || '';
    const adoptionFee = attributes.adoptionFee || '';

    // Pictures
    const pictureIds = animalData.relationships?.pictures?.data || [];
    const pictures = included.filter(item => item.type === 'pictures' && pictureIds.some(p => p.id === item.id));
    const allPictureUrls = pictures.map(p => p.attributes?.publicUrl || p.attributes?.url).filter(Boolean);

    // Organization (shelter)
    const orgId = animalData.relationships?.org?.data?.id;
    const orgData = orgId ? included.find(item => item.type === 'orgs' && item.id === orgId) : null;
    const orgAttrs = orgData?.attributes || {};
    const orgName = orgAttrs.name || 'Unknown Shelter';
    const orgPhone = orgAttrs.phone || '';
    const orgEmail = orgAttrs.email || '';
    const orgUrl = orgAttrs.url || '';
    const orgCity = orgAttrs.city || '';
    const orgState = orgAttrs.state || '';
    const orgAddress = orgAttrs.address || '';

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
    html += `<a href="browse.html" class="btn btn-outline btn-lg">← Back to Browse</a>`;
    html += `</div>`;

    html += `</div>`; // end pet-detail-body
    html += `</div>`; // end pet-detail

    container.innerHTML = html;
  },
};

// ==========================================
// 6. Browse Page Logic
// ==========================================
const Browse = {
  currentFilters: {},
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  /**
   * Initialize browse page
   */
  async init() {
    const container = document.querySelector('.pet-grid');
    if (!container) return;

    // Wire up filter events
    this.setupFilters();

    // Wire up search
    this.setupSearch();

    // Load data
    await this.loadPets();
  },

  /**
   * Set up filter button events
   */
  setupFilters() {
    const applyBtn = document.getElementById('filter-apply');
    const resetBtn = document.getElementById('filter-reset');

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.currentFilters = this.getFilterValues();
        this.currentPage = 1;
        this.loadPets();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        document.getElementById('filter-species').value = '';
        document.getElementById('filter-age').value = '';
        document.getElementById('filter-gender').value = '';
        document.getElementById('filter-size').value = '';
        const searchInput = document.getElementById('filter-search');
        if (searchInput) searchInput.value = '';
        this.currentFilters = {};
        this.currentPage = 1;
        this.loadPets();
      });
    }

    // Create a debounced search function
    const debouncedSearch = debounce(() => {
      this.currentFilters = this.getFilterValues();
      this.currentPage = 1;
      this.loadPets();
    }, 400);

    // Enter key also triggers filter immediately
    const searchInput = document.getElementById('filter-search');
    if (searchInput) {
      searchInput.addEventListener('input', debouncedSearch);
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          // Cancel any pending debounced search and run immediately
          this.currentFilters = this.getFilterValues();
          this.currentPage = 1;
          this.loadPets();
        }
      });
    }
  },

  /**
   * Set up search input
   */
  setupSearch() {
    // Add search bar if not present
    const filterSidebar = document.querySelector('.filter-sidebar .filter-bar');
    if (filterSidebar && !document.getElementById('filter-search')) {
      const searchGroup = document.createElement('div');
      searchGroup.className = 'filter-group';
      searchGroup.innerHTML = `
        <label for="filter-search">Search by Name</label>
        <input type="text" id="filter-search" placeholder="Search pets..." />
      `;
      filterSidebar.insertBefore(searchGroup, filterSidebar.querySelector('.filter-actions'));
    }
  },

  /**
   * Get current filter values from the form
   * @returns {object} - Filter object
   */
  getFilterValues() {
    const species = document.getElementById('filter-species')?.value || '';
    const age = document.getElementById('filter-age')?.value || '';
    const gender = document.getElementById('filter-gender')?.value || '';
    const size = document.getElementById('filter-size')?.value || '';
    const search = document.getElementById('filter-search')?.value || '';

    const filters = {};
    if (species) filters.species = species;
    if (age) filters.age = age;
    if (gender) filters.gender = gender;
    if (size) filters.size = size;
    if (search) filters.search = search;
    return filters;
  },

  /**
   * Load pets from API and render
   */
  async loadPets() {
    const container = document.querySelector('.pet-grid');
    if (!container) return;

    UI.showLoading(container);

    try {
      const data = await API.getAnimals(this.currentFilters, this.currentPage);
      this.renderPets(container, data);
    } catch (error) {
      console.error('Failed to load pets:', error);
      UI.showError(container, 'Failed to load pets. Please try again later.');
    }
  },

  /**
   * Render pets grid from API data
   */
  renderPets(container, data) {
    const animals = data.data || [];
    const meta = data.meta || {};

    this.totalItems = meta.totalResultCount || animals.length;
    this.totalPages = Math.ceil(this.totalItems / CONFIG.ITEMS_PER_PAGE) || 1;

    // Results count
    const resultsCountEl = document.querySelector('.results-count');
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${animals.length} of ${this.totalItems} pets`;
    } else {
      // Create results count element
      const parent = container.parentElement;
      const countEl = document.createElement('p');
      countEl.className = 'results-count';
      countEl.textContent = `Showing ${animals.length} of ${this.totalItems} pets`;
      parent.insertBefore(countEl, container);
    }

    if (animals.length === 0) {
      UI.showEmpty(container, 'No pets found matching your criteria. Try adjusting your filters.');
      return;
    }

    // Clear container
    container.innerHTML = '';

    // Render each pet card
    animals.forEach(animal => {
      const card = UI.createPetCard(animal);
      container.appendChild(card);
    });

    // Render pagination
    this.renderPagination(container);
  },

  /**
   * Render pagination controls
   */
  renderPagination(container) {
    // Remove existing pagination
    const existingPagination = container.parentElement.querySelector('.pagination');
    if (existingPagination) existingPagination.remove();

    if (this.totalPages <= 1) return;

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Prev';
    prevBtn.disabled = this.currentPage <= 1;
    prevBtn.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadPets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    pagination.appendChild(prevBtn);

    // Page numbers (show max 5 pages)
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === this.currentPage) pageBtn.className = 'active';
      pageBtn.addEventListener('click', () => {
        this.currentPage = i;
        this.loadPets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagination.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = this.currentPage >= this.totalPages;
    nextBtn.addEventListener('click', () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadPets();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    pagination.appendChild(nextBtn);

    // Page info
    const info = document.createElement('span');
    info.className = 'page-info';
    info.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
    pagination.appendChild(info);

    container.parentElement.appendChild(pagination);
  },
};

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
    if (animals.length === 0) return;

    container.innerHTML = '';
    animals.forEach(animal => {
      const card = UI.createPetCard(animal);
      container.appendChild(card);
    });
  },
};

// ==========================================
// 8. Initialize Pages
// ==========================================
// (Merged into the shared DOMContentLoaded handler in section 4)