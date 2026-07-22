// ==========================================
// Configuration
// ==========================================
export const CONFIG = {
  // API key is stored as a Vercel environment variable (RESCUE_GROUPS_API_KEY)
  // and accessed via the serverless proxy at /api/pets
  API_PROXY_PATH: '/api/pets',

  // Pagination
  ITEMS_PER_PAGE: 20,
};