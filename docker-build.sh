#!/bin/bash

# Docker 이미지 빌드 스크립트
# 환경변수를 전달하면서 이미지를 빌드합니다

# 환경변수 파일 로드
if [ -f .env.docker ]; then
    echo "Loading environment variables from .env.docker..."
    export $(cat .env.docker | grep -v '^#' | xargs)
else
    echo "Warning: .env.docker file not found!"
    echo "Please create .env.docker file with your API keys"
    exit 1
fi

# Docker 이미지 빌드
echo "Building Docker image with environment variables..."
/Applications/Docker.app/Contents/Resources/bin/docker build \
  --build-arg VITE_NAVER_MAPS_CLIENT_ID="$VITE_NAVER_MAPS_CLIENT_ID" \
  --build-arg VITE_NAVER_MAPS_CLIENT_SECRET="$VITE_NAVER_MAPS_CLIENT_SECRET" \
  --build-arg VITE_NAVER_MAPS_API_KEY_ID="$VITE_NAVER_MAPS_API_KEY_ID" \
  --build-arg VITE_NAVER_MAPS_API_KEY="$VITE_NAVER_MAPS_API_KEY" \
  --build-arg VITE_GOOGLE_MAPS_API_KEY="$VITE_GOOGLE_MAPS_API_KEY" \
  --build-arg VITE_GOOGLE_MAPS_MAP_ID="$VITE_GOOGLE_MAPS_MAP_ID" \
  --build-arg VITE_GEMINI_API_KEY="$VITE_GEMINI_API_KEY" \
  --platform linux/amd64 \
  -t kwontaek12/car-seller:amdv2 .

echo "Build completed!"
echo "Run with: /Applications/Docker.app/Contents/Resources/bin/docker run -p 8080:80 kwontaek12/car-seller:amdv2"
