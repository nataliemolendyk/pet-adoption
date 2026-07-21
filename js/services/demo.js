// ==========================================
// Demo Data (used when no API key is configured)
// ==========================================
import { CONFIG } from '../config.js';

export const DEMO = {
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