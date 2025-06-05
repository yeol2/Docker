# Docker 빌드 컨텍스트 크기 트러블슈팅

## 문제 상황
초기 Docker 빌드 시 빌드 컨텍스트가 매우 큰 문제가 발생했습니다.

### 에러 로그 (Before)
```
#4 [internal] load build context
#4 transferring context: 898.49MB 20.2s
#4 transferring context: 898.49MB 25.2s
#4 transferring context: 898.49MB 25.2s done
#4 DONE 25.4s
```

## 해결 방법
`.dockerignore` 파일을 생성하여 불필요한 파일들을 빌드 컨텍스트에서 제외했습니다.

### .dockerignore 파일 내용
```
# Git
.git
.gitignore

# Node
node_modules
npm-debug.log
yarn-debug.log
yarn-error.log
.pnpm-debug.log

# Next.js
.next
out

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
dist
build
coverage

# Environment
.env
.env.*
!.env.example

# Test
__tests__
*.test.*
*.spec.*

# Cache
.cache
.npm
.eslintcache
.stylelintcache

# Misc
README.md
CHANGELOG.md
LICENSE
*.md
*.log
```

## 결과
`.dockerignore` 적용 후 빌드 컨텍스트 크기가 크게 감소했습니다.

### 결과 로그 (After)
```
#5 [internal] load build context
#5 transferring context: 37.90kB 0.8s done
#5 DONE 0.8s
```

## 개선 효과
- 빌드 컨텍스트 크기: 898.49MB → 37.90kB
- 빌드 시간: 25.4s → 0.8s (약 97% 감소)
- 빌드 속도 향상
- 이미지 크기 최적화
- 불필요한 파일 제외로 보안성 향상

## 정리
1. Docker 빌드 시 항상 `.dockerignore` 파일을 사용하여 불필요한 파일을 제외
2. 빌드 컨텍스트 크기를 최소화하여 빌드 성능 향상
3. 보안을 위해 민감한 파일과 불필요한 파일 제외 