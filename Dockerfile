FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev"]