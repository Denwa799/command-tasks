FROM node:16.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock ./

RUN npm install yarn

RUN yarn install

COPY . .

COPY ./dist ./dist