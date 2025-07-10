# 1. 베이스 이미지 선택 (Node.js 18 LTS 버전 사용)
FROM node:22-slim

RUN apt update

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. 프로젝트 소스 코드 복사
COPY . .

# 권한 부여
RUN chmod 777 ./exam/run_c.sh

# 4. 종속성 설치
RUN npm install

# 6. 애플리케이션 포트 노출 (server.js에서 사용하는 포트로 변경 가능)
EXPOSE 3100

# 7. 애플리케이션 실행
CMD [ "node", "server.js" ]

# docker build -t online-coding-test-storage:latest .

# docker run --rm -d -p 3100:3100 --network net-onCoTe -v vol-onCoTe-storage:/usr/src/app/exam --name oncote-storage online-coding-test-storage:latest

# docker build -t online-coding-test-storage:latest . &&  docker run --rm -d -p 3100:3100 --network net-onCoTe -v vol-onCoTe-storage:/usr/src/app/exam --name oncote-storage online-coding-test-storage:latest

# docker build -t online-coding-test-storage:latest . &&  docker run --rm -d  --network net-onCoTe -v vol-onCoTe-storage:/usr/src/app/exam --name oncote-storage online-coding-test-storage:latest