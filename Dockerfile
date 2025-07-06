# 1. 베이스 이미지 선택 (Node.js 18 LTS 버전 사용)
FROM node:22-alpine

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. 종속성 설치
RUN npm install

# 5. 프로젝트 소스 코드 복사
COPY . .

# 6. 애플리케이션 포트 노출 (server.js에서 사용하는 포트로 변경 가능)
EXPOSE 3100

# 7. 애플리케이션 실행
CMD [ "node", "server.js" ]

# docker build -t online-coding-test-storage:latest .

# docker run --rm -d -p 3100:3100 -v vol-onCoTe-storage:/usr/src/app/exam --name oncote-storage online-coding-test-storage:latest