<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1sEmB7HUz3ow8E_RXrXwtBLnVwMAxu_Us

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Copy the `.env` file and fill in your API keys:

   ```bash
   # Google Maps API Configuration
   VITE_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
   VITE_GOOGLE_MAPS_MAP_ID="your_google_maps_map_id"

   # Naver Maps API Configuration
   # Get these from Naver Cloud Platform Console (https://console.ncloud.com/)
   VITE_NAVER_MAPS_CLIENT_ID="your_naver_client_id"
   VITE_NAVER_MAPS_CLIENT_SECRET="your_naver_client_secret"  # Optional

   # Gemini AI API Configuration
   VITE_GEMINI_API_KEY="your_gemini_api_key"
   ```

3. **Naver Maps API Setup (⚠️ 중요! 완전히 새로운 방식):** **2025년 최신 네이버 Maps API 사용법 (완전 변경됨!):**

   **🚨 중요한 변경사항:**

   - API URL: `openapi.map.naver.com` → `oapi.map.naver.com`
   - 파라미터: `ncpClientId` → `ncpKeyId`
   - 인증 실패 콜백 함수 지원

   **단계별 설정:**

   1. **새로운 Maps 콘솔 접속:**

      - [Maps 서비스 콘솔](https://console.ncloud.com/maps)로 이동
      - **"Application" 생성** (기존 API Gateway Application과 다름)

   2. **Application 설정:**

      - Application 이름 입력
      - **"Dynamic Map" API 선택** (필수)
      - 기타 필요한 API도 선택 (Static Map, Geocoding 등)

   3. **도메인 등록 (매우 중요!):**

      ```
      http://localhost:5173
      http://127.0.0.1:5173
      https://localhost:5173
      https://127.0.0.1:5173
      ```

   4. **인증 정보 복사:**
      - Application의 **Client ID**를 복사
      - `.env` 파일의 `VITE_NAVER_MAPS_CLIENT_ID`에 입력

   **⚠️ 주의사항:**

   - 기존 AI NAVER API Client ID는 절대 작동하지 않습니다
   - API Gateway의 Client ID/Secret과도 다릅니다
   - 반드시 Maps Application에서 발급받은 Client ID를 사용하세요

4. **Google Maps API Setup:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create credentials and copy the API key
   - Enable the required APIs for your project

5. Run the app:
   ```bash
   npm run dev
   ```

## Important Notes

- **Domain Registration**: For Naver Maps, make sure to register your domain in the Naver Cloud Platform console
- **API Quotas**: Both Google Maps and Naver Maps have usage quotas and billing
- **CORS**: Make sure your domain is properly configured in both API consoles

## Troubleshooting Naver Maps API Issues

⚠️ **핵심 변경사항: 2025년 새로운 Maps API 완전 교체!**

### **🔥 가장 중요한 해결방법**

**기존 방식은 모두 작동하지 않습니다!** 새로운 방식을 사용해야 합니다:

1. **❌ 작동하지 않는 것들:**

   - AI NAVER API Client ID
   - API Gateway의 Client ID/Secret
   - 기존 콘솔 (console.ncloud.com/ncp/service/maps/map)

2. **✅ 새로운 올바른 방법:**
   - [새로운 Maps 콘솔](https://console.ncloud.com/maps)
   - Maps "Application" 생성 (API Gateway Application과 다름)
   - Dynamic Map API 선택
   - Application의 Client ID 사용

### **단계별 해결 가이드**

#### 1️⃣ **새로운 Maps Application 생성**

```
1. https://console.ncloud.com/maps 접속
2. "Application" 버튼 클릭
3. Application 이름 입력
4. "Dynamic Map" 체크 ✓
5. 도메인 추가:
   - http://localhost:5173
   - http://127.0.0.1:5173
   - https://localhost:5173
   - https://127.0.0.1:5173
6. 생성 완료
```

#### 2️⃣ **Client ID 확인 및 복사**

- Application 목록에서 생성한 Application 클릭
- **Client ID** 복사 (Client Secret이 아님!)
- `.env` 파일의 `VITE_NAVER_MAPS_CLIENT_ID`에 붙여넣기

#### 3️⃣ **실제 테스트**

```bash
# 개발 서버 재시작
npm run dev
```

### **🚨 흔한 오류와 해결책**

#### `Error Code 200 / Authentication Failed` 또는 `401 Unauthorized`

**원인:** 99% 확률로 잘못된 Client ID 사용

**🚨 중요 체크포인트:**

1. **올바른 콘솔 사용 확인:**

   ```
   ❌ 잘못된 곳: console.ncloud.com/ncp/service/maps/map
   ✅ 올바른 곳: console.ncloud.com/maps
   ```

2. **Application 타입 확인:**

   ```
   ❌ 잘못된 것: API Gateway Application
   ✅ 올바른 것: Maps Application
   ```

3. **Client ID 형식 확인:**
   ```
   ❌ 기존 AI NAVER API: 긴 문자열 (예: hsWVbZ0P457JHXl0uCLF...)
   ✅ 새로운 Maps API: 보통 짧은 문자열 (예: u5q9kilee3)
   ```

**해결 단계:**

1. https://console.ncloud.com/maps 접속
2. "Application" 메뉴에서 새 Application 생성
3. "Dynamic Map" API 선택
4. 도메인 등록 시 정확히 입력:
   ```
   http://127.0.0.1:5173
   https://127.0.0.1:5173
   ```
5. 새로 발급받은 Client ID로 교체
6. 개발 서버 재시작

#### `Error Code 500 / Internal Server Error`

- 네이버 서버 일시적 오류
- 잠시 후 다시 시도
- Client ID가 올바른지 재확인

**해결:**

1. **올바른 콘솔 확인:** https://console.ncloud.com/maps (다른 URL 아님!)
2. **Application 생성 확인:** "Application" 메뉴에서 생성했는지 확인
3. **Client ID 재복사:** Application 세부정보에서 Client ID 다시 복사
4. **도메인 재확인:** localhost:5173, 127.0.0.1:5173 모두 등록

#### `Error Code 429 / Quota Exceeded`

- Maps Application에서 API 할당량 확인
- 결제 정보 등록 필요할 수 있음

#### `Script Loading Failed`

- 네트워크 문제 또는 방화벽
- 브라우저 캐시 삭제 후 재시도

### **🔧 최종 체크리스트**

인증이 계속 실패한다면 다음을 순서대로 확인:

- [ ] https://console.ncloud.com/maps 에서 Application 생성
- [ ] "Dynamic Map" API 선택됨
- [ ] 모든 도메인 등록 (http/https, localhost/127.0.0.1)
- [ ] 올바른 Client ID 복사 (Application의 Client ID)
- [ ] `.env` 파일 저장 후 개발 서버 재시작
- [ ] 브라우저 개발자 도구에서 네트워크 탭 확인

### **📞 추가 도움**

여전히 문제가 해결되지 않으면:

- [NCP 고객지원](https://www.ncloud.com/support/question) (1544-5876)
- [Maps API 가이드](https://guide.ncloud-docs.com/docs/maps-overview)
