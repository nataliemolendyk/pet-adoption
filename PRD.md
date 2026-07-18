# Product Requirements Document (PRD)

## Pet Adoption Website

---

## 1. Overview

### 1.1 Product Name
**Pet Adoption** — an informational guide to help families, couples, and individuals discover adoptable pets, learn about the adoption process, and connect with local shelters.

### 1.2 Purpose
A pet adoption information website that helps families, couples, and individuals discover adoptable pets, learn about the adoption process, and connect with local shelters.

### 1.3 Goals
- Provide an easy way to **browse and search** adoptable pets with images and details.
- **Educate** first-time pet owners and interested adopters about the adoption process, FAQs, and tips.
- Help users **find shelter locations and contact information** to take the next step.

---

## 2. Target Audience

- **Families** looking to adopt a pet for the first time or add to their family.
- **Couples & Individuals** interested in pet adoption.
- **First-time pet owners** who need guidance on the adoption process.
- **Anyone** unsure which breed or pet type is right for them.

---

## 3. Tech Stack

| Component         | Technology      |
| ----------------- | --------------- |
| Frontend          | HTML, CSS, JS   |
| Styling           | CSS (custom with CSS variables) |
| Data Source       | RescueGroups.org v5 API (free, REST/JSON) |
| API Auth          | API Key (via Authorization header) |
| Deployment        | Any static host (e.g., GitHub Pages, Netlify) |
| Responsiveness    | Fully mobile-friendly with responsive breakpoints |

---

## 4. Data Source — RescueGroups.org v5 API

### 4.1 Why this API
- **Free** — no cost, no rate limits.
- **Simple REST/JSON** — works with plain `fetch()` in JavaScript.
- **Includes images** — pictures are returned as related data with each animal.
- **Includes all pet types** — dogs, cats, rabbits, birds, horses, small animals, and more.
- **Shelter data included** — organization name, location, website, contact info.

### 4.2 What we'll use from the API
- **Animals** — name, breed, age, gender, size, status, description, pictures
- **Organizations (Shelters)** — name, address, phone, website, adoption process
- **Filters** — species, breed, age, size, gender, location/distance

### 4.3 Image Support
The API supports an `include=pictures` parameter that returns picture URLs alongside animal data, making it easy to display pet photos.

---

## 5. Pages & Features

### Page 1: Home Page (`index.html`)
- Hero section with welcome message and tagline: "Find Your New Best Friend".
- Featured adoptable pets section (placeholder cards currently, ready for API integration).
- Quick navigation cards to key pages (Browse Pets, Learn the Process, Find a Shelter).
- "Why Adopt?" section with 4 benefit cards (Save a Life, Cost-Effective, Unique Companions, Support Shelters).
- Call-to-action buttons (e.g., "Find Your Perfect Pet").

### Page 2: Pet Listings — Browse Pets (`browse.html`)
- Grid display of adoptable pets with thumbnail images (placeholder awaiting API key).
- **Horizontal filter bar:**
  - Species (All Species, Dogs, Cats, Rabbits, Birds, Small Animals)
  - Age (Any Age, Baby, Young, Adult, Senior)
  - Gender (Any, Male, Female)
  - Size (Any Size, Small, Medium, Large)
- Apply Filters and Reset buttons.
- Pet grid container ready for API-driven content.

### Page 3: Individual Pet Detail Page (`pet-detail.html` — referenced in JS, page file to be created)
- Planned for Phase 3.
- Large hero image of the pet.
- Pet information: name, breed, age, gender, size, color.
- Description/personality notes.
- Health status and special needs (if any).
- Photo gallery (multiple pictures).
- Shelter info and location for this pet.
- "Contact Shelter" button / link.

### Page 4: Shelter / Location Info (`shelters.html`)
- List of 4 partner shelters and rescue organizations.
- Each shelter card shows:
  - Name
  - Brief description
  - "Contact Shelter" button (links to Get in Touch page)
  - "View Their Pets" button (links to Browse Pets page)
- Shelter names: Local Animal Shelter, Paws & Claws Rescue, Happy Tails Sanctuary, Second Chance Rescue.

### Page 5: Adoption Process (`adoption-process.html`)
- Step-by-step guide to adopting a pet — 7 steps:
  1. Browse Available Pets
  2. Learn About the Pet
  3. Contact the Shelter
  4. Meet the Pet
  5. Complete the Application
  6. Pay the Adoption Fee
  7. Bring Your Pet Home
- Helpful tips for each step.

### Page 6: FAQ Page (`faq.html`)
- Accordion-style collapsible questions/answers.
- 8 common questions:
  - "What do I need to adopt a pet?"
  - "How much does adoption cost?"
  - "Can I adopt if I rent my home?"
  - "What if I have other pets?"
  - "How do I know which pet is right for me?"
  - "Are adopted pets healthy?"
  - "What if the adoption doesn't work out?"
  - "How long does the adoption process take?"
- Single-open accordion behavior (closing others when one is opened).

### Page 7: Tips Page (`tips.html`)
- 5 articles/sections on pet care topics:
  - **Preparing Your Home for a New Pet** — pet-proofing, safe zone, essentials, food, vet visit
  - **Your First Week with a New Pet** — go slow, establish routine, start training, monitor eating, be patient
  - **Pet Nutrition Basics** — quality food, age-appropriate diet, portion control, fresh water, toxic foods
  - **Training Tips** — positive reinforcement, short sessions, consistency, socialization, professional help
  - **Vet Care & Vaccinations** — annual checkups, core vaccinations, parasite prevention, dental care, spay/neuter

