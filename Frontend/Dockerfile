FROM node:alpine

WORKDIR '/app/Frontend'

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]