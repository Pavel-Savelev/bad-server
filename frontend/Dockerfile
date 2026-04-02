FROM node:22-alpine as build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install -g npm@11.12.1
RUN npm install
COPY . .
RUN npm run build