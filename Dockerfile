FROM node:20-alpine

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

ENV VITE_API_BASE_URL='http://localhost:9010'

CMD ["npm", "run", "dev"]