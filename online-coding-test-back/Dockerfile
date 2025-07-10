# Stage 1: Build the application
FROM node:22-slim AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:22-slim

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]


# Docker 이미지 빌드
# docker build -t online-coding-test-back:latest .

# Docker 컨테이너 실행
# docker run --rm -d -p 3000:3000 --network net-onCoTe -v /var/run/docker.sock:/var/run/docker.sock:ro --name oncote-backend online-coding-test-back:latest

# docker build -t online-coding-test-back:latest . && docker run --rm -d -p 3000:3000 --network net-onCoTe -v /var/run/docker.sock:/var/run/docker.sock:ro --name oncote-backend online-coding-test-back:latest