### Page 8: Get in Touch — Contact Page (`contact.html`)
- Contact cards for 3 partner shelters with full details:
  - Local Animal Shelter — address, phone, email, website, hours
  - Paws & Claws Rescue — address, phone, email, website, hours
  - Happy Tails Sanctuary — address, phone, email, website, hours
- Each card includes "View Their Pets" and "Shelter Locations" buttons.
- Shelter descriptions for each organization.

---

## 6. Design & UI

### 6.1 Color Palette (Nature-Inspired)
| Color               | Hex Code  | Usage                  |
| ------------------- | --------- | ---------------------- |
| Forest Green        | `#2D6A4F` | Headers, buttons, accents |
| Forest Green Light  | `#40916C` | Hover states           |
| Forest Green Dark   | `#1B4332` | Footer, hero background |
| Warm Brown          | `#8B5A2B` | Secondary elements     |
| Warm Brown Light    | `#A67C52` | Hover states           |
| Earthy Beige        | `#F5F0E6` | Background             |
| Soft Cream          | `#FFFDF7` | Card backgrounds       |
| Deep Charcoal       | `#1B1B1B` | Text                   |
| Accent Gold         | `#D4A373` | Highlights, icons      |
| Accent Gold Light   | `#E9C88A` | Hover states           |
| Light Gray          | `#E8E4D9` | Borders                |
| Medium Gray         | `#9C9A8E` | Secondary text         |
| Error Red           | `#D32F2F` | Error messages         |

### 6.2 Typography
- **Headings:** Georgia / Times New Roman (serif, warm, friendly feel).
- **Body:** System sans-serif stack (clean, readable).
- Text sizes responsive across devices.

### 6.3 Responsiveness
- Mobile-first design approach.
- Breakpoints: mobile (< 768px), tablet (768px–1024px), desktop (> 1024px).
- Touch-friendly buttons and filters on mobile.
- Filter bar collapses to vertical layout on mobile.
- Navigation collapses to hamburger menu on mobile.
- Grid systems adapt: 3-column → 1-column on mobile.

---

## 7. User Stories

| As a...          | I want to...                                      | So that...                              |
| ---------------- | ------------------------------------------------- | --------------------------------------- |
| Visitor          | Browse adoptable pets with photos                 | I can find a pet I'm interested in      |
| Visitor          | Filter pets by breed, age, size, gender           | I can narrow down my search             |
| Visitor          | Click on a pet to see full details                | I can learn more about them             |
| Visitor          | See shelter information                           | I know where to go                      |
| First-time owner | Read the adoption process guide                   | I know what to expect                   |
| First-time owner | Read the FAQ and Tips sections                    | I feel prepared                         |
| All users        | Contact a shelter                                | I can take the next step                |
| Mobile user      | Navigate easily on my phone                       | I can browse on-the-go                  |

---

## 8. Build Priority & Milestones

### Phase 1 — Foundation ✅
- [x] Set up project structure (multi-page HTML files, CSS, JS).
- [x] Get RescueGroups.org API key (placeholder key in config).
- [x] Style framework (CSS variables, nature theme, responsive grid).
- [x] Navigation bar and footer (shared across pages, responsive hamburger menu).

### Phase 2 — Information Pages ✅
- [x] Build **Home Page** with hero, featured pets, quick links, and "Why Adopt?" section.
- [x] Build **Adoption Process** page with 7-step guide.
- [x] Build **FAQ** page with accordion-style 8 questions.
- [x] Build **Tips** page with 5 pet care articles.
- [x] Build **Shelters / Locations** page with 4 partner shelters.
- [x] Build **Get in Touch** page with 3 shelter contact cards.

### Phase 3 — Pet Data & Listings 🔄
- [ ] Connect to RescueGroups API and fetch animal data.
- [ ] Build **Pet Listings** page with grid and thumbnail images.
- [ ] Build **Individual Pet Detail** page (`pet-detail.html`).
- [ ] Implement filters (species, breed, age, gender, size).
- [ ] Add API key to `js/main.js` to enable live data.

### Phase 4 — Polish & Deploy
- [ ] Responsive testing (mobile, tablet, desktop).
- [ ] Performance optimization (image loading, caching).
- [ ] Deploy to hosting (GitHub Pages, Netlify, etc.).

---

## 9. What We Deliberately Do NOT Do

- Process adoptions directly on the site (informational only).
- Handle payments or donations.
- Create user profiles or store sensitive information.
- Live chat feature between shelters and users.

## 10. Future Enhancements (Post-MVP)

- Map integration for shelter locations.
- Search by zip code / distance radius.
- "Favorites" or "Saved Pets" using localStorage.
- Dark mode toggle.
- More pet types via API filter.
- Success stories section (user-submitted adoption stories).
- Pet detail page (`pet-detail.html`).
- Full API integration with live pet data.

---

## 11. API Reference (Quick Links)

- **API Base URL:** `https://api.rescuegroups.org/v5`
- **Get API Key:** [Request here](https://rescuegroups.org/services/adoptable-pet-data-api/)
- **API Docs:** [RescueGroups v5 API Docs](https://api.rescuegroups.org/v5/public/docs)
- **Postman Collection:** [Postman Examples](https://documenter.getpostman.com/view/60615/SWT5j1e4?version=latest)
