// 환경 변수 테스트 스크립트
console.log('=== Environment Variables Test ===');
console.log('VITE_NAVER_MAPS_CLIENT_ID:', import.meta.env.VITE_NAVER_MAPS_CLIENT_ID);
console.log('VITE_NAVER_MAPS_API_KEY_ID:', import.meta.env.VITE_NAVER_MAPS_API_KEY_ID);
console.log('VITE_GOOGLE_MAPS_API_KEY:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);
console.log('=====================================');

// config.ts에서 가져온 값도 테스트
import { 
  NAVER_MAPS_CLIENT_ID, 
  NAVER_MAPS_API_KEY_ID,
  GOOGLE_MAPS_API_KEY,
  GEMINI_API_KEY 
} from './config.ts';

console.log('=== Config.ts Values ===');
console.log('NAVER_MAPS_CLIENT_ID:', NAVER_MAPS_CLIENT_ID);
console.log('NAVER_MAPS_API_KEY_ID:', NAVER_MAPS_API_KEY_ID);
console.log('GOOGLE_MAPS_API_KEY:', GOOGLE_MAPS_API_KEY);
console.log('GEMINI_API_KEY:', GEMINI_API_KEY);
console.log('========================');
