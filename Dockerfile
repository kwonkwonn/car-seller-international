# -------------------
# 1단계: 빌드 단계
# -------------------
FROM node:18 AS builder
WORKDIR /app

# 빌드 시점에 필요한 환경변수들을 ARG로 선언
ARG VITE_NAVER_MAPS_CLIENT_ID
ARG VITE_NAVER_MAPS_CLIENT_SECRET
ARG VITE_NAVER_MAPS_API_KEY_ID
ARG VITE_NAVER_MAPS_API_KEY
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_GOOGLE_MAPS_MAP_ID
ARG VITE_GEMINI_API_KEY

# ARG를 ENV로 변환 (Vite 빌드에서 사용 가능)
ENV VITE_NAVER_MAPS_CLIENT_ID=$VITE_NAVER_MAPS_CLIENT_ID
ENV VITE_NAVER_MAPS_CLIENT_SECRET=$VITE_NAVER_MAPS_CLIENT_SECRET
ENV VITE_NAVER_MAPS_API_KEY_ID=$VITE_NAVER_MAPS_API_KEY_ID
ENV VITE_NAVER_MAPS_API_KEY=$VITE_NAVER_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_MAP_ID=$VITE_GOOGLE_MAPS_MAP_ID
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# 의존성 먼저 설치 (캐시 활용)
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# 환경변수 디버깅 (빌드 시점에 확인)
RUN echo "=== Environment Variables Debug ===" && \
    echo "VITE_NAVER_MAPS_CLIENT_ID: $VITE_NAVER_MAPS_CLIENT_ID" && \
    echo "VITE_NAVER_MAPS_API_KEY_ID: $VITE_NAVER_MAPS_API_KEY_ID" && \
    echo "VITE_GOOGLE_MAPS_API_KEY: $VITE_GOOGLE_MAPS_API_KEY" && \
    echo "VITE_GEMINI_API_KEY: $VITE_GEMINI_API_KEY" && \
    echo "==================================="

# vite 빌드 (환경변수가 번들에 포함됨)
RUN npm run build

# -------------------
# 2단계: 배포 단계
# -------------------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# dist 결과만 복사
COPY --from=builder /app/dist ./

# nginx 기본 설정 유지 (필요시 교체 가능)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
