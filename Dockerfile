FROM node:20-alpine

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

ARG API_BASE_URL
ENV VITE_API_BASE_URL=$API_BASE_URL

CMD ["npm", "run", "dev"]