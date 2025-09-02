/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_MAP_ID: string;
  // NEW Naver Maps API (2025) - Maps Application credentials
  readonly VITE_NAVER_MAPS_CLIENT_ID: string;
  readonly VITE_NAVER_MAPS_CLIENT_SECRET?: string;
  // For Maps REST APIs - IAM authentication headers
  readonly VITE_NAVER_MAPS_API_KEY_ID?: string;
  readonly VITE_NAVER_MAPS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
