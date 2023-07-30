FROM node:alpine

WORKDIR /app/Backend

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]