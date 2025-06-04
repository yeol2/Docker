# Jenkins Pipeline 가이드

## 환경 설정
- `PROJECT_NAME`: 프로젝트 이름 (pumati)
- `SERVICE_NAME`: 서비스 이름 (backend)
- `S3_BUCKET`: S3 버킷 이름
- `AWS_REGION`: AWS 리전
- `AWS_ACCOUNT_ID`: AWS 계정 ID

## 스테이지별 상세 설명

### 1. Set Branch & Cron Trigger
- **목적**: 브랜치별 트리거 설정 및 환경 구성
- **주요 동작**:
  - 브랜치명 추출 및 정제
  - main 브랜치: 매일 9시 자동 실행
  - dev 브랜치: 수동 트리거
  - 지원하지 않는 브랜치: 빌드 중단

### 2. Notify Before Start
- **목적**: 빌드 시작 알림
- **주요 동작**:
  - Discord 웹훅을 통한 빌드 시작 알림
  - 빌드 URL 및 브랜치 정보 포함

### 3. Checkout
- **목적**: 소스 코드 체크아웃
- **주요 동작**:
  - Git 저장소에서 코드 클론

### 4. Set Environment by Branch
- **목적**: 브랜치별 환경 변수 설정
- **주요 동작**:
  - 타임스탬프 및 커밋 해시 생성
  - 브랜치별 IP 주소 설정
  - ECR 이미지 태그 생성
  - 환경 레이블 설정 (prod/dev)

### 5. Fetch .env from AWS Secrets Manager
- **목적**: 환경 변수 파일 로드
- **주요 동작**:
  - AWS Secrets Manager에서 .env 파일 내용 가져오기
  - 로컬에 .env 파일 생성
  - 파일 권한 설정 (600)

### 6. Authorize Docker to ECR
- **목적**: ECR 인증
- **주요 동작**:
  - AWS ECR 로그인
  - Docker 클라이언트 인증

### 7. Docker Build & Push to ECR
- **목적**: Docker 이미지 빌드 및 ECR 푸시
- **주요 동작**:
  - .env 파일 처리:
    - 주석 및 빈 라인 제거
    - 공백 제거
    - export 키워드 제거
    - 따옴표 추가
    - 환경변수 export
  - Docker 빌드:
    - 모든 환경변수를 build-arg로 전달
    - 큰따옴표로 감싸서 특수문자 처리
  - ECR 푸시

### 8. Save Docker Image & Upload to S3
- **목적**: Docker 이미지 백업
- **주요 동작**:
  - Docker 이미지를 tar 파일로 저장
  - gzip 압축
  - S3에 업로드
  - 로컬 파일 정리

### 9. Deploy to Backend EC2 via SSH
- **목적**: EC2 인스턴스 배포
- **주요 동작**:
  - SSH를 통한 EC2 접속
  - 기존 컨테이너 중지 및 제거
  - ECR 인증
  - 새 이미지 Pull
  - 새 컨테이너 실행
  - 컨테이너 PID 출력
  - 사용하지 않는 이미지 정리

### Post Actions
- **목적**: 빌드 결과 알림
- **주요 동작**:
  - 성공/실패 시 Discord 알림
  - 빌드 정보 포함 (이미지 태그, 실행 시간 등)

## 환경변수 처리 상세 설명
1. **.env 파일 처리 과정**:
   ```bash
   cat .env | grep -v '^#' | grep -v '^$' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//' | sed 's/^export //' | sed 's/=/="/' | sed 's/$/"/' | xargs
   ```
   - `grep -v '^#'`: 주석 라인 제외
   - `grep -v '^$'`: 빈 라인 제외
   - `sed 's/^[[:space:]]*//'`: 라인 앞쪽 공백 제거
   - `sed 's/[[:space:]]*$//'`: 라인 뒤쪽 공백 제거
   - `sed 's/^export //'`: export 키워드 제거
   - `sed 's/=/="/'`: = 앞에 '"' 추가
   - `sed 's/$/"/'`: 라인 끝에 '"' 추가
   - `xargs`: 모든 환경변수를 한 번에 export

2. **Docker 빌드 인자 전달**:
   - 모든 환경변수를 `--build-arg`로 전달
   - `${VAR}` 형식으로 변수 참조
   - 큰따옴표로 감싸서 특수문자 처리
   - 한글 값도 안전하게 처리
   - Jenkins 환경변수는 `\${env.VAR}` 형식으로 이스케이프 처리

## 보안 고려사항
1. **환경변수 보호**:
   - .env 파일 권한 제한 (600)
   - AWS Secrets Manager 사용
   - 민감한 정보는 build-arg로 전달

2. **인증 정보 관리**:
   - ECR 인증 정보 보호
   - SSH 키 보호
   - AWS 자격 증명 보호

## 최적화 포인트
1. **빌드 최적화**:
   - 멀티 스테이지 빌드
   - 불필요한 파일 제외
   - 캐시 활용

2. **배포 최적화**:
   - 기존 컨테이너 자동 정리
   - 사용하지 않는 이미지 정리
   - 효율적인 파일 전송

## Jenkins 특별 고려사항
1. **변수 처리**:
   - 쉘 스크립트 내의 `$` 문자는 `\$`로 이스케이프
   - Jenkins 환경변수는 `\${env.VAR}` 형식 사용
   - Groovy 문자열 내의 특수문자 처리 주의

2. **문자열 처리**:
   - 큰따옴표(`"`) 사용 시 이스케이프 처리
   - 멀티라인 문자열은 `"""` 사용
   - 변수 보간 시 `${VAR}` 형식 사용
