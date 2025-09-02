/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_MAP_ID: string;
  readonly VITE_NAVER_MAPS_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
