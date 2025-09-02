// Environment variables for Vite (browser environment)
// In Vite, environment variables must be prefixed with VITE_ to be accessible in the browser
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

// NEW Naver Maps API (2025) - requires Maps Application registration
export const NAVER_MAPS_CLIENT_ID = import.meta.env.VITE_NAVER_MAPS_CLIENT_ID;
export const NAVER_MAPS_CLIENT_SECRET = import.meta.env
  .VITE_NAVER_MAPS_CLIENT_SECRET;

// For Maps REST APIs (Static Map, Geocoding, etc.) - requires IAM auth headers
export const NAVER_MAPS_API_KEY_ID = import.meta.env.VITE_NAVER_MAPS_API_KEY_ID;
export const NAVER_MAPS_API_KEY = import.meta.env.VITE_NAVER_MAPS_API_KEY;